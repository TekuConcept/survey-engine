import { IconProps } from './shared'

export function IconTrash({ color, ...props }: IconProps) {
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
                id='path398'
                style={{
                    fill: color || '#ffffff',
                    fillOpacity: 1,
                    stroke: 'none',
                    strokeWidth: 0.533991,
                    strokeLinecap: 'square',
                    strokeDasharray: 'none',
                    strokeOpacity: 1
                }}
                d='m -514.07998,19.031149 v 0.275862 h -1.61814 v 0.551201 h 0.34886 v 3.892822 a 0.64664642,0.64610966 0 0 0 0.64664,0.64611 h 2.88585 a 0.64610966,0.64664642 0 0 0 0.0303,5.21e-4 0.64610966,0.64664642 0 0 0 0.64611,-0.646631 v -3.892822 h 0.34886 v -0.551201 h -1.61814 v -0.275862 z m -0.62264,0.827063 h 2.91557 v 3.892822 h -0.64558 -1.62336 -0.64663 v -0.646109 z m 0.62264,0.646109 v 2.600604 h 0.5512 v -2.600604 z m 1.11909,0 v 2.600604 h 0.5512 v -2.600604 z'
            />
        </g>
    </svg>
}
