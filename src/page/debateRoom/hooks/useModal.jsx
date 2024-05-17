import {useState} from "react";

export function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");

    const handleOpenMessageThread = (message) => {
        setCurrentMessage(message);
        setIsModalOpen(true);
    };

    const handleCloseMessageThread = () => {
        setIsModalOpen(false);
    };
    return {isModalOpen, currentMessage, handleOpenMessageThread, handleCloseMessageThread}

}
