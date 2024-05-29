import React, {} from 'react';
import {useLocation} from 'react-router-dom';

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
import {usePreference} from "../../hooks/usePreference";

export function DebateRoom() {
    const roomId = useLocation().state.roomId;
    const navigate = useNavigate();

    const {
        debateRoomInfo,
        agreeRatio,
        disagreeRatio,
        isLoading,
        updateRatio
    } = useDebateRoom(roomId)

    const { refreshKey, refresh } = useRefresh();
    const { messages, updateMessage, updateLikesNum} = useMessages(roomId, refreshKey, isLoading);
    useSubscribe(roomId, updateMessage);

    const messagesEndRef = useEndRef(messages);
    const {isDrawerOpen, toggleDrawer} = useDrawer();
    const {
        isModalOpen,
        currentMessage,
        handleCloseMessageThread,
        handleOpenMessageThread
    } = useModal()

    const handlePutPreference = usePreference( messages, updateRatio, updateLikesNum )

    const handleNavLeftOnClick = () =>{
        navigate(-1)
    }

    if(isLoading) {
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <div className={styles.text}>토론방 정보를 불러오는 중입니다...</div>
            </div>
        );
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
                                     curTime={debateRoomInfo.now}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>

            <MessageThread key={messages.messageId}
                           roomId={roomId}
                           isOpen={isModalOpen}
                           close={handleCloseMessageThread}
                           message={currentMessage}
                           handlePutPreference={handlePutPreference}
                           curTime={debateRoomInfo.now}
            />


            {!isModalOpen && (
                <div className={styles.bottomMargin}>
                    <BottomNavBar roomId={roomId}
                    />
                </div>
            )}
        </div>
    );
}
