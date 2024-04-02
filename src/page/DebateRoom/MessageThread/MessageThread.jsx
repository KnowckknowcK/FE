// MessageThread.js 파일
import React from 'react';

export const MessageThread = ({ messageThread }) => {
    return (
        <div>
            <p>댓글 작성자: {messageThread.writer}</p>
            <p>댓글 내용: {messageThread.content}</p>
        </div>
    );
};


