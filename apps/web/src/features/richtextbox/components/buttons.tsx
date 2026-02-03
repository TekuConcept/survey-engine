import { useSlateStatic } from 'slate-react'
import { RichElementType, RichMarkType, RichTextboxMode } from '../types'
import { RichUtils } from '../logic/utils'
import { ToolButton } from './primitive'
import { toggleList } from '../logic/block'
import { unwrapLink, wrapLink } from '../logic/wrap'
import { clearFormatting } from '../logic/clear-formatting'

export function MarkButton({
    editor, icon, mark, label, canRead, mode,
}: {
    editor: ReturnType<typeof useSlateStatic>
    icon: React.ReactNode
    mark: RichMarkType
    label: string
    canRead: boolean
    mode: RichTextboxMode
}) {
    const active = canRead && RichUtils.isMarkActive(editor, mark)
    return <ToolButton
        type='button'
        role='button'
        aria-label={label}
        aria-pressed={active}
        $active={active}
        $mode={mode}
        onMouseDown={(e) => {
            e.preventDefault()
            RichUtils.toggleMark(editor, mark)
        }}
    >{icon}</ToolButton>
}

export function ListButton({
    editor, icon, type, label, canRead, mode,
}: {
    editor: ReturnType<typeof useSlateStatic>
    icon: React.ReactNode
    type: RichElementType.BulletedList | RichElementType.NumberedList
    label: string
    canRead: boolean
    mode: RichTextboxMode
}) {
    const active = canRead && RichUtils.isBlockActive(editor, type)
    return <ToolButton
        type='button'
        aria-label={label}
        aria-pressed={active}
        $active={active}
        $mode={mode}
        onMouseDown={(e) => {
            e.preventDefault()
            toggleList(editor, type)
        }}
    >{icon}</ToolButton>
}

export function LinkButton({
    icon,
    label,
    canRead,
    mode,
}: {
    icon: React.ReactNode
    label: string
    canRead: boolean
    mode: RichTextboxMode
}) {
    const editor = useSlateStatic()
    const active = canRead && RichUtils.isLinkActive(editor)

    return <ToolButton
        type='button'
        aria-label={label}
        aria-pressed={active}
        $active={active}
        $mode={mode}
        onMouseDown={(e) => {
            e.preventDefault()
            if (active) return unwrapLink(editor)

            const url = window.prompt('Enter URL:')
            if (!url) return
            wrapLink(editor, url)
        }}
    >{icon}</ToolButton>
}

export function ClearFormattingButton({
    icon,
    label,
    mode,
}: {
    icon: React.ReactNode
    label: string
    mode: RichTextboxMode
}) {
    const editor = useSlateStatic()
    return <ToolButton
        type='button'
        aria-label={label}
        $mode={mode}
        onMouseDown={(e) => {
            e.preventDefault()
            clearFormatting(editor)
        }}
    >{icon}</ToolButton>
}
