import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    console.log(data);

    if (data.payload == undefined) {
      return alert("Пробуй ещё раз.");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root + " post" }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          sx={{
            label: {
              transition: "all .3s ease !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ABB2BF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976D2",
            },
          }}
          className={styles.field + " field"}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажи почту" })}
          fullWidth
          type="email"
        />
        <TextField
          sx={{
            label: {
              transition: "all .3s ease !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ABB2BF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976D2",
            },
          }}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
          type="password"
          error={Boolean(errors.password?.message)}
          {...register("password", { required: "Укажи пароль" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
