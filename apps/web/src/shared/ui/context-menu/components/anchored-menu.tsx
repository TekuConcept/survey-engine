import * as React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

type AnchorAlign = 'auto' | 'left' | 'right'

export type AnchoredMenuProps = {
    open: boolean
    onClose: () => void
    anchorRef: React.RefObject<HTMLElement>
    children: React.ReactNode

    /** px offset from the anchor (vertical) */
    offsetY?: number
    /** px horizontal nudge */
    offsetX?: number
    /** prefer left alignment unless overflow, or force left/right */
    align?: AnchorAlign
    /** extra viewport padding so it doesn’t hug edges */
    viewportPadding?: number
}

type Position = {
    left: number
    top: number
}
type WorkingContext = AnchoredMenuProps & {
    menuRef: React.RefObject<HTMLDivElement>
    setPos: React.Dispatch<React.SetStateAction<Position | null>>
    compPosition: Function
}

function resolveProps(
    props: AnchoredMenuProps
): Required<AnchoredMenuProps> {
    return {
        offsetY: props.offsetY ?? 4,
        offsetX: props.offsetX ?? 0,
        align: props.align ?? 'auto',
        viewportPadding: props.viewportPadding ?? 8,
        ...props,
    }
}

export function AnchoredMenu(props: AnchoredMenuProps) {
    const propsResolved = resolveProps(props)
    const {
        open, onClose,
        anchorRef,
        children,
        offsetY,
        offsetX,
        align,
        viewportPadding,
    } = propsResolved

    const menuRef = React.useRef<HTMLDivElement>(null)
    const [pos, setPos] = React.useState<{ left: number; top: number } | null>(null)

    const workingContext: Required<WorkingContext> = {
        ...propsResolved,
        menuRef,
        setPos,
        compPosition: () => {},
    }

    const compPosition = React.useCallback(
        () => computePosition(workingContext),
        [anchorRef, offsetX, offsetY, align, viewportPadding]
    )
    workingContext.compPosition = compPosition

    React.useEffect(
        () => closeOnOutsideClick(workingContext),
        [open, onClose, anchorRef]
    )

    // Position on open + on resize/scroll
    React.useLayoutEffect(
        () => positionOnLayoutEffect(workingContext),
        [open, compPosition]
    )

    if (!open) return null

    return createPortal(
        <MenuLayer>
            <MenuShell
                ref={menuRef}
                style={{
                    left: pos?.left ?? -9999,
                    top: pos?.top ?? -9999,
                }}
            >
                {children}
            </MenuShell>
        </MenuLayer>,
        document.body
    )
}

// Compute position after open (and when viewport changes)
function computePosition({
    anchorRef,
    menuRef,
    offsetY,
    offsetX,
    align,
    viewportPadding,
    setPos,
}: Required<WorkingContext>) {
    const anchorEl = anchorRef.current
    const menuEl = menuRef.current
    if (!anchorEl || !menuEl) return

    const a = anchorEl.getBoundingClientRect()

    // Ensure menu has measurable size (it does after render)
    const m = menuEl.getBoundingClientRect()

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Vertical placement: below anchor (clamped)
    let top = a.bottom + offsetY
    // If it would go below viewport, try to flip above
    if (top + m.height + viewportPadding > vh) {
        const flippedTop = a.top - offsetY - m.height
        if (flippedTop >= viewportPadding) top = flippedTop
        else top = Math.max(viewportPadding, vh - m.height - viewportPadding)
    }

    // Horizontal placement: prefer left-align to anchor
    const leftPreferred = a.left + offsetX
    const leftRightAligned = a.right - m.width + offsetX

    let left: number
    if (align === 'left') left = leftPreferred
    else if (align === 'right') left = leftRightAligned
    else {
        // auto: left-align unless it overflows right, then right-align
        const wouldOverflowRight = leftPreferred + m.width + viewportPadding > vw
        left = wouldOverflowRight ? leftRightAligned : leftPreferred
    }

    // Clamp into viewport
    left = Math.min(Math.max(left, viewportPadding), vw - m.width - viewportPadding)

    setPos({ left, top })
}

function closeOnOutsideClick({
    open, onClose,
    anchorRef,
    menuRef,
}: Required<WorkingContext>) {
    if (!open) return

    const onMouseDown = (e: MouseEvent) => {
        const menuEl = menuRef.current
        const anchorEl = anchorRef.current
        const t = e.target as Node | null

        // If click is inside menu or on the anchor button, ignore
        if (menuEl && t && menuEl.contains(t)) return
        if (anchorEl && t && anchorEl.contains(t)) return

        onClose()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
    }

    window.addEventListener('mousedown', onMouseDown, true)
    window.addEventListener('keydown', onKeyDown, true)

    return () => {
        window.removeEventListener('mousedown', onMouseDown, true)
        window.removeEventListener('keydown', onKeyDown, true)
    }
}

function positionOnLayoutEffect({
    open,
    compPosition,
    setPos,
}: Required<WorkingContext>) {
    if (!open) {
        setPos(null)
        return
    }

    compPosition()

    const onReflow = () => compPosition()
    window.addEventListener('resize', onReflow)
    // capture scrolls from any scrollable parent
    window.addEventListener('scroll', onReflow, true)

    return () => {
        window.removeEventListener('resize', onReflow)
        window.removeEventListener('scroll', onReflow, true)
    }
}

const MenuLayer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
`

const MenuShell = styled.div`
    position: fixed; /* anchored to viewport for reliable placement */
`
