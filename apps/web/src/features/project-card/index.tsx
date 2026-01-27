import React from 'react'
import styled from 'styled-components'
import { AnchoredMenu, ContextMenu } from '@shared/ui'
import { DotsButton } from './components/dots-button'
import { KeyValue } from './components/key-value'
import { PrimaryKeyValue } from './components/primary-key-value'
import { ProjectName } from './components/project-name'
import { StatusTag } from './components/status-tag'
import { CardIcon } from './components/card-icon'
import { ProjectInfo } from './types'
import { Vector } from '@/shared/vectors'

export function ProjectCard({ project }: { project: ProjectInfo }) {
    return <CardRoot>
        <CardHeaderPart project={project} />
        <CardKpiPart project={project} />
        <CardMetaPart project={project} />
    </CardRoot>
}

function CardHeaderPart({ project }: { project: ProjectInfo }) {
    const [open, setOpen] = React.useState(false)
    const dotsRef = React.useRef<HTMLButtonElement>(null)

    const close = () => setOpen(false)
    const toggle = () => setOpen((v) => !v)

    return <CardHeader>
        <HeaderLeft>
            <CardIcon />
            <ProjectName>{project.name}</ProjectName>
        </HeaderLeft>

        <HeaderRight>
            {/* <DotsButton /> */}
            <DotsButton ref={dotsRef} onClick={toggle} aria-label="Project menu" />

            <AnchoredMenu open={open} onClose={close} anchorRef={dotsRef}>
                <ContextMenu
                    items={[
                        { key: 'rename', label: 'Rename', icon: Vector.Edit },
                        { key: 'link', label: 'Copy Link', icon: Vector.Link },
                        { kind: 'separator', key: 'sep-1' },
                        { key: 'archive', label: 'Archive', icon: Vector.Archive },
                    ]}
                    onSelect={(key) => {
                        close()
                        // handle action...
                        console.log(project.name, key)
                    }}
                />
            </AnchoredMenu>
        </HeaderRight>
    </CardHeader>
}

function CardKpiPart({ project }: { project: ProjectInfo }) {
    return <PrimaryRow>
        <PrimaryKeyValue
            label='Responses'
            value={project.responseCount?.toString()}
        />
    </PrimaryRow>
}

function CardMetaPart({ project }: { project: ProjectInfo }) {
    return <CardMeta>
        <MetaLeft>
            <KeyValue
                label='Questions'
                value={project.totalQuestionCount?.toString()}
            />
            <KeyValue
                label='Runtime'
                value={project.totalRuntime}
            />
        </MetaLeft>

        <MetaRight>
            <StatusTag status={project.status} />
        </MetaRight>
    </CardMeta>
}

/* =========================
   Styled Components (Passive)
   ========================= */

const CardRoot = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;

    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.color.surface.card};

    /* Subtle shadow with slight bottom-right offset
        (approximation of #485a841f with blur) */
    // box-shadow: 4px 8px 32px rgba(72, 90, 132, 0.12);

    padding: 0 14px 14px 14px;
    transition: transform 120ms ease, box-shadow 120ms ease;

    &:hover {
        background: ${({ theme }) => theme.color.surface.cardHover};
    }
`

const CardHeader = styled.header`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* Make sure header content can shrink properly */
    min-width: 0;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    /* Allow ProjectName to ellipsize */
    min-width: 0;
    flex: 1 1 auto;
`

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    padding-left: 8px;

    position: relative;
    left: 0.5em;
`

const PrimaryRow = styled.div`
    /* PrimaryKeyValue fills width; height driven by content */
    width: 100%;
    margin-bottom: 12px;
`

const CardMeta = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 12px;
    width: 100%;
`

const MetaLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    /* Left side bottom aligned relative to right tag */
    justify-content: flex-end;

    /* Allow left content to shrink if needed */
    min-width: 0;
    flex: 1 1 auto;
`

const MetaRight = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    flex: 0 0 auto;
`
