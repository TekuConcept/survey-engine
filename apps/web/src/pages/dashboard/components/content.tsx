import { RoundedButton, RoundedTextbox } from '@shared/ui'
import { Vector } from '@shared/vectors'
import { theme } from '@shared/styles/theme'
import { ProjectCard } from '@features/project-card'
import {
    CardCell,
    CardsGrid,
    Content,
    ContentInner,
    ControlsRow,
    GridScrollArea,
    SearchWrap,
} from './primitive'
import { DEMO_PROJECTS } from '../demo-data'

export function MainContent() {
    return <Content>
        <ContentInner>
            <Controls />

            <GridScrollArea>
                <CardsGrid>
                    {DEMO_PROJECTS.map((p) => (
                        <CardCell key={p.name}>
                            <ProjectCard project={p} />
                        </CardCell>
                    ))}
                </CardsGrid>
            </GridScrollArea>
        </ContentInner>
    </Content>
}

function Controls() {
    return <ControlsRow>
        <SearchBox />

        <RoundedButton icon={Vector.Plus}>
            New
        </RoundedButton>
    </ControlsRow>
}

function SearchBox() {
    return <SearchWrap>
        <RoundedTextbox
            icon={Vector.Search}
            placeholder='Search Projects'
            colors={{
                idle: {
                    background: theme.color.control.textbox.idle.background,
                    foreground: theme.color.control.textbox.idle.foreground,
                    placeholder: theme.color.control.textbox.idle.placeholder,
                    border: theme.color.control.textbox.idle.border,
                },
                focus: {
                    background: theme.color.control.textbox.focus.background,
                    foreground: theme.color.control.textbox.focus.foreground,
                    placeholder: theme.color.control.textbox.focus.placeholder,
                },
            }}
        />
    </SearchWrap>
}
