import {
    Descendant,
    Text,
    Transforms,
    Editor,
} from 'slate'
import type {
    CustomElement,
    CustomText,
    LinkElement,
    ListItemElement,
    ParagraphElement,
} from '../slate'
import {
    MimeType,
    RichElementType,
    RichTextEditorProps,
} from '../types'
import { RichUtils } from './utils'

type Marks = Pick<CustomText, 'bold' | 'italic' | 'underline'>

export function withHtml<T extends Editor>(
    editor: T,
    opts?: { multiline?: boolean },
): T {
    const { insertData, isInline } = editor

    editor.isInline = e => isInlineWrap(isInline, e)
    editor.insertData = d => insertDataWrap(insertData, d, editor, opts)

    return editor
}

function isInlineWrap(
    editorInline: Editor['isInline'],
    element: CustomElement,
) {
    if ((element as any).type !== RichElementType.Link)
        return editorInline(element)
    else return true
}

function insertDataWrap(
    editorInsertData: Editor['insertData'],
    data: DataTransfer,
    editor: Editor,
    opts?: RichTextEditorProps,
) {
    if (tryInsertHtml(data, editor, opts)) return

    // Fallback to plain text
    const text = data.getData(MimeType.PlainText)
    if (!text || !opts?.multiline)
        return editorInsertData(data)

    const single = text.replace(/\r?\n/g, ' ')
    Transforms.insertText(editor, single)
}

function tryInsertHtml(
    data: DataTransfer,
    editor: Editor,
    opts?: RichTextEditorProps,
) {
    const html = data.getData(MimeType.Html)
    if (!html) return false

    let fragment = deserializeHtml(html, opts)

    if (!opts?.multiline)
        fragment = collapseFragmentToSingleParagraph(fragment)

    if (fragment.length > 0) {
        Transforms.insertFragment(editor, fragment)
        return true
    }

    return false
}

// ---- HTML -> Slate fragment (allowlist) ----
function deserializeHtml(
    html: string,
    opts?: { multiline?: boolean }
): Descendant[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, MimeType.Html)
    const body = doc.body
    const nodes = deserializeChildren(body, {}, opts)

    // If we already have block structure (paragraphs/lists), return as-is.
    const hasBlock = nodes.some(n =>
        RichUtils.isParagraphElement(n) ||
        RichUtils.isListContainer(n))
    if (hasBlock) return nodes

    // Otherwise, treat it as inline paste and wrap in a paragraph.
    const inlineNodes = nodes.filter(RichUtils.isInlineDescendant) as any[]
    const paragraph: ParagraphElement = {
        type: RichElementType.Paragraph,
        children: inlineNodes.length ? inlineNodes : [{ text: '' }],
    }

    return [paragraph]
}

function deserializeChildren(
    parent: Node,
    marks: Marks,
    opts?: RichTextEditorProps,
): Descendant[] {
    const out: Descendant[] = []

    parent.childNodes.forEach((node) => {
        out.push(...deserializeNode(node, marks, opts))
    })

    // Filter out empty text nodes that are
    // purely whitespace artifacts if you want:
    // return out.filter(n => !(Text.isText(n) && n.text === ''));
    return out
}

function deserializeNode(
    node: Node,
    marks: Marks,
    opts?: { multiline?: boolean },
): Descendant[] {
    const multiline = !!opts?.multiline

    // --------------------------------------

    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? ''
        if (text.length === 0) return []
        return [{ text, ...marks } satisfies CustomText]
    }

    // Non-element node (comment, etc.)
    if (node.nodeType !== Node.ELEMENT_NODE) return []

    const el = node as HTMLElement
    const tag = el.tagName.toLowerCase()

    // Update marks based on tags (allowlist)
    if (tag === 'strong' || tag === 'b')
        return deserializeChildren(el, { ...marks, bold: true })
    if (tag === 'em' || tag === 'i')
        return deserializeChildren(el, { ...marks, italic: true })
    if (tag === 'u')
        return deserializeChildren(el, { ...marks, underline: true })

    // Link (allowlist)
    if (tag === 'a') {
        const url = el.getAttribute('href') ?? ''
        const children = deserializeChildren(el, marks)
            .filter(RichUtils.isCustomText) as CustomText[]
        if (!children.length) return []

        const link: LinkElement = { type: RichElementType.Link, url, children }
        return [link]
    }

    // Block handling: treat common blocks as paragraph boundaries
    if (tag === 'p' || tag === 'div' || tag === 'li') {
        const children = deserializeChildren(el, marks)

        // Flatten any nested paragraphs that might come from odd HTML into inline children
        const inlineChildren = children.flatMap((n) => {
            if (!Text.isText(n) && (n as any).type === RichElementType.Paragraph)
                return (n as any).children as Descendant[]
            return [n]
        })

        const paragraph: ParagraphElement = {
            type: RichElementType.Paragraph,
            children: inlineChildren.length
                ? (inlineChildren as any) : [{ text: '' }],
        }
        return [paragraph]
    }

    if (multiline && tag === 'ul') {
        const items = deserializeChildren(el, marks).filter(
            (n) => !Editor.isEditor(n) && (n as any).type === RichElementType.ListItem
        ) as any[]

        return items.length
            ? [{ type: RichElementType.BulletedList, children: items }]
            : []
    }

    if (multiline && tag === 'ol') {
        const items = deserializeChildren(el, marks).filter(
            (n) => !Editor.isEditor(n) && (n as any).type === RichElementType.ListItem
        ) as any[]

        return items.length
            ? [{ type: RichElementType.NumberedList, children: items }]
            : []
    }

    if (multiline && tag === 'li') {
        // A list-item typically contains a paragraph
        const children = deserializeChildren(el, marks)
        const paragraph = {
            type: RichElementType.Paragraph,
            children: children.length ? children : [{ text: '' }],
        }
        return [{ type: RichElementType.ListItem, children: [paragraph] } as ListItemElement]
    }

    // Ignore everything else structurally, but keep its text content
    // (This is the key “sanitize/whitelist” behavior.)
    return deserializeChildren(el, marks)
}

function collapseFragmentToSingleParagraph(
    fragment: Descendant[]
): Descendant[] {
    // Pull all text+marks+links out as inline nodes,
    // preserving inline structure but flattening blocks
    // to inline runs separated by spaces.
    const inlines: any[] = []

    const pushSpaceIfNeeded = () => {
        const last = inlines[inlines.length - 1]
        if (!last) return
        if (Text.isText(last) && last.text.endsWith(' ')) return
        inlines.push({ text: ' ' })
    }

    const walk = (n: any) => {
        if (Text.isText(n)) {
            if (n.text) inlines.push({
                ...n,
                text: n.text.replace(/\r?\n/g, ' ')
            })
            return
        }

        if (n && typeof n === 'object' && Array.isArray(n.children)) {
            // If it's a block-ish element, ensure separation between blocks
            const isBlockLike =
                n.type === RichElementType.Paragraph    ||
                n.type === RichElementType.ListItem     ||
                n.type === RichElementType.BulletedList ||
                n.type === RichElementType.NumberedList

            if (isBlockLike && inlines.length) pushSpaceIfNeeded()

            for (const c of n.children) walk(c)

            if (isBlockLike) pushSpaceIfNeeded()
            return
        }
    }

    for (const n of fragment) walk(n)

    // Trim leading/trailing space text nodes
    while (inlines.length &&
        Text.isText(inlines[0]) &&
        inlines[0].text.trim() === ''
    ) inlines.shift()

    while (inlines.length &&
        Text.isText(inlines[inlines.length - 1]) &&
        inlines[inlines.length - 1].text.trim() === ''
    ) inlines.pop()

    // Ensure at least one text node
    const children = inlines.length ? inlines : [{ text: '' }]
    return [{ type: RichElementType.Paragraph, children }]
}
