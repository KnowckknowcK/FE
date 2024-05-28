import {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";
import {useStomp} from "../../../context/StompContext";

export const useThreads = ( roomId, messageId, isOpen ) => {
    const [threads, setThreads] = useState([]);
    const url = `/message/thread/${messageId}`;
    const stompClient = useStomp()

    useEffect(() => {
        if(!messageId) return;
        const fetchData = async () => {
            const response = await customAxios.get(url);
            const threadList = response.data.data
            setThreads(threadList)
        }
        fetchData()

    }, [messageId])

    useEffect(() => {
        if(!messageId) return;

        if (!stompClient || stompClient.connected === false) {
            console.log('Stomp client is not connected. Attempting to reconnect...');
            stompClient.connect();
        }
        const url = `/sub/room/${roomId}/${messageId}`;
        const subscription = stompClient.subscribe(url, function (chat) {
            const thread = JSON.parse(chat.body);
            setThreads((prevThread) => {
                return [...prevThread, thread];
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [messageId, stompClient, isOpen]);

    return threads;
}