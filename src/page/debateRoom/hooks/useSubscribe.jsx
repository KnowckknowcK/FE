import {useEffect, useState} from "react";
import {useStomp} from "../../../context/StompContext";

export function useSubscribe(roomId, setMessages, isThread, messageId) {
    const stompClient = useStomp();
    useEffect(() => {
        if (!stompClient) {
            return;
        }
        const url = isThread ? `/sub/room/${roomId}/${messageId}`:`/sub/room/${roomId}`;
        console.log(`subscribe the room: ${roomId}`);
        // 구독 로직
        const subscription = stompClient.subscribe(url, (chat) => {
            const message = JSON.parse(chat.body);
            if (isThread) {
                setMessages((prevThread) => {
                    return [...prevThread, message];
                });
            }else{
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [message.messageId]: message,
                }));
            }

        });

        // 구독 해제, 컴포넌트가 언마운트 되거나 roomId가 변경될 때 호출
        return () => {
            if (subscription) {
                console.log(`Unsubscribing from room: ${roomId}`);
                subscription.unsubscribe();
            }
        };
    }, [stompClient, roomId]);
}