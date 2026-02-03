import { Editor, Element as SlateElement, Transforms } from 'slate'
import { RichElementType } from '../types'

function tryInsertParagraphWhenEmpty(editor: Editor) {
    if (editor.children.length !== 0) return false

    return Transforms.insertNodes(editor, {
        type: RichElementType.Paragraph,
        children: [{ text: '' }],
    }), true
}

function tryMergeBlocksIntoFirstParagraph(editor: Editor) {
    if (editor.children.length <= 1) return false

    const firstPath: [number] = [0]
    const secondPath: [number] = [1]

    // Keep merging whatever block is currently at
    // index 1 into the first block until only the
    // first block remains.
    while (editor.children.length > 1) {
        const text = Editor.string(editor, secondPath)
            .replace(/\s+/g, ' ')
            .trim()

        // Append a space + text to end of first paragraph
        if (text) Transforms.insertText(editor, ` ${text}`, {
            at: Editor.end(editor, firstPath),
        })

        // Remove the block we just merged.
        // The next block (if any) shifts into index 1.
        Transforms.removeNodes(editor, { at: secondPath })
    }

    return true
}

function tryConvertToParagraphIfNot(editor: Editor) {
    const only = editor.children[0] as any
    if (!SlateElement.isElement(only) ||
        only.type !== RichElementType.Paragraph
    ) {
        return Transforms.setNodes(
            editor,
            { type: RichElementType.Paragraph },
            { at: [0] },
        ), true
    } else return false
}

export function withSingleLine<T extends Editor>(editor: T): T {
    const { normalizeNode } = editor

    editor.normalizeNode = (entry) => {
        const [_, path] = entry

        // Ensure root is exactly one paragraph block
        if (path.length === 0) {
            if (tryInsertParagraphWhenEmpty(editor)) return
            if (tryMergeBlocksIntoFirstParagraph(editor)) return
            if (tryConvertToParagraphIfNot(editor)) return
        }

        normalizeNode(entry)
    }

    return editor
}
