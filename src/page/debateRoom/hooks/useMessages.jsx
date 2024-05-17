import {useEffect, useState} from "react";
import CustomAxios from "../../../lib/customAxios";

export function useMessages(id, refreshKey, isThread){
    const [messages, setMessages] = useState(null);
    const url = isThread ? `/message/thread/${id}` : `/message/${id}`;

    useEffect(() => {
        if(!id) return;
        const fetchData = async () => {
            const messageList = await CustomAxios.get(url).data.data;
            if (isThread){
                return messageList;
            }else{
                return messageList.reduce((acc, cur) => {
                    acc[cur.messageId] = cur;
                    return acc;
                });
            }
        }

        setMessages(fetchData());
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
