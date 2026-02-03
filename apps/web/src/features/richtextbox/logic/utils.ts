import {
    Text,
    Editor,
    Node,
    Element as SlateElement,
    Descendant,
} from 'slate'
import {MimeType, RichElementType, RichMarkType } from '../types'

export namespace RichUtils {
    export function isUrl(text: string) {
        try { return new URL(text), true }
        catch { return false }
    }

    export function isElementType(
        element: Node,
        type: RichElementType[],
    ) {
        return !Editor.isEditor(element) &&
            SlateElement.isElement(element) &&
            type.includes(element.type)
    }

    export function isLinkElement(element: Descendant | Node)
    { return isElementType(element, [RichElementType.Link]) }

    export function isParagraphElement(n: Descendant | Node)
    { return isElementType(n, [RichElementType.Paragraph]) }

    export function isListContainer(n: Descendant | Node) {
        return isElementType(n, [
            RichElementType.BulletedList,
            RichElementType.NumberedList,
        ])
    }

    export function isListItem(n: Descendant | Node)
    { return isElementType(n, [RichElementType.ListItem]) }

    export function isInlineDescendant(n: Descendant)
    { return isCustomText(n) || isLinkElement(n) }

    export function isBlockActive(
        editor: Editor,
        blockType: RichElementType
    ) {
        const [match] = Editor.nodes(editor, {
            match: n => isElementType(n, [blockType]),
        })

        return !!match
    }

    export function isListItemActive(editor: Editor)
    { return isBlockActive(editor, RichElementType.ListItem) }

    export function isLinkActive(editor: Editor)
    { return isBlockActive(editor, RichElementType.Link) }

    export function isMarkActive(editor: Editor, mark: RichMarkType): boolean
    { return !!Editor.marks(editor)?.[mark] }

    export function isCustomText(n: Descendant)
    { return Text.isText(n) }

    export function isPlaintextOnlyPaste(dt: DataTransfer) {
        // Ctrl+Shift+V typically results in ONLY text/plain being present.
        // (No text/html, etc.)
        // return dt.types.length === 1 && dt.types[0] === 'text/plain'
        return (
            dt &&
            dt.getData(MimeType.PlainText) !== '' &&
            dt.types.length === 1
        )
    }

    export function isCurrentBlockEmpty(editor: Editor) {
        if (!editor.selection) return false

        // Find the nearest block that contains the caret/selection
        const entry = Editor.above(editor, {
            at: editor.selection,
            match: n =>
                SlateElement.isElement(n) &&
                Editor.isBlock(editor, n),
        })

        if (!entry) return false

        const [_, blockPath] = entry
        const text = Editor
            .string(editor, blockPath)
            .replace(/\s+/g, ' ').trim()

        return text.length === 0
    }

    export function toggleMark(editor: Editor, mark: RichMarkType) {
        const active = isMarkActive(editor, mark)
        if (active) Editor.removeMark(editor, mark)
        else Editor.addMark(editor, mark, true)
    }
}
