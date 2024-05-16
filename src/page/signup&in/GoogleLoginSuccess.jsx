import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Spinner.module.css";

const { REACT_APP_API_URL } = process.env;

const GoogleLoginSuccess = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');


    const sendRequest = async () => {
        if(email && email.endsWith("@gmail.com")) {
            try {
                const response = await axios.post(REACT_APP_API_URL + '/api/account/return-token', {email});
                localStorage.setItem('accessToken', response.data.data.jwt)
                window.location.replace("/");
            } catch (error) {
                console.error("get token error:", error);
            }
        }
    };
    sendRequest();


    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>로딩중...</div>
        </div>
    );
}

export default GoogleLoginSuccess;