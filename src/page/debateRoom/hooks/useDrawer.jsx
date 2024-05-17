import {useEffect, useState} from "react";

export function useDrawer() {
    const {isDrawerOpen, setIsDrawerOpen} = useState(false);
    useEffect(() => {
        if (isDrawerOpen) {
            // Drawer가 열렸을 때 스크롤 비활성화
            document.body.style.overflow = 'hidden';
        } else {
            // Drawer가 닫혔을 때 스크롤 활성화
            document.body.style.overflow = 'auto';
        }

        // 컴포넌트가 언마운트될 때 스크롤을 활성화하기 위한 정리(clean-up) 함수
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDrawerOpen]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);

    };
    return {isDrawerOpen, toggleDrawer};
}