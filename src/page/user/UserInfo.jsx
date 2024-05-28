import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../lib/customAxios";
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
import styles from "./UserInfo.module.css";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const loadUserInfo = async () => {
        return await customAxios
          .get(`/profile/info`)
          .then((response) => {
            setUserInfo(response.data.data);
          });
      }

    useEffect(() => {
        const fetchData = async () => {
            await loadUserInfo();
        };
        fetchData();
    },[]);

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("로그아웃 되었습니다.");
        window.location.href = "/signin";
    }

    return (
        <div style={{display:"flex", flexDirection:"column", marginBottom:"60px"}}>
            <div onClick = {logoutHandler} className={styles.logoutBtn}>
                로그아웃
            </div>
            <div className= {styles.bgroundDiv}>
                <p style={{marginTop:"50px"}}>Profile</p>
         <img src= {userInfo&&userInfo.profileImage} className={styles.profileImg}/>
            </div>
         <div className={styles.profileDiv}>
            <p style={{justifySelf:"center", fontWeight:"600", fontSize:"1.3rem"}}>{userInfo ? userInfo.name : "닉네임"}</p>
             <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", gap:"10px"}}>
                 <Button variant="outlined" style={{width:"100px"}} onClick={()=>{navigate('/profile-update', {state: {userInfo: userInfo}})}}>프로필 수정</Button>
                 <Button variant="outlined" color= "error" style={{width:"100px"}} onClick={logoutHandler}>로그아웃</Button>
             </div>
         </div>
         <p className={styles.history}>MY HISTORY</p>
         <div>
            <p className={styles.para} onClick={()=>{navigate('/summary-history/done')}}>작성한 요약문 목록 <Button variant="text" endIcon={<ArrowForwardIosIcon />}/></p>
            <p className={styles.para} onClick={()=>{navigate('/opinion-history')}}>작성한 견해 목록 <Button variant="text" endIcon={<ArrowForwardIosIcon />}/></p>
         </div>   
         <p className={styles.mywork}>MY WORK</p>
            <div>
                <p className={styles.para} onClick={()=>{navigate('/summary-history/ing')}}>진행 중인 요약문 보기 <Button variant="text" endIcon={<ArrowForwardIosIcon />}/></p>
                <p className={styles.para} onClick={()=>{navigate('/dashboard')}}>대시 보드 <Button variant="text" endIcon={<ArrowForwardIosIcon />}/></p>
                <p className={styles.para} onClick={()=>{navigate('/debate-room-list')}}>참여 중인 토론방 보기 <Button variant="text" endIcon={<ArrowForwardIosIcon />}/></p>
            </div>
        <BottomNavBar/>
        </div>
    )
}

export default UserInfo;