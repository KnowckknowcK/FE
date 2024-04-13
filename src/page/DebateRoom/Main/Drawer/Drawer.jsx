import React, {useEffect, useState} from 'react';
import styles from './Drawer.module.css';
import {PieChart} from "./PieChart";
import axios from "axios";
import {MemberItem} from "../../Common/MessageItem/MemberItem";
import { FiLogOut } from "react-icons/fi";
import {useNavigate} from "react-router-dom";

export const Drawer = ({ roomId, isOpen, toggleDrawer, agreeRatio, disagreeRatio }) => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const loadMemberList = async() =>{
            return await axios
                .get(`http://localhost:8080/api/debate-room/${roomId}`)
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
        toggleDrawer(); // Drawer 닫기 함수 실행
    };

    const handleLeaveRoom = () =>{
        const leaveRoom = async () => {
            await axios
                .delete(`http://localhost:8080/api/debate-room/${roomId}`)
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
                <div className={styles.memberListContainer}>
                    {memberList.map((member) => (
                        <div key={member.id}>
                            <MemberItem member={member}/>
                        </div>
                    ))}
                </div>
                <div className={styles.leaveBtn} onClick={handleLeaveRoom}>
                    <FiLogOut />
                    토론방 나가기
                </div>
            </div>
        </div>
    );
};

