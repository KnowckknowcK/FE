import { useState, useEffect } from 'react';
import { fetchUtil } from "../../../utils/fetchUtil";


export const useThread = (messageId, stompClient, isOpen) =>{
    const [thread, setThread] = useState([]);

    // 스레드 받아오기
    useEffect(() => {
        if(!messageId) return;
        const fetchMessages = async () => {
            const dataList = await fetchUtil(`/message/thread/${messageId}`, {
                method: 'GET'
            });
            setThread(dataList);
        };
        fetchMessages();
    }, [messageId]);

    // 해당 스레드 구독
    useEffect(() => {
        if(!messageId) return;
        if (!stompClient || stompClient.connected === false) {
            console.log('Stomp client is not connected. Attempting to reconnect...');
            stompClient.connect();
        }
        const url = `/sub/room/${messageId}`;

        const subscription = stompClient.subscribe(url, function (chat) {
            const message = JSON.parse(chat.body);
            setThread((prevThread) => {
                return [...prevThread, message];
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [messageId, stompClient, isOpen]);

    return thread;
}