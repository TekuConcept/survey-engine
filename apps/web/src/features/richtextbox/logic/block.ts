import { Editor, Transforms } from 'slate'
import { ListType, RichElementType } from '../types'
import { RichUtils } from './utils'

export function toggleList(
    editor: Editor,
    listType: ListType,
) {
    const isActive = RichUtils.isBlockActive(editor, listType)

    Editor.withoutNormalizing(editor, () => {
        unwrapExistingList(editor)

        if (isActive) {
            unwrapListItems(editor)
            return
        }

        paragraphifyListItems(editor)
        wrapListItemsInContainer(editor, listType)
    })
}

function unwrapExistingList(editor: Editor) {
    Transforms.unwrapNodes(editor, {
        match: RichUtils.isListContainer,
        split: true,
    })
}

function paragraphifyListItems(editor: Editor) {
    // Toggling on: convert selected paragraphs to list-items
    Transforms.setNodes(
        editor,
        { type: RichElementType.ListItem },
        { match: RichUtils.isParagraphElement }
    )
}

function wrapListItemsInContainer(
    editor: Editor,
    listType: ListType,
) {
    // Wrap list-items in the list container
    Transforms.wrapNodes(
        editor,
        { type: listType, children: [] },
        { match: RichUtils.isListItem }
    )
}

function unwrapListItems(editor: Editor) {
    // If toggling off: turn list-items back into
    // paragraphs and unwrap list-item wrappers
    Transforms.setNodes(
        editor,
        { type: RichElementType.Paragraph },
        { match: RichUtils.isListItem }
    )
}
