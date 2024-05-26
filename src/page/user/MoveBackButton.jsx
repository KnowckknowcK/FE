import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";

const MoveBackButton = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(-1);
    }
    return (
        <div>
            <ArrowBackIosIcon onClick={onClick} style={{marginLeft:"15px",marginTop:"10px"}}/>
        </div>
    );
};

export default MoveBackButton;