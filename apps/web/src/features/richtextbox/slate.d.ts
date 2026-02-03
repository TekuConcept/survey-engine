import type { BaseEditor, Descendant } from 'slate'
import type { ReactEditor } from 'slate-react'
import type { HistoryEditor } from 'slate-history'

/** NOTE: Keep in sync with richtextbox/types.ts */
enum RichElementType {
    Paragraph = 'paragraph',
    Link = 'link',
    BulletedList = 'bulleted-list',
    NumberedList = 'numbered-list',
    ListItem = 'list-item',
}

/**
 * Text leaf
 */
export type CustomText = {
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
}

/**
 * Inline nodes
 * - Link should only contain inline content (text with marks, and optionally other inlines if you add them later).
 */
export type LinkElement = {
    type: RichElementType.Link
    url: string
    children: CustomText[] // keep it strict for now
}

/**
 * Block nodes
 * - Paragraph contains inline children (text + link).
 */
export type ParagraphElement = {
    type: RichElementType.Paragraph
    children: (CustomText | LinkElement)[]
}

/**
 * Lists
 * - A list contains list-items
 * - A list-item usually contains blocks (commonly a single paragraph, but can be more if you allow).
 */
export type ListItemElement = {
    type: RichElementType.ListItem
    children: ParagraphElement[] // simplest + common; can broaden later
}

export type BulletListElement = {
    type: RichElementType.BulletedList
    children: ListItemElement[]
}

export type NumberedListElement = {
    type: RichElementType.NumberedList
    children: ListItemElement[]
}

export type CustomElement =
    | ParagraphElement
    | LinkElement
    | BulletListElement
    | NumberedListElement
    | ListItemElement

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor
        Element: CustomElement
        Text: CustomText
    }
}
