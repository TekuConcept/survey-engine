import { LeafSpan, P } from '../components/primitive'
import { RichElementType } from '../types'

export function renderElement(props: any) {
    const { element, attributes, children } = props

    switch (element.type) {
    case RichElementType.Link: return <a
        {...attributes}
        href={element.url}
        target='_blank'
        rel='noopener noreferrer'
    >{children}</a>
    case RichElementType.BulletedList: return <ul {...attributes}>{children}</ul>
    case RichElementType.NumberedList: return <ol {...attributes}>{children}</ol>
    case RichElementType.ListItem:     return <li {...attributes}>{children}</li>
    case RichElementType.Paragraph:
    default: return <P {...attributes}>{children}</P>
    }
}

export function renderLeaf(props: any) {
    const { leaf, attributes, children } = props

    let el = children
    if (leaf.bold)      el = <strong>{el}</strong>
    if (leaf.italic)    el = <em>{el}</em>
    if (leaf.underline) el = <u>{el}</u>

    return <LeafSpan {...attributes}>{el}</LeafSpan>
}
