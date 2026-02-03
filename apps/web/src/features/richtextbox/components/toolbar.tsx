import {
    useFocused,
    useSlateSelection,
    useSlateStatic,
} from 'slate-react'
import { Range } from 'slate'
import { Vector } from '@shared/vectors'
import { ToolbarRow } from './primitive'
import {
    RichElementType,
    RichMarkType,
    RichTextboxMode,
} from '../types'
import {
    ClearFormattingButton,
    LinkButton,
    ListButton,
    MarkButton,
} from './buttons'

export function Toolbar({
    multiline,
    mode,
}: {
    multiline?: boolean
    mode: RichTextboxMode
}) {
    const editor = useSlateStatic()
    const selection = useSlateSelection()
    const focused = useFocused()
    const canRead = focused && selection && Range.isRange(selection)

    return <ToolbarRow role='toolbar' aria-label='Formatting options'>
        <MarkButton
            editor={editor}
            icon={<Vector.Bold />}
            mark={RichMarkType.Bold}
            label='Bold'
            canRead={!!canRead}
            mode={mode}
        />
        <MarkButton
            editor={editor}
            icon={<Vector.Italic />}
            mark={RichMarkType.Italic}
            label='Italic'
            canRead={!!canRead}
            mode={mode}
        />
        <MarkButton
            editor={editor}
            icon={<Vector.Underline />}
            mark={RichMarkType.Underline}
            label='Underline'
            canRead={!!canRead}
            mode={mode}
        />
        <LinkButton
            icon={<Vector.Link />}
            label='Insert link'
            canRead={!!canRead}
            mode={mode}
        />
        {multiline && <>
            <ListButton
                editor={editor}
                icon={<Vector.NumberList />}
                type={RichElementType.NumberedList}
                label='Numbered list'
                canRead={!!canRead}
                mode={mode}
            />
            <ListButton
                editor={editor}
                icon={<Vector.BulletList />}
                type={RichElementType.BulletedList}
                label='Bulleted list'
                canRead={!!canRead}
                mode={mode}
            />
        </>}
        <ClearFormattingButton
            icon={<Vector.ClearFormatting />}
            label='Remove formatting'
            mode={mode}
        />
    </ToolbarRow>
}
