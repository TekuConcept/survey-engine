import styled from 'styled-components'

export type LogoProps = {
    src?: string
    alt?: string
    className?: string
    style?: React.CSSProperties
}

export function Logo({
    src = '/img/selogo.svg',
    alt = 'Logo',
    className,
    style,
}: LogoProps) {
    return <LogoRoot className={className} style={style}>
        <LogoImage src={src} alt={alt} />
    </LogoRoot>
}

const LogoRoot = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 16px 12px;
    box-sizing: border-box;
`

const LogoImage = styled.img`
    width: 100%;
    max-width: 100%;
    height: auto;

    display: block;
    object-fit: contain;
`
