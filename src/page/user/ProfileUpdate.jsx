import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.css';
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
import axios from 'axios';
import {TextField,OutlinedInput,InputAdornment,IconButton, Input} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import Swal from "sweetalert2";
const { REACT_APP_API_URL } = process.env;

const ProfileUpdate = () => {
    const userInfo = useLocation().state.userInfo;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [profileImg, setProfileImg] = useState(userInfo.profileImage);
    const [password, setPassword] = useState("");
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
        const selectedFile = e.target.files[0];
        setProfileImg(selectedFile);
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          console.log(imageUrl);
          setProfileImg(imageUrl);
        };
    
        reader.readAsDataURL(selectedFile);
      };




    const onSubmit = async(e) => {
        e.preventDefault();
        
        try {
          const formData = new FormData();
          formData.append("profileImg", profileImg);

          const json = JSON.stringify({ name: name, password: password });
          //const blob = new Blob([json], {type: 'application/json'})
          formData.append("requestDto", json);
  
          await axios
            .patch(REACT_APP_API_URL + "/profile/info", formData, {
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
        <div className= {styles.bgroundDiv}>
            <p style={{marginTop:"50px"}}>Profile Update</p>
        </div>
     <img src= {profileImg} className={styles.profileImg}/>
     <div className={styles.profileDiv}>
      <p style={{fontWeight: "600"}}>이름 변경</p>
        <form onSubmit={onSubmit} method='PATCH' id='editForm' className={styles.updateForm}>

        <TextField
          id="outlined-basic"
          label="새로운 닉네임 입력"
          variant="outlined" 
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{marginBottom: "20px", width: "70%"}}
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
            style={{marginBottom: "20px", width: "70%"}}
          />

        <Input
            type='file'
            accept='image/*'
            onChange={handleFileChange}

            className= {styles.formBtn}
          />
          <span>
          <input type='submit' value='변경' className= {styles.submitBtn} />
        </span>
        </form>
     </div>

    <BottomNavBar/>
    </div>
    );
};

export default ProfileUpdate;