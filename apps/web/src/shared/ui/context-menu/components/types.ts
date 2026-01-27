import { IconComponent } from '@shared/vectors'

export type MenuItemSeparator = {
    kind: 'separator'
    key: string
}

export type MenuItemOption = {
    kind?: 'item'
    key: string
    label: React.ReactNode
    icon?: IconComponent
    disabled?: boolean
    submenu?: MenuItemDef[]
}

export type MenuItemDef =
    | MenuItemOption
    | MenuItemSeparator

export type ContextMenuProps = {
    items?: MenuItemDef[]
    onSelect?: (key: string) => void
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

export type ContextMenuItemProps = {
    icon?: IconComponent
    disabled?: boolean

    /** data-driven */
    submenu?: MenuItemDef[]

    /** composition-driven */
    submenuContent?: React.ReactNode
    children: React.ReactNode

    onSelect?: () => void
    className?: string
    style?: React.CSSProperties
}
