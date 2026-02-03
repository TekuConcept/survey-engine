import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    InputField,
    RichTextboxContainer,
    Separator,
    StyledEditable,
    ToolbarInner,
    ToolbarWrap,
} from './components/primitive'
import { Toolbar } from './components/toolbar'
import { onKeyDown, onPaste } from './logic/events'
import { renderElement, renderLeaf } from './logic/renderer'
import { withHtml } from './logic/with-html'
import { withLinks } from './logic/with-links'
import { withSingleLine } from './logic/with-single-line'
import { RichElementType, RichTextboxMode } from './types'

type RichTextboxProps = {
    multiline?: boolean

    value?: Descendant[]
    defaultValue?: Descendant[]
    onChange?: (v: Descendant[]) => void

    ariaLabel?: string
    placeholder?: string

    dataTarget?: boolean
    mode?: RichTextboxMode // Default: Question
}

const DEFAULT_VALUE: Descendant[] = [{
    type: RichElementType.Paragraph,
    children: [{ text: 'Select text, then use buttons.' }],
}]

export function RichTextEditor({
  multiline = true,
  value: controlledValue,
  defaultValue = DEFAULT_VALUE,
  onChange,
  ariaLabel = 'Text',
  placeholder = 'Enter text...',
  dataTarget = false,
  mode = RichTextboxMode.Question,
}: RichTextboxProps) {
    const isControlled = controlledValue != null
    const [uncontrolledValue, setUncontrolledValue] = useState<Descendant[]>(defaultValue)
    const value = isControlled ? controlledValue! : uncontrolledValue

    const editor = useMemo(() => {
        let e = withHistory(withReact(createEditor()))
        e = withHtml(withLinks(e), { multiline })
        return multiline ? e : withSingleLine(e)
    }, [multiline])

    const [isFocusWithin, setIsFocusWithin] = useState(false)

    const handleChange = useCallback((next: Descendant[]) => {
        if (!isControlled) setUncontrolledValue(next)
        onChange?.(next)
    }, [isControlled, onChange])

    const onFocusCapture = useCallback(() => {
        setIsFocusWithin(true)
    }, [])

    const onBlurCapture = useCallback((e: React.FocusEvent) => {
        // Collapse only if focus moved outside the whole richtextbox container
        const next = e.relatedTarget as HTMLElement | null
        const current = e.currentTarget as HTMLElement
        if (next && current.contains(next)) return
        setIsFocusWithin(false)
    }, [])

    return <RichTextboxContainer
        $mode={mode}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
        data-focused={isFocusWithin ? 'true' : 'false'}
    >
        <Slate editor={editor} initialValue={value} onChange={handleChange}>
            <InputField $mode={mode}>
                <StyledEditable
                    role="textbox"
                    $mode={mode}
                    $dataTarget={dataTarget}
                    aria-label={ariaLabel}
                    aria-multiline={multiline}
                    placeholder={placeholder}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onPaste={e => onPaste(editor, e)}
                    onKeyDown={e => onKeyDown(editor, e, multiline)}
                    spellCheck
                />
            </InputField>

            {dataTarget && <>
                <Separator $mode={mode} />

                <ToolbarCollapse open={isFocusWithin}>
                    <Toolbar multiline={multiline} mode={mode} />
                </ToolbarCollapse>
            </>}
        </Slate>
    </RichTextboxContainer>
}

function ToolbarCollapse({ open, children }: {
    open: boolean
    children: React.ReactNode
}) {
    return <ToolbarWrap data-open={open ? 'true' : 'false'}>
        <ToolbarInner>{children}</ToolbarInner>
    </ToolbarWrap>
}
