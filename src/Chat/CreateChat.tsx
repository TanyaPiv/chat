import { TextField } from '@mui/material';
import React, { FC, useContext, useEffect } from 'react';
import styled from '../Auth.module.scss';
import { Button, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MyPhoneContext } from '../App';


export type FormData = {
  phone: ""
}


const CreateChat: FC = () => {
  const { phone, handlePhoneChange } = useContext(MyPhoneContext);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      phone: '',
    },
  });
  const navigate = useNavigate();

  const getPhone = (data:any) => {
    handlePhoneChange(data.phone);
    navigate(`/chat/${data.phone}`);
  };

  return (
    <div className={styled.auth}>
      <form className={styled.wrap} onSubmit={handleSubmit(getPhone)}>
        <Typography variant="h4" align="center">
          Введите номер телефона
        </Typography>
          <TextField {...register("phone")} fullWidth label="phone"/>
        <Button
          type="submit"
        >
          Начать чат
        </Button>
      </form>
    </div>
  );
};

export default CreateChat;