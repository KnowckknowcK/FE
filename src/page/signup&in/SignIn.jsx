import React, {useState } from "react";
import customAxios from "../../lib/customAxios";
import styles from "./SignIn.module.css";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = async (e) => {

        e.preventDefault();

        try {
            const response = await customAxios.post('/account/sign-in', {
                email, 
                password,
            });

            if (response.status === 200) {
                console.log('로그인 성공:', response.data);
            } else {
                console.error('로그인 실패');
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.singIn}>
            
                <div className={styles.titleWrap}>
                    Sign in
                </div>

                <div className="contentWrap">
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
                    
                </div>

                <div>
                    <button className={styles.signInButton} onClick={signIn}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;