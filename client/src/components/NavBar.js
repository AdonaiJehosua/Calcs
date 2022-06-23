import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import M from "materialize-css";
import {SideBar} from "./SideBar";


const setActive = ({isActive}) => isActive ? "blue darken-3" : ""

export const Navbar = () => {

    let navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    useEffect(() => {
        M.AutoInit()
    }, [])


    return (
        <div>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <span className="brand-logo">Calc</span>
                    <a href="#" data-target="mobile-demo1" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink className={setActive} to={'/calcs'}>Калькуляторы</NavLink></li>
                        <li><NavLink className={setActive} to={'/catalogs'}>Справочники</NavLink></li>
                        <li><NavLink className={setActive} to={'/test'}>Тест</NavLink></li>
                        <li><a href={'/'} onClick={logoutHandler}>Выйти</a></li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav collapsible" id="mobile-demo1">
                <li>
                    <div className={'row collapsible-header'}><NavLink className={`${setActive} col s6`} to={'/calcs'}>Калькуляторы
                    </NavLink><button className={'btn-small blue darken-1 material-icons col s2'}>
                        <i className="material-icons left">arrow_drop_down_circle</i></button>
                    </div>
                    <div className={'collapsible-body'}><div><SideBar hidden={false}/></div></div>
                    <div className={'divider'}></div>
                </li>
                <li>
                    <div className={'row collapsible-header'}><NavLink className={`${setActive} col s6`} to={'/catalogs'}>Справочники
                    </NavLink><button className={'btn-small blue darken-1 material-icons col s2'}>
                        <i className="material-icons left">arrow_drop_down_circle</i></button></div>
                    <div className={'collapsible-body'}><div><SideBar hidden={false}/></div></div>
                    <div className={'divider'}></div>
                </li>
                <li><NavLink className={setActive} to={'/test'}>Тест</NavLink></li>
                <div className={'divider'}></div>
                <li><a href={'/'} onClick={logoutHandler}>Выйти</a></li>
                <div className={'divider'}></div>
            </ul>
        </div>
    )
}