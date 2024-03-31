// Message.js 파일
import React from 'react';
import {MessageThread} from './MessageThread'; // MessageThread 컴포넌트를 임포트합니다.

export const Message = ({ message, handleShowComments, messageThreads }) => {
    return (
        <div key={message.messageId}>
            <p>작성자: {message.writer}</p>
            <p>내용: {message.content}</p>
            <p>작성 시간: {message.createdTime}</p>
            <button onClick={() => handleShowComments(message.messageId)}>댓글</button>
            {messageThreads[message.messageId] && (
                <div>
                    {messageThreads[message.messageId].map((messageThread) => (
                        <MessageThread key={messageThread.threadId} messageThread={messageThread} />
                    ))}
                </div>
            )}
        </div>
    );
};