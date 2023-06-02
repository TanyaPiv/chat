import React, {FC} from 'react';
import styled from './Chat.module.scss';
import Message from './Message';
import { IMessages } from './Chat';

type IChatAtea = {
  messages: IMessages[];
}

const ChatArea:FC<IChatAtea> = ({messages}) => {

  return (
      <div className={styled.chatArea}>
        {messages?.map((item) => {
          return (
            <div key={item.text}>
              <Message text={item.text} type={item.type}/>
            </div>
          )
        })}
      </div>
  );
};

export default ChatArea;