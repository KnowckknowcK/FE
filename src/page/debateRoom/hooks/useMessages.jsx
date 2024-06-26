import {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";

export function useMessages(id, refreshKey, isLoading){
    const [messages, setMessages] = useState({});
    const url = `/message/${id}`;

    useEffect(() => {
        if(isLoading){
            return;
        }
        const fetchData = async () => {
            const response = await customAxios.get(url);
            const messageList = response.data.data

            const object = messageList.reduce((acc, cur) => {
                acc[cur.messageId] = cur;
                return acc;
            }, {});
            setMessages(object);
        }
        fetchData()
    }, [id, isLoading, refreshKey, url])

    function updateLikesNum(messageId, isIncrease){
        let newLikesNum = messages[messageId].likesNum;
        if(isIncrease){
            newLikesNum += 1;
        }else{
            newLikesNum -= 1;
        }
        setMessages((prevMessages) => ({
            ...prevMessages,
            [messageId]: { ...prevMessages[messageId], likesNum: newLikesNum }
        }));
    }

    const updateMessage = (newMessage) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [newMessage.messageId]: newMessage,
            })
        );
    }
    return { messages, updateMessage, updateLikesNum};
}
