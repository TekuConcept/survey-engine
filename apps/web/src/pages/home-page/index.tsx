import styled from 'styled-components'

export function HomePage() {
    return <Center>
        <Card>
            <Kicker>React Survey Tool</Kicker>
            <Title>Build surveys that feel effortless.</Title>
            <Subtitle>
                You’re set up and ready. Start by opening the builder, or wire up auth
                and account pages next.
            </Subtitle>

            <Actions>
                <PrimaryButton type='button'>Open Survey Builder</PrimaryButton>
                <SecondaryButton
                    type='button'
                    onClick={() => {
                        window.location.href = '/playground'
                    }}
                >
                    View Playground
                </SecondaryButton>
            </Actions>

            <FinePrint>
                Tip: keep pages thin and let features own the heavy UI and state.
            </FinePrint>
        </Card>
    </Center>
}

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
`

const Card = styled.div`
    width: min(720px, 100%);
    padding: 36px 34px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.10),
        0 1px 0 rgba(255, 255, 255, 0.6) inset;
    backdrop-filter: blur(10px);
`

const Kicker = styled.div`
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.55);
    margin-bottom: 14px;
`

const Title = styled.h1`
    margin: 0 0 12px 0;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.92);
`

const Subtitle = styled.p`
    margin: 0 0 22px 0;
    font-size: 15px;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.66);
`

const Actions = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 18px;
`

const BaseButton = styled.button`
    appearance: none;
    border: 0;
    border-radius: 12px;
    padding: 11px 14px;
    font-size: 14px;
    font-weight: 650;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;

    &:active {
        transform: translateY(1px);
    }

    &:focus-visible {
        outline: 3px solid rgba(0, 0, 0, 0.18);
        outline-offset: 2px;
    }
`

const PrimaryButton = styled(BaseButton)`
    color: rgba(255, 255, 255, 0.95);
    background: rgba(0, 0, 0, 0.90);

    &:hover {
        background: rgba(0, 0, 0, 0.96);
    }
`

const SecondaryButton = styled(BaseButton)`
    color: rgba(0, 0, 0, 0.84);
    background: rgba(255, 255, 255, 0.70);
    border: 1px solid rgba(0, 0, 0, 0.08);

    &:hover {
        background: rgba(255, 255, 255, 0.85);
    }
`

const FinePrint = styled.div`
    margin-top: 18px;
    font-size: 12.5px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.48);
`
