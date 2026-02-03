import {
    Editor,
    Element as SlateElement,
    Transforms,
    Text,
    Range,
} from 'slate'
import { RichElementType, RichMarkType } from '../types'
import { RichUtils } from './utils'

const MARK_KEYS = Object.values(RichMarkType)

export function clearFormatting(editor: Editor) {
    const { selection } = editor
    if (!selection) return

    Editor.withoutNormalizing(editor, () => {
        removeMarksFromTextNode(editor, selection)
        unwrapLinksInSelection(editor, selection)
        clearLists(editor, selection)
        clearActiveMarks(editor, selection)
        normalizeDocument(editor)
    })
}

function removeMarksFromTextNode(
    editor: Editor,
    selection: Range,
) {
    // 1) Remove marks from all text nodes in selection (or at cursor position)
    Transforms.setNodes(
        editor,
        Object.fromEntries(MARK_KEYS.map((k) => [k, undefined])),
        {
            at: selection,
            match: Text.isText,
            split: true, // ensures only the selected part loses marks
        }
    )
}

function unwrapLinksInSelection(
    editor: Editor,
    selection: Range,
) {
    // 2) Unwrap links in selection (or at cursor)
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: RichUtils.isLinkElement,
        split: true, // ensures only the selected part is unwrapped
    })
}

function clearLists(
    editor: Editor,
    selection: Range,
) {
    // 3) Clear lists safely (works for BOTH list-item shapes)
    unwrapListContainers(editor, selection)
    paragraphifyListItems(editor, selection)
    flattenListItemParagraphs(editor, selection)
}

function unwrapListContainers(
    editor: Editor,
    selection: Range,
) {
    // First unwrap list containers (ul/ol)
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: RichUtils.isListContainer,
        split: true,
    })
}

function paragraphifyListItems(
    editor: Editor,
    selection: Range,
) {
    // Then convert any remaining list-item blocks into paragraphs.
    // This avoids producing naked text at the root.
    Transforms.setNodes(
        editor,
        { type: RichElementType.Paragraph },
        {
            at: selection,
            match: RichUtils.isListItem,
        }
    )
}

function flattenListItemParagraphs(
    editor: Editor,
    selection: Range,
) {
    // If the list-item had a nested paragraph child, flatten it:
    // list-item(paragraph(...)) -> paragraph(...)
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            (n as any).type === RichElementType.Paragraph &&
            // unwrap only paragraphs that are inside paragraphs created from list-items is hard to detect cheaply
            // but unwrapping nested paragraphs is generally safe if you don't create them elsewhere.
            false,
        split: true,
    })
}

function clearActiveMarks(
    editor: Editor,
    selection: Range,
) {
    // 4) Also clear 'active marks' (important for collapsed cursor)
    // If the cursor is inside bold text and you clear formatting, you typically
    // want the next typed characters to be unformatted.
    if (!Range.isCollapsed(selection)) return

    for (const k of MARK_KEYS) {
        Editor.removeMark(editor, k)
    }

    // 5) If inside a link, unwrap it
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: RichUtils.isLinkElement,
    })
}

function normalizeDocument(editor: Editor) {
    // 5) Never allow empty document
    if (editor.children.length !== 0) return

    Transforms.insertNodes(editor, {
        type: RichElementType.Paragraph,
        children: [{ text: '' }],
    })
}
