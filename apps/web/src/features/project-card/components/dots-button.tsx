import React from 'react'
import styled from 'styled-components'
import { Vector } from '@shared/vectors'

type DotsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const DotsButton = React.forwardRef<HTMLButtonElement, DotsButtonProps>(
    function DotsButton(props, ref) {
        return <Container ref={ref} type='button' {...props}>
            <Vector.Dots
                color='currentColor'
                height='auto'
            />
        </Container>
    }
)

const Container = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    border-radius: 32px;
    padding: 8px;
    box-sizing: border-box;

    cursor: pointer;

    background-color: ${({ theme }) => theme.color.control.button.option.idle};

    &:hover {
        background-color: ${({ theme }) => theme.color.control.button.option.hover};
    }

    &:active {
        background-color: ${({ theme }) => theme.color.control.button.option.active};
    }
`
