import { TextField } from '@mui/material';
import React, { FC, useContext } from 'react';
import styled from '../Auth.module.scss';
import { Button, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MyPhoneContext } from '../App';
import { phoneMask } from '../utils/phoneMask';


export type FormData = {
  phone: ""
}

const CreateChat: FC = () => {
  const { handlePhoneChange } = useContext(MyPhoneContext);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      phone: '',
    },
  });
  const navigate = useNavigate();

  const getPhone = (data:any) => {
    const newPhone = phoneMask(data.phone)
    handlePhoneChange(newPhone);
    navigate(`/chat/${newPhone}`);
  };

  return (
    <div className={styled.auth}>
      <form className={styled.wrap} onSubmit={handleSubmit(getPhone)}>
        <Typography variant="h4" align="center">
          Введите номер телефона
        </Typography>
        <TextField
          id="formatted-text-mask-input"
          {...register("phone")}
          fullWidth
        />
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