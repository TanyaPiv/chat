import { FC } from 'react';
import styled from './Chat.module.scss';
import { IMessages } from './Chat';
import { Box } from '@material-ui/core';

const Message:FC<IMessages> = ({text, type}) => {

  return (
    <div className={styled.message} style={{"marginLeft": type === 'get' ? "auto" : "0px"}}>
      <div>{text}</div>
    </div>
  );
};

export default Message;