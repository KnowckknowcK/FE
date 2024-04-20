import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../../../../context/StompContext';
import {MessageItem} from "../../Common/MessageItem/MessageItem";
import {TopNavBar} from "../../Common/TopNavBar/TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "../../Common/BottomNavBar/BottomNavBar";
import {useMessages} from "../../utils/useMessages";
import {MessageThread} from "../Thread/MessageThread";
import { useNavigate } from 'react-router-dom';

import {Drawer} from "../Drawer/Drawer";

export function DebateRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState('');

    const [currentMessage, setCurrentMessage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navigate = useNavigate();


    const { messages,
            agreeNum,
            disagreeNum,
            agreeRatio,
            disagreeRatio,
            handlePutPreference,
            forceRefresh
    } = useMessages(roomId);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // 메시지 불러오는 로직 여기에 추가
        scrollToBottom();
    }, [    messages]);

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

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        console.log(isDrawerOpen);
    };

    return (
        <div>
            <TopNavBar handleOnClick={handleNavLeftOnClick} isMain={true} toggleDrawer={toggleDrawer}>
                <div>{`${roomId}번 토론방`}</div>
                <div className={styles.smallText}>{`찬성: ${agreeNum}명 반대: ${disagreeNum}명`}</div>
            </TopNavBar>
            <Drawer roomId={roomId} isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}
            agreeRatio={agreeRatio} disagreeRatio={disagreeRatio}/>
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
            <MessageThread key={messages.messageId}
                           roomId={roomId}
                           isOpen={isModalOpen}
                           close={handleCloseMessageThread}
                           message={currentMessage}
                           handlePutPreference={handlePutPreference}
                           forceRefresh={forceRefresh}
            />
            <div ref={messagesEndRef}/>
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
