import { NavLink } from 'react-router-dom'
import { Paths } from '@routes/paths'

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    marginRight: 12,
    textDecoration: 'none',
    fontWeight: isActive ? 700 : 400,
})

export function Nav() {
    return <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <NavLink to={Paths.home} style={linkStyle}>Home</NavLink>
        {/* <NavLink to={Paths.playground} style={linkStyle}>Playground</NavLink> */}
        {/* <NavLink to={Paths.account} style={linkStyle}>My Account</NavLink> */}
    </nav>
}
