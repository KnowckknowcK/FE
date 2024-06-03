import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.css';
import './ProfileUpdate.css';
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
import axios from 'axios';
import {TextField,OutlinedInput,InputAdornment,IconButton, Input} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import Swal from "sweetalert2";
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const { REACT_APP_API_URL } = process.env;

const ProfileUpdate = () => {
    const userInfo = useLocation().state.userInfo;
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [profileImg, setProfileImg] = useState(userInfo.profileImage);
    const [nowImg, setNowImg] = useState(userInfo.profileImage);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const storedJwtToken = localStorage.getItem("accessToken");


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleFileChange = (e) => {
      if (e.target.files.length === 0) {
        return;
      }
      
      const selectedFile = e.target.files[0];
      setProfileImg(selectedFile);

      const reader = new FileReader();
  
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        console.log(imageUrl);
        setNowImg(imageUrl);
      };
  
      reader.readAsDataURL(selectedFile);

    };



    const onSubmit = async(e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("profileImg", profileImg);

          const json = JSON.stringify({ name, password });

          formData.append("requestDto", json);
          
  
          await axios
            .patch(REACT_APP_API_URL + "/api/profile/info", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + storedJwtToken,
              },
            })
            .then((res) => {
              if(res.status === 200) {
              Swal.fire({
                title: "프로필 정보 변경 완료",
                text: "프로필 정보 변경이 완료됐어요 :)",
                icon: "success",
                width: "300px",
                confirmButtonColor: "#B5C9C0",
              }).then((res) => {
                if(res.isConfirmed) {
                  navigate("/")
                }
                })
            }
          });
        } catch (error) {
          Swal.fire({
            title: "프로필 정보 변경 실패",
            text: "프로필 정보를 변경하는 도중 오류가 났어요 :(",
            icon: "error",
            width: "350px",
            confirmButtonColor: "#B5C9C0",
          })
    };
}

    return (
        <div style={{overflowY:"hidden"}}>
            <ArrowBackIosIcon style={{zIndex:"1", position:"absolute", top:"7%", left:"7%", color:"white"}} onClick={()=>{navigate(-1)}}/>

            <div className={styles.bgroundDiv}>
                <p style={{marginTop: "50px"}}>Profile Update</p>
                <picture>
                    <source srcSet={userInfo && userInfo.profileImage} type="image/webp" className={styles.profileImg}/>
                    <img src={userInfo && userInfo.profileImage} alt="나의 프로필 이미지" className={styles.profileImg}/>
                </picture>
            </div>
            <div className={styles.profileDiv}>
                <p style={{
                    justifySelf: "center",
                    fontWeight: "600",
                    fontSize: "1.3rem"
                }}>{userInfo ? userInfo.name : "로딩중..."}</p>
                <form onSubmit={onSubmit} method='PATCH' id='editForm' encType='multipart/form-data'
                      className={styles.updateForm}>
        <TextField
          id="outlined-basic"
          label="새로운 닉네임 입력"
          variant="outlined" 
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{marginBottom: "20px", width: "80%"}}
          />

        <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="새로운 비밀번호 입력"
            onChange={handlePasswordChange}
            value={password}
            style={{marginBottom: "20px", width: "80%"}}
          />

        <div className={styles.btnBox}>
          <label htmlFor='profileImg' className={styles.fileLabel}><PhotoCameraBackIcon/> 프로필 사진 선택
            <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                id='profileImg'
              />
            </label>
            <input type='submit' value='변경 저장' className= {styles.submitBtn} />
        </div>
        </form>
     </div>

    <BottomNavBar/>
    </div>
    );
};

export default ProfileUpdate;