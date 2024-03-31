import React from 'react';
import styles from './BottomNavBar.module.css';

export const BottomNavBar = ({ roomNumber, onSendMessage, message, setMessage }) => {
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSendMessage();
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
                placeholder={`${roomNumber}번 토론방에 메시지 보내기`}
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <div className={styles.sendIcon} onClick={handleClick}>send</div>
        </div>
    );
};
