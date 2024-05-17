import {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";

export function useMessages(id, refreshKey){
    const [messages, setMessages] = useState({});
    const url = `/message/${id}`;

    useEffect(() => {
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
    }, [id, refreshKey])

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

    return { messages, setMessages, updateLikesNum};
}
