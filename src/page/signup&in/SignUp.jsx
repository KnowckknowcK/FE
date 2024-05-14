import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [profile_img, setProfile_img] = useState('');

    const pwMatch = password && passwordCheck && password === passwordCheck;
    const isFormFilled = email && password && passwordCheck && name && pwMatch;
    
    const signUpBtn = async (e) => {

        e.preventDefault();
                
        try {
            const response = await axios.post(REACT_APP_API_URL + '/api/account/sign-up', {
                email, 
                password,
                name,
                profile_img
            });
            if (response.status === 200) {
                alert('똑똑! 환영합니다. 로그인 페이지로 이동합니다.');
                navigate('/signin');

            } else {
                console.error('회원가입 실패');
            }
        } catch (error) {
            console.error('sign up error:', error);
        }
    };

    const navigate = useNavigate();
    const authBtn = () => {
        navigate(`/signup`);
    }

    const fileAttach = (e) => {
        setProfile_img(e.target.files[0]);
    };

    return (
        <div className={styles.page}>
            <div className={styles.titleWrap}>
                Sign up
            </div>
            <div className={styles.emailInput}>
                <div className={styles.inputWrap}>
                    <span style={{color: 'red'}}>*</span>
                    <input type="text" className={styles.input} placeholder="Email"value={email}onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <button className={styles.authBtn} onClick={authBtn}>
                    인증하기
                </button>
            </div>
            <div className={styles.passwordInput}>
                <div className={styles.inputWrap}>
                    <span style={{color: 'red'}}>*</span>
                    <input type="password" className={styles.input} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className={styles.inputWrap}>
                    <span style={{color: 'red'}}>*</span>
                    <input type="password" className={styles.input} placeholder="Password-check" value={passwordCheck} onChange={(e)=>setPasswordCheck(e.target.value)}/>
                    {((password || passwordCheck) && (pwMatch) ? (
                    <img src="/check_icon.png" alt="비밀번호 일치" className={styles.icon} />
                    ): (<img src="/warning_icon.png" alt="비밀번호 불일치" className={styles.icon} />
                    ))}
                </div>
            </div>
            <div className={styles.userInput}>
                <div className={styles.inputWrap}>
                    <span style={{color: 'red'}}>*</span>
                    <input type="text" className={styles.input} placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
            </div>
            <div className={styles.userInput}>
                <div className={styles.inputWrap}>
                    <input type="file" accept='image/*' onChange={fileAttach} onClick={()=>{console.log(profile_img)}}/>
                </div>
            </div>
            <button className={styles.signUpBtn} onClick={signUpBtn} disabled={!isFormFilled}>
                Sign up
            </button>

            {!isFormFilled && (
                <div className={styles.warningMessage}>
                    <span style={{color: 'red'}}>*</span>
                    는 필수 항목 입니다.<br />
                    모든 항목을 작성했는지 확인해주세요.
                </div>
            )}
            
        </div>
    )
}

export default SignUp;
