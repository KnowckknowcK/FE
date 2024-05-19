import React from 'react';
import styles from './MemberItem.module.css';

export const MemberItem = ({ member: member}) => {
    return (
        <div className={`${styles.messageContainer}`} key={member.id}>
            <img src={member.profileImage} alt="" className={styles.profileImage}/>
            <p className={styles.name}>{member.name}</p>
            <div className={`${styles.position}`} style={{backgroundColor: member.position === 'AGREE'? '#65B891' : '#569CA2'}}>
                {member.position === 'AGREE' ? '찬성' : member.position === 'DISAGREE' ? '반대' : ''}
            </div>
        </div>
    );
};