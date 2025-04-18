import { SubmitHandler, useForm } from "react-hook-form";
import { Logo } from "assets/logo";
import styles from "./MainPage.module.css";
import { getUserInfo } from "api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData, UserResults } from "src/api/types";

interface Inputs {
  phone_number: string;
  surname: string;
  name: string;
  patronymic: string;
  city: string;
}

export const MainPage = () => {
  const [userInfo, setUserInfo] = useState<UserResults>();
  const navigate = useNavigate();

  const handleClick = async (userData: UserData) => {
    try {
      const data = await getUserInfo(userData);
      setUserInfo(data);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleClick(data);
    navigate('/tests')
  };

  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", `${userInfo?.uid}`);
    }
  }, [userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <h1>
          Кубанский государственный
          <br /> аграрный университет
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
        <input
          {...register("phone_number", { required: true })}
          className={styles.input}
          placeholder="Номер телефона"
          type="text"
        />
        <input
          {...register("surname", { required: true })}
          className={styles.input}
          placeholder="Фамилия"
          type="tel"
        />
        <input
          {...register("name", { required: true })}
          className={styles.input}
          placeholder="Имя"
          type="text"
        />
        <input
          {...register("patronymic", { required: true })}
          className={styles.input}
          placeholder="Отчество"
          type="text"
        />
        <input
          {...register("city", { required: false })}
          className={styles.input}
          placeholder="Город"
          type="text"
        />
        <button className={styles.btn} type="submit">
          Начать прохождение теста
        </button>
      </form>
    </div>
  );
};
