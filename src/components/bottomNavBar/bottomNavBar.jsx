import React from "react";
import styles from "./bottomNavBar.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const BottomNavBar = ({user}) => {
    const activeStyle = {
        color: 'var(--color-dark-green)'
    };
    const inActiveStyle = {
        color: 'var(--color-gray)'
    }

    return (
        <nav className={styles.wrapper}>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/article-list">
                    <FontAwesomeIcon icon={faMessage} />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/debate-room">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to={`/user-info/${user}`}>
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
            </div>
        </nav>
    )
}


export default BottomNavBar;