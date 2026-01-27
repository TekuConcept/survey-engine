import { IconProps } from './shared'

export function IconEdit({ color, ...props }: IconProps) {
    return <svg
        width='20.278864'
        height='20.280924'
        viewBox='0 0 5.3654498 5.3659948'
        version='1.1'
        id='svg1'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <defs id='defs1' />
        <g id='layer1' transform='translate(515.92754,-19.031149)'>
            <path
                id='rect379'
                style={{
                    fill: color || '#ffffff',
                    fillOpacity: 1,
                    stroke: 'none',
                    strokeWidth: 0.265292,
                    strokeLinecap: 'square',
                    strokeDasharray: 'none',
                    strokeOpacity: 1
                }}
                d='m -512.46484,19.34659 -0.52056,0.517798 -0.25198,0.250631 -2.69016,2.675806 v 1.290877 h 1.2978 l 2.69015,-2.675806 0.25198,-0.251147 0.52058,-0.517281 v -0.704867 l -0.29458,-0.293005 -0.2951,-0.293006 z m -0.34081,1.198377 0.21665,0.216008 0.21665,0.21549 -2.473,2.459799 h -0.43329 v -0.430982 z m 0.50343,2.246375 -1.29624,1.29036 h 3.05072 v -1.29036 z'
            />
        </g>
    </svg>
}
