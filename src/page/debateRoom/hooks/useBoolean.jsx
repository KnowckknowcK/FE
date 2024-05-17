import {useState} from "react";

export function useBoolean() {
    const { isTrue, setIsTrue } = useState(null)
    return {isTrue, setIsTrue};
}