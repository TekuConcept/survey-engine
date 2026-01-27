import * as React from 'react'
import { ContextMenuProps } from './types'
import { MenuPadTopBottom, MenuRoot } from './basic'
import { MenuItems } from './menu-item'

/**
 * ContextMenu
 * - "items" variant renders nested arrays
 * - "children" variant allows composition
 */
export function ContextMenu({
    items,
    onSelect,
    className,
    style,
    children,
}: ContextMenuProps) {
    return (
        <MenuRoot className={className} style={style} role="menu">
            <MenuPadTopBottom>
                {items ? (
                    <MenuItems items={items} onSelect={onSelect} />
                ) : (
                    children
                )}
            </MenuPadTopBottom>
        </MenuRoot>
    )
}

export function ContextSubmenu({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
ContextSubmenu.displayName = 'ContextSubmenu'

export function ContextMenuGroup({
    children,
}: { children: React.ReactNode }) {
    return <>{children}</>
}
