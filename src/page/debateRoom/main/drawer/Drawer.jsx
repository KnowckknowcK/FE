import React, {useEffect, useState} from 'react';
import styles from './Drawer.module.css';
import {PieChart} from "./PieChart";
import axios from "axios";
import {MemberItem} from "../../common/messageItem/MemberItem";
import { FiLogOut } from "react-icons/fi";
import {useNavigate} from "react-router-dom";

export const Drawer = ({ roomId, isOpen, toggleDrawer, agreeRatio, disagreeRatio }) => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();
    const api = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const loadMemberList = async() =>{
            return await axios
                .get(`${api}/api/debate-room/${roomId}`)
                .then((response) => {
                    setMemberList(response.data.data)
                })
        }
        loadMemberList();
    })

    if(!isOpen){
        return null;
    }

    const handleBackdropClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleDrawer(); // drawer 닫기 함수 실행
    };

    const handleLeaveRoom = () =>{
        const leaveRoom = async () => {
            await axios
                .delete(`${api}/api/debate-room/${roomId}`)
        }
        leaveRoom()
            .then(
                navigate(-1)
            )

    }

    return (
        <div>
            <div className={styles.backdrop} onClick={(e) => (handleBackdropClick(e))}></div>
            <div className={styles.drawer}>
                <div className={styles.drawerTop}>
                    토론방 서랍
                </div>
                <div className={styles.drawerRatio}>
                    토론방 찬/반 비율
                </div>
                <div>
                    <PieChart agreeRatio={agreeRatio} disagreeRatio={disagreeRatio}/>
                </div>
                <div className={styles.memberDebate}>
                    토론 참여자
                </div>
                <div className={styles.memberListContainer}>
                    {memberList.map((member) => (
                        <div key={member.id}>
                            <MemberItem member={member}/>
                        </div>
                    ))}
                </div>
                <div>
                    <div className={styles.leaveBtn} onClick={handleLeaveRoom}>
                        <FiLogOut/>
                        토론방 나가기
                    </div>
                </div>

            </div>
        </div>
    );
};

