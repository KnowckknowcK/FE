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
        color: 'var(--color-green)'
    };
    const inActiveStyle = {
        color: 'var(--color-grey)'
    }

    return (
        <nav className={styles.wrapper}>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/">
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/debate-room">
                    <FontAwesomeIcon icon={faMessage} size="lg" />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to="/article-list">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </NavLink>
            </div>
            <div>
                <NavLink style={({isActive}) => (isActive ? activeStyle : inActiveStyle)} to={`/mypage`}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </NavLink>
            </div>
        </nav>
    )
}


export default BottomNavBar;