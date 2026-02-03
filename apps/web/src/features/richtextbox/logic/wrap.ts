import { Editor, Transforms, Range } from 'slate'
import { LinkElement } from '../slate'
import { RichElementType } from '../types'
import { RichUtils } from './utils'

export function unwrapLink(editor: Editor)
{ Transforms.unwrapNodes(editor, { match: RichUtils.isLinkElement }) }

export function wrapLink(editor: Editor, url: string) {
    if (RichUtils.isLinkActive(editor)) unwrapLink(editor)

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)

    const link: LinkElement = {
        type: RichElementType.Link,
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) Transforms.insertNodes(editor, link)
    else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}
