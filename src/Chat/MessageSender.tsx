import React, { FC } from 'react';
import styled from './Chat.module.scss';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

export type FormData = {
  text: ""
}

export type IMessageSender = {
  sendMessage: (data:any) => Promise<void>;
}

const MessageSender:FC<IMessageSender> = ({sendMessage}) => {
  

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      text: '',
    },
  });

  

  return (
    <form className={styled.messageSender} onSubmit={handleSubmit(sendMessage)}>
      <TextField {...register("text")} fullWidth label="Введите текст"/>
      <Button type='submit'>
        Отправить
      </Button>
    </form>
  );
}; 

export default MessageSender;