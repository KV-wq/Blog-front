import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Реально хочешь выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  const [light, setLight] = useState(true);
  const toggleTheme = () => {
    setLight(!light);

    const body = document.querySelector("body");
    const head = document.querySelector(".head");
    const main = document.querySelector(".main_page");
    const post = document.querySelector(".post");

    body.classList.toggle("dark");
    head.classList.toggle("dark");
    post.classList.toggle("dark");
    main.classList.toggle("dark");
  };

  return (
    <div className="head">
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <div className="main_page">Main page</div>
          </Link>
          <div className={styles.buttons}>
            <Button onClick={toggleTheme} variant="contained">
              {light ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon style={{ color: "#373737" }} />
              )}
            </Button>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button className={styles.write} variant="contained">
                    Написать статью
                  </Button>
                </Link>
                <Button
                  className={styles.exit}
                  onClick={onClickLogout}
                  variant="outlined"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" color="success">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="success">
                    Создать аккаунт
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
