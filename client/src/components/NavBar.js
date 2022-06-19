import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {

    let navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">PolyCalc</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/calcs'}>Калькуляторы</NavLink></li>
                    <li><NavLink to={'/catalogs'}>Справочники</NavLink></li>
                    <li><NavLink to={'/test'}>Тест</NavLink></li>
                    <li><a href={'/'} onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}