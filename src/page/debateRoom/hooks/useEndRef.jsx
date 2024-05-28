import {useEffect, useRef} from "react";

export function useEndRef(messages, isLoading) {
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if(isLoading){
            return;
        }
        scrollToBottom();
    }, [isLoading, messages]);

    return messagesEndRef;
}