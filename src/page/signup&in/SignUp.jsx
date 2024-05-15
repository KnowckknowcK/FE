import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import EmailCheck from "./EmailCheck";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [profile_img, setProfile_img] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false); // 이메일이 인증되었는지 상태 추가


    const pwMatch = password && passwordCheck && password === passwordCheck;
    const isFormFilled = email && password && passwordCheck && name && pwMatch;

    const navigate = useNavigate();

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

            } else if (response.status === 409) {
                alert('이미 가입된 회원정보(이메일) 입니다.')
            } else {
                alert('회원가입에 실패했습니다. 관리자에게 문의하세요.')
                console.error('회원가입 실패');
            }
        } catch (error) {
            alert('회원가입에 실패했습니다. 관리자에게 문의하세요.')
            console.error('sign up error:', error);
        }
    };

    const authBtn = () => {
        setShowModal(true);
    }

    const handleEmailVerified = () => {
        setEmailVerified(true); // 이메일 인증 상태를 true로 설정
    };

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
                    <input type="text" className={styles.input} placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={showModal || emailVerified}/>
                </div>
                <button className={styles.authBtn} onClick={authBtn} disabled={!email || showModal || emailVerified}>
                    인증하기
                </button>
            </div>
            {showModal && (
                <div className={styles.modalBackdrop}>
                    <EmailCheck email={email} onClose={() => setShowModal(false)} onVerified={handleEmailVerified}/>
                </div>
            )}
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
