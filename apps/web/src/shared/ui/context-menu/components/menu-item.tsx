import React from 'react'
import {
    AffordanceCol,
    Chevron,
    IconCol,
    ItemButton,
    ItemWrap,
    LabelCol,
    MenuPadTopBottom,
    MenuSeparator,
    SubmenuPane,
} from './basic'
import { MenuItemDef, ContextMenuItemProps } from './types'
import { ContextSubmenu } from './menu'

/** Array renderer */
export function MenuItems({
    items,
    onSelect,
}: {
    items: MenuItemDef[]
    onSelect?: (key: string) => void
}) {
    return (
        <>
            {items.map((it) => {
                if (it.kind === 'separator') {
                    return <MenuSeparator key={it.key} />
                }

                return (
                    <MenuItem
                        key={it.key}
                        icon={it.icon}
                        disabled={it.disabled}
                        submenu={it.submenu}
                        onSelect={() => onSelect?.(it.key)}
                    >
                        {it.label}
                    </MenuItem>
                )
            })}
        </>
    )
}

/**
 * MenuItem
 * - fixed icon column width => labels align even when no icon
 * - submenu opens on hover/focus-within
 */
export function MenuItem({
    icon: Icon,
    disabled = false,
    submenu,
    submenuContent,
    onSelect,
    children,
    className,
    style,
}: ContextMenuItemProps) {
    const hasSubmenu = !!submenu?.length || !!submenuContent

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (disabled) return
        if (hasSubmenu) return // parent items typically don't "select" on click
        onSelect?.()
    }

    return (
        <ItemWrap
            className={className}
            style={style}
            $disabled={disabled}
            $hasSubmenu={hasSubmenu}
            role="none"
        >
            <ItemButton
                type="button"
                role="menuitem"
                disabled={disabled}
                aria-disabled={disabled || undefined}
                aria-haspopup={hasSubmenu ? 'menu' : undefined}
                aria-expanded={hasSubmenu ? false : undefined}
                onClick={handleClick}
            >
                <IconCol aria-hidden="true">
                    {Icon ? <Icon width={16} height={16} color="currentColor" /> : null}
                </IconCol>

                <LabelCol title={typeof children === 'string' ? children : undefined}>
                    {children}
                </LabelCol>

                <AffordanceCol aria-hidden="true">
                    {hasSubmenu ? <Chevron>›</Chevron> : null}
                </AffordanceCol>
            </ItemButton>

            {hasSubmenu ? (
                <SubmenuPane role="menu">
                    <MenuPadTopBottom>
                        {submenuContent ? (
                            submenuContent
                        ) : (
                            <MenuItems items={submenu!} onSelect={onSelect ? () => {} : undefined} />
                        )}
                        {/* <MenuItems items={submenu!} onSelect={onSelect ? () => {} : undefined} /> */}
                        {/* Note: selection is handled by leaf MenuItems via their own onSelect.
                           For submenu items you’ll typically pass onSelect through via items renderer.
                           If you want a single onSelect at the top-level for all keys, keep using ContextMenu.items + onSelect. */}
                    </MenuPadTopBottom>
                </SubmenuPane>
            ) : null}
        </ItemWrap>
    )
}

// export function ContextMenuItem(props: MenuItemProps) {
//     return <MenuItem {...props} />
// }

export function ContextMenuItem({
    icon,
    disabled,
    onSelect,
    children,
    className,
    style,
}: ContextMenuItemProps) {
    const parts = React.Children.toArray(children)

    const submenuEl = parts.find(
        (c) => React.isValidElement(c) && c.type === ContextSubmenu
    ) as React.ReactElement | undefined

    // IMPORTANT: labelChildren must EXCLUDE the submenu element
    const labelChildren = parts.filter(
        (c) => !(React.isValidElement(c) && c.type === ContextSubmenu)
    )

    return <MenuItem
        icon={icon}
        disabled={disabled}
        onSelect={onSelect}
        submenuContent={submenuEl ? submenuEl.props.children : undefined}
        className={className}
        style={style}
    >
        {labelChildren}
    </MenuItem>
}

