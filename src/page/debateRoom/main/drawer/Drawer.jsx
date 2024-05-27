import React, {useEffect, useState} from 'react';
import styles from './Drawer.module.css';
import {PieChart} from "./PieChart";
import {MemberItem} from "../../common/messageItem/MemberItem";
import { FiLogOut } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import CustomAxios from "../../../../lib/customAxios";

export const Drawer = ({ roomId, isOpen, toggleDrawer, agreeRatio, disagreeRatio, title }) => {
    const [memberList, setMemberList] = useState([]);
    const navigate = useNavigate();
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const loadMemberList = async() =>{
            const response = await CustomAxios.get(`/debate-room/${roomId}`);
            setMemberList(response.data.data)
        }
        loadMemberList();
    }, [roomId])

    const handleBackdropClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleDrawer(); // drawer 닫기 함수 실행
    };

    const handleLeaveRoom = () =>{
        const leaveRoom = async () => {
            await CustomAxios.delete(`${api}/api/debate-room/${roomId}`)
        }
        leaveRoom()
        navigate(-1)
    }

    if(!isOpen){
        return null;
    }
    return (
        <div>
            <div className={styles.backdrop} onClick={(e) => (handleBackdropClick(e))}></div>
            <div className={styles.drawer}>
                <div className={styles.drawerTop}>
                    토론방 서랍
                </div>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.drawerRatio}>
                    토론방 좋아요 수 찬/반 비율
                </div>
                <br/>
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
                <div className={styles.leaveBtn} onClick={handleLeaveRoom}>
                    <FiLogOut/>
                    <p style={{paddingLeft: '7px'}}>토론방 나가기</p>
                </div>

            </div>
        </div>
    );
};

