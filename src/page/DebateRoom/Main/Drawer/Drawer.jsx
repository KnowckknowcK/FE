import React from 'react';
import styles from './Drawer.module.css'; // Drawer 스타일 파일

export const Drawer = ({ isOpen, toggleDrawer }) => {
    if(!isOpen){
        return null;
    }

    const handleBackdropClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleDrawer(); // Drawer 닫기 함수 실행
    };

    return (
        <div>
            <div className={styles.backdrop} onClick={(e) => (handleBackdropClick(e))}></div>
            <div className={styles.drawer}>
                <ul>
                    <li>메뉴 1</li>
                    <li>메뉴 2</li>
                    <li>메뉴 3</li>
                </ul>
            </div>
        </div>
    );
};

