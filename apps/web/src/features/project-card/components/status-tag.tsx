import styled from 'styled-components'

export enum TagStatus {
    Draft = 'Draft',
    Active = 'Active',
    Stopped = 'Stopped',
    Archived = 'Archived',
}

export function StatusTag({
    status = TagStatus.Active,
}) { return <Tag $status={status}>{status}</Tag> }

/* ---------- styles ---------- */

const Tag = styled.div<{
    $status: TagStatus
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    width: 75px;

    background-color: ${({ $status, theme }) => {
        switch ($status) {
        case TagStatus.Draft:    return theme.color.control.tag.draft.bg
        case TagStatus.Active:   return theme.color.control.tag.active.bg
        case TagStatus.Stopped:  return theme.color.control.tag.stopped.bg
        case TagStatus.Archived: return theme.color.control.tag.archived.bg
        default:                 return theme.color.control.tag.active.bg
        }
    }};
    color: ${({ $status, theme }) => {
        switch ($status) {
        case TagStatus.Draft:    return theme.color.control.tag.draft.fg
        case TagStatus.Active:   return theme.color.control.tag.active.fg
        case TagStatus.Stopped:  return theme.color.control.tag.stopped.fg
        case TagStatus.Archived: return theme.color.control.tag.archived.fg
        default:                 return theme.color.control.tag.active.fg
        }
    }};
    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    border-radius: ${({ theme }) => theme.component.tag.radius};
`
