import {useState} from "react";

export function useRefresh(){
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    }
    return {refreshKey, refresh}
}