import React from 'react';
import styles from './BottomNavBar.module.css';
import { IoSendSharp } from "react-icons/io5";

export const BottomNavBar = ({ roomNumber, onSendMessage, message, setMessage, isThread }) => {
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSendMessage(); // 작성한 댓글 post 요청하는 함수
        }
    };
    const handleClick = () => {
        onSendMessage();
    };

    return (
        <div className={styles.navBar}>
            <input
                type="text"
                className={styles.inputField}
                placeholder={isThread ? '답글 추가하기':`${roomNumber}번 토론방에 메시지 보내기`}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <div className={styles.sendIcon} onClick={handleClick}>
                <IoSendSharp style={{color: "white", height:"24px", width:"24px"}}/>
            </div>
        </div>
    );
};
