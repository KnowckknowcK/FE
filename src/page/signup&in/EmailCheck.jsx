import React, {useState } from "react";
import axios from "axios";
import styles from "./EmailCheck.module.css";

const { REACT_APP_API_URL } = process.env;

const EmailCheck = ({ email, onClose, onVerified }) => {
    const [code, setCode] = useState('');

    const verifyEmail = async () => {
        try {
            const response = await axios.post(`${REACT_APP_API_URL}/api/account/code-check`, { email, code });
            if (response.status === 200) {
                alert('이메일이 성공적으로 인증되었습니다.');
                onVerified(); // 이메일 인증 성공
                onClose(); // 모달 닫기
            } else {
                alert('인증 코드가 올바르지 않습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Email verification error:', error);
            alert('이메일 인증에 실패했습니다. 관리자에게 문의하세요.');
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div>
                    <span className={styles.highlight}>{email}</span> <span className={styles.textInfo}>으로<br/>인증 코드를 발송했습니다. <br/>
                    인증코드를 아래에 입력하세요.</span>
                </div>
                <div className={styles.inputWrap}>
                    <input type="text" className={styles.input} placeholder="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
                </div>
                <div className={styles.btnsWrap}>
                    <button className={styles.btn} onClick={onClose}>닫기</button>
                    <button className={styles.btn} onClick={verifyEmail}>인증하기</button>
                </div>
            </div>
        </div>
    );
};

export default EmailCheck;
