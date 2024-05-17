import React, {} from 'react';
import { useParams } from 'react-router-dom';

import {MessageItem} from "../../common/messageItem/MessageItem";
import {TopNavBar} from "../../common/topNavBar/TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "../../common/bottomNavBar/BottomNavBar";
import {MessageThread} from "../thread/MessageThread";
import { useNavigate } from 'react-router-dom';

import {Drawer} from "../drawer/Drawer";
import {useMessages} from "../../hooks/useMessages";
import {useRefresh} from "../../hooks/useRefresh";
import {useSubscribe} from "../../hooks/useSubscribe";
import {useEndRef} from "../../hooks/useEndRef";
import {useDrawer} from "../../hooks/useDrawer";
import {useModal} from "../../hooks/useModal";
import {useDebateRoom} from "../../hooks/useDebateRoom";

export function DebateRoom() {
    let { roomId } = useParams();
    const navigate = useNavigate();

    const {
        debateRoomInfo,
        agreeRatio,
        disagreeRatio,
        handlePutPreference
    } = useDebateRoom(roomId)

    const { refreshKey, refresh } = useRefresh();
    const { messages, setMessages} = useMessages(roomId, refreshKey)
    useSubscribe(roomId, (newMessage) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [newMessage.messageId]: newMessage,
        }));
    });

    const messagesEndRef = useEndRef(messages);
    const {isDrawerOpen, toggleDrawer} = useDrawer();
    const {
        isModalOpen,
        currentMessage,
        handleCloseMessageThread,
        handleOpenMessageThread
    } = useModal()


    const handleNavLeftOnClick = () =>{
        navigate(-1)
    }

    return (
        <div className={styles.background}>
            <TopNavBar
                handleOnClick={handleNavLeftOnClick}
                isMain={true}
                toggleDrawer={toggleDrawer}
                position={debateRoomInfo.position}
            >
                <div>{`${roomId}번 토론방`}</div>
                <div className={styles.smallText}>
                    {`찬성: ${debateRoomInfo.agreeNum}명 반대: ${debateRoomInfo.disagreeNum}명`}
                </div>
            </TopNavBar>

            <Drawer
                roomId={roomId}
                isOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                agreeRatio={agreeRatio}
                disagreeRatio={disagreeRatio}
                title={debateRoomInfo.title}
            />

            <div className={styles.messageList}>
                {Object.values(messages).map((message) => (
                    <div key={message.messageId} onClick={() => handleOpenMessageThread(message)}>
                        <MessageItem key={message.messageId}
                                     message={message}
                                     handlePutPreference={handlePutPreference}
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
                           forceRefresh={refresh}
            />
            <div ref={messagesEndRef}/>

            {!isModalOpen && (
                <div className={styles.bottomMargin}>
                    <BottomNavBar roomId={roomId}
                    />
                </div>
            )}
        </div>
    );
}
