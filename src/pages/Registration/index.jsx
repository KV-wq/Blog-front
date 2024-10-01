import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";
import axios from "../../axios";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const [imageUrl, setimageUrl] = React.useState("");
  const dispatch = useDispatch();
  const inputFileRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (data.payload === undefined) {
      return alert("Пробуй ещё раз.");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setimageUrl(data.url);
    } catch (error) {
      console.log(error);

      alert("Не загрузилось🙄");
    }
  };

  const img = `https://realblog-xfuyyabb.b4a.run${imageUrl}`;

  return (
    <Paper classes={{ root: styles.root + " post" }}>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          className="avatar"
          sx={{ width: 100, height: 100 }}
          onClick={() => inputFileRef.current.click()}
          style={{ cursor: "pointer" }}
          src={`https://realblog-xfuyyabb.b4a.run${imageUrl}`}
        />
      </div>
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
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажи имя" })}
          fullWidth
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
          className={styles.field}
          label="E-mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажи почту" })}
          type="email"
          fullWidth
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
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажи пароль" })}
          fullWidth
          type="password"
        />
        {imageUrl ? (
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
            style={{ display: "none" }}
            autoFocus={true}
            focused={true}
            value={img}
            error={Boolean(errors.avatarUrl?.message)}
            helperText={errors.avatarUrl?.message}
            {...register("avatarUrl", { required: "Загрузи аватар" })}
            fullWidth
          />
        ) : (
          ""
        )}
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
