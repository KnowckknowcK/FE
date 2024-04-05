import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../../../context/StompContext';
import {MessageItem} from "../MessageItem/MessageItem";
import {TopNavBar} from "../TopNavBar/TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "../BottomNavBar/BottomNavBar";
import {useMessages} from "../utils/useMessages";
import {MessageThread} from "../MessageThread/MessageThread";
import { useNavigate } from 'react-router-dom';

export function DebateRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState('');

    const [currentMessage, setCurrentMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { messages,
            agreeNum,
            disagreeNum,
            agreeRatio,
            disagreeRatio,
            handlePutPreference } = useMessages(roomId, stompClient);


    function sendMessage() {
        if (stompClient) {
            stompClient.send(`/pub/message`, {},
                JSON.stringify({roomId: roomId, content: yourMessage}));
            setYourMessage('');
        }
    }

    const handleOpenMessageThread = (message) => {
        setCurrentMessage(message);
        setIsModalOpen(true);
    };

    const handleCloseMessageThread = () => {
        setIsModalOpen(false);
    };

    const handleNavLeftOnClick = () =>{
        navigate(-1)
    }

    return (
        <div>
            <TopNavBar handleOnClick={handleNavLeftOnClick}>
                <div>{`${roomId}번 토론방`}</div>
                <div className={styles.smallText}>{`찬성: ${agreeNum}명 반대: ${disagreeNum}`}</div>
            </TopNavBar>
            <div className={styles.topMargin}>
                {Object.values(messages).map((message) => (
                    <div key={message.messageId} onClick={() => handleOpenMessageThread(message)}>
                        <MessageItem key={message.messageId}
                                     message={message}
                                     handlePutPreference={handlePutPreference}
                                     isThread={false}
                        />
                    </div>
                ))}
            </div>
            <MessageThread
                roomId={roomId}
                isOpen={isModalOpen}
                close={handleCloseMessageThread}
                message={currentMessage}
                handlePutPreference={handlePutPreference}
            />

            {!isModalOpen && (
                <div className={styles.bottomMargin}>
                    <BottomNavBar roomNumber={roomId}
                                  onSendMessage={sendMessage}
                                  message={yourMessage}
                                  setMessage={setYourMessage}
                    />
                </div>
            )}
        </div>
    );
}
