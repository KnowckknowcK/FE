import React from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const Modal = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/signin");
    }

    return (

            <div className={styles.modalContainer}>
                <div>
                    <span className={styles.textInfo}>로그인 후 이용해 주세요</span>
                </div>
                <div className={styles.btnsWrap}>
                    <button className={`${styles.btn}`} onClick={() => clickHandler()}>로그인하기</button>
                </div>
            </div>

    )
}


export default Modal;