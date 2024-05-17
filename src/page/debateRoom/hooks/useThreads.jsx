import {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";

export const useThreads = (id) => {
    const [threads, setThreads] = useState([]);
    const url = `/message/thread/${id}`;

    useEffect(() => {
        if(!id) return;
        const fetchData = async () => {
            const response = await customAxios.get(url);
            const threadList = response.data.data
            setThreads(threadList)
        }
        fetchData()

    }, [id])

    return threads;
}