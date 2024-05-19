import React from 'react';
import styles from './BottomNavBar.module.css';
import { IoSendSharp } from "react-icons/io5";
import {usePublish} from "../../hooks/usePublish";
import TextareaAutosize from 'react-textarea-autosize';


export const BottomNavBar = ({ roomId, isThread, messageId }) => {
    const {
        message,
        setMessage,
        sendMessage
    } = usePublish(roomId, isThread, messageId)
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleClick = () => {
        sendMessage();
    };

    return (
        <div className={styles.navWrapper} >
            <div className={styles.navBar}>
                <TextareaAutosize
                    type="text"
                    className={styles.inputField}
                    placeholder={isThread ? '답글 추가하기':`${roomId}번 토론방에 메시지 보내기`}
                    value={message}
                    onChange={handleInputChange}
                />
                <div className={`${styles.sendIcon} ${!message.trim() && styles.disabled}`}
                     onClick={handleClick}>
                    <IoSendSharp style={{color: "#56A76E", height:"24px", width:"24px"}}/>
                </div>
            </div>
        </div>
    );
};
