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
