import React from 'react';
import styles from './MessageItem.module.css';

export const MemberItem = ({ member: member}) => {
    return (
        <div className={`${styles.messageContainer}`} key={member.id}>
            <div className={styles.header}>
                <img src={member.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{member.name}</p>
                        <p className={styles.time}>{member.position}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};