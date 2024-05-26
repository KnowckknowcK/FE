import React from 'react';
import styles from './NoWork.module.css'
const NoWork = ({children}) => {
    return (
        <div className={styles.parent}>
            <div className={styles.child}>
                <img src='/bulb.png' alt ='이미지' style={{margin:"auto auto"}}/>
                <p className={styles.content}>{children}</p>
            </div>
        </div>
    );
};

export default NoWork;

//아직 작성한 글이 없어요!<br/>글을 작성하고 똑똑과 함께 문해력을<br/> 증진해봐요! :)