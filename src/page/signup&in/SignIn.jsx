import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isValid = emailRegex.test(email) && password.trim() !== '';
        setIsFormValid(isValid);
    }, [email, password]);

    const signInBtn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REACT_APP_API_URL + '/api/account/sign-in', {
                email, 
                password,
            });
            if (response.status === 200) {
                console.log('로그인 성공:', response.data);
                localStorage.setItem('accessToken', response.data.data.jwt)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)
                window.location.replace("/");
            }
        } catch (error) {
            console.error('sign in error:', error.response.data);

            if(error.response.data.code === 400){
                alert('로그인 실패: 아이디와 비밀번호를 확인하세요.');
            }
            else if(error.response.data.code === 404){
                alert('로그인 실패: 사용자를 찾을 수 없습니다.');
            }
            else if(error.response.data.code === 409){
                alert('로그인 실패: 구글 로그인 사용자입니다.');
            }
        }
    };

    function continueWithGoogle() {
        window.location.href = REACT_APP_API_URL + '/api/account/google';
    }

    const navToSignUp = useNavigate();

    const signUpBtn = () => {
        navToSignUp(`/signup`);
    }

    return (
        <div className={styles.page}>
            <div className={styles.titleWrap}>Sign in</div>
            <div className={styles.inputWrap}>
                <input
                    type="text" 
                    className={styles.input} 
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="password" 
                    className={styles.input} 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button 
                className={`${styles.signInButton} ${isFormValid ? styles.signInBtnEnabled : styles.signInBtnDisabled}`}
                onClick={signInBtn}
                disabled={!isFormValid}
            >
                Sign in
            </button>
            <div className={styles.centerLine}></div>
            <div className={styles.signUp}>
                <img src="/img/web_neutral_rd_ctn@3x.png" alt="Continue with Google" className={styles.googleImg} onClick={continueWithGoogle} />
                <button className={styles.signUpButton} onClick={signUpBtn}>
                    <img src="/email.png" alt="Shape" className={styles.emailIcon} />
                    Sign up with Email
                </button>
            </div>
        </div>
    )
}

export default SignIn;