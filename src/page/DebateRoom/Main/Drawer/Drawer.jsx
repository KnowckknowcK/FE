import React from 'react';
import styles from './Drawer.module.css';
import {PieChart} from "./PieChart"; // Drawer 스타일 파일

export const Drawer = ({ isOpen, toggleDrawer, agreeRatio, disagreeRatio }) => {
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
                <div>
                    토론방 정보
                </div>
                <div>
                    <div>
                        <PieChart agreeRatio={agreeRatio} disagreeRatio={disagreeRatio}/>
                    </div>
                    <div>
                        찬성 동의 수:
                        반대 동의 수:
                    </div>
                </div>
                <div>
                    토론 참여자
                </div>
                <div>
                    토론 참여자 리스트
                </div>
            </div>
        </div>
    );
};

