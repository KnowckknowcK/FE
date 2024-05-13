import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../lib/customAxios";
import styles from "./SignIn.module.css";


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navToMain = useNavigate();
    
    const signInBtn = async (e) => {
        e.preventDefault();
        try {
            const response = await customAxios.post('/account/sign-in', {
                email, 
                password,
            });
            if (response.status === 200) {
                console.log('로그인 성공:', response.data);
                navToMain('/', {});
            } else {
                console.error('로그인 실패');
            }
        } catch (error) {
            console.error('sign in error:', error);
        }
    };

    const continueWithGoogle = async () => {
        try {
        const response = await customAxios.get('/account/google', {});
        } catch (error) {
        console.error('continue with google', error);
        }
    };

    const navToSignUp = useNavigate();

    const signUpBtn = () => {
        navToSignUp(`/signup`);
    }

    return (
        <div className={styles.page}>
            <div className={styles.titleWrap}>
                Sign in
            </div>
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
            <button className={styles.signInButton} onClick={signInBtn}>
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