import {useState} from "react";
import {useStomp} from "../../../context/StompContext";

export function usePublish(roomId, isThread, messageId) {
    const stompClient = useStomp();
    const [message, setMessage] = useState('');

    const url = isThread? `/pub/message/${messageId}` :`/pub/message`;
    function sendMessage() {
        if (stompClient) {
            stompClient.send(url, {},
                JSON.stringify({roomId: roomId, content: message}));
            setMessage('');
        }
    }

    return { message, setMessage, sendMessage }
}
