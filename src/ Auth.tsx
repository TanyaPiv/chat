import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import styled from './Auth.module.scss';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormAuth {
  idInstance: string;
  apiTokenInstance: string;
}

const Auth: FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormAuth>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
    },
  });

  const getStateInstance = (data:FormAuth) => {
    const {idInstance, apiTokenInstance} = data;
    try {
      // const res = await fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
      // const result = await res.json();

      localStorage.setItem("user", JSON.stringify({
        idInstance,
        apiTokenInstance
      }));

      navigate('/register')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styled.auth}>
      <form className={styled.wrap} onSubmit={handleSubmit(getStateInstance)}>
        <Typography variant="h4" align="center">
          Login
        </Typography> 
        <TextField {...register("idInstance")} fullWidth label="idInstance"/>
        <TextField {...register("apiTokenInstance")} fullWidth label="apiTokenInstance"/>
        <Button
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Auth;