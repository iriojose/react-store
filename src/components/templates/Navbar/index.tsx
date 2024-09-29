import { FC } from "react"
import { NavLink } from "react-router-dom"
import { useContextProvider } from "../../../store"
import shoppingBag from "../../../assets/shoppingbag.svg"
import { List } from "../../atoms/List"
import { leftLinks, rightLinks, Link, rightLinksOffWebSite } from "./links";

const Navbar: FC = () => {
    const {state: {cartProduct, user}, actions: {openCheckoutSideMenuOpen, setCategoryFilter, setUser}} = useContextProvider()

    const isActiveLink = ({isActive}:{isActive: boolean}): string => {
        if(isActive) return "underline underline-offset-4"
        return ""
    }

    const signOut = (path: string) => {
        if(path == "/login") setUser(null)
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm top-0">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to="/" onClick={() => setCategoryFilter("")}>
                        Shopi
                    </NavLink>
                </li>

                <List values={leftLinks}>
                    {(link: Link, i) => {
                        return (
                            <li key={i}>{/* "Computer Category" */}
                                <NavLink onClick={() => setCategoryFilter(link.filter)} to={link.path} className={isActiveLink}> 
                                    {link.title}
                                </NavLink>
                            </li>
                        )
                    }}
                </List>
            </ul>

            <ul className="flex items-center gap-3">
                {user && (
                    <li className="text-black/60">
                        {user.username}
                    </li>
                )}
                
                <List values={user ? rightLinks: rightLinksOffWebSite}>
                    {(link: Link, i) => {
                        return (
                            <li key={i}>
                                <NavLink to={link.path} className={isActiveLink} onClick={() => signOut(link.path)}> 
                                    {link.title}
                                </NavLink>
                            </li>
                        )
                    }}
                </List>

                <li className="flex cursor-pointer" onClick={openCheckoutSideMenuOpen}>    
                    <img className="h-6 w-6" src={shoppingBag} />
                    <div>{cartProduct.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export { Navbar }