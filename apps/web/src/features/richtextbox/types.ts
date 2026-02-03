import { Descendant } from 'slate'

export enum RichTextboxMode {
    Title = 'title',
    Description = 'desc',
    Question = 'q',
}

export interface RichTextEditorProps {
    /**
     * If false, restricts to single-line input.
     * Default: true
     */
    multiline?: boolean

    /** Uncontrolled initial value */
    defaultValue?: Descendant[]
    /** Controlled value */
    value?: Descendant[]
    /** Value change handler */
    onChange?: (value: Descendant[]) => void
}

/** NOTE: Keep in sync with richtextbox/slate.d.ts */
export enum RichElementType {
    Paragraph = 'paragraph',
    Link = 'link',
    BulletedList = 'bulleted-list',
    NumberedList = 'numbered-list',
    ListItem = 'list-item',
}

export enum RichMarkType {
    Bold = 'bold',
    Italic = 'italic',
    Underline = 'underline',
}

export enum MimeType {
    PlainText = 'text/plain',
    Html = 'text/html',
}

export type ListType =
    | RichElementType.BulletedList
    | RichElementType.NumberedList
