import { Editor } from 'slate'
import { RichUtils } from './utils'
import { wrapLink } from './wrap'
import { MimeType, RichElementType } from '../types'

export function withLinks<T extends Editor>(editor: T): T {
    const { isInline, insertText, insertData } = editor

    editor.isInline = element =>
        (element as any).type === RichElementType.Link
        ? true : isInline(element)

    // Optional: auto-link when pasting a URL as plain text
    editor.insertText = text => {
        if (RichUtils.isUrl(text)) wrapLink(editor, text)
        else insertText(text)
    }

    editor.insertData = data => {
        const text = data.getData(MimeType.PlainText)
        if (text && RichUtils.isUrl(text)) wrapLink(editor, text)
        else insertData(data)
    }

    return editor
}
