import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { RichElementType } from '../types'
import { RichUtils } from './utils'

export function onPaste(
    editor: Editor,
    e: React.ClipboardEvent<HTMLDivElement>,
) {
    const dt = e.clipboardData

    // Only intercept the “paste without formatting” case.
    // Let normal paste (with HTML) flow through Slate’s normal pipeline,
    // which will call your editor.insertData override.
    if (dt && RichUtils.isPlaintextOnlyPaste(dt)) {
        e.preventDefault()

        // Route through Slate's insertion pipeline (this will ultimately call
        // editor.insertData(dt), i.e. your overridden insertData in withHtml).
        ReactEditor.insertData(editor, dt)
    }
}

export function onKeyDown(
    editor: Editor,
    e: React.KeyboardEvent<HTMLDivElement>,
    multiline: boolean | undefined,
) {
    if (e.key !== 'Enter') return
    if (!multiline) e.preventDefault()
    if (!(RichUtils.isListItemActive(editor) &&
        RichUtils.isCurrentBlockEmpty(editor))) return

    e.preventDefault()

    // Turn the current list-item's paragraph
    // into a paragraph outside the list
    Transforms.unwrapNodes(editor, {
        match: RichUtils.isListContainer,
        split: true,
    })

    Transforms.setNodes(
        editor, { type: RichElementType.Paragraph },
        { match: RichUtils.isListItem }
    )
}
