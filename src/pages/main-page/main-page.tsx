import { SubmitHandler, useForm } from "react-hook-form";
import { Logo } from "../../assets/logo";
import styles from "./main-page.module.css";
import { getUserInfo, UserData, UserResults } from "../../api/api";
import { useEffect, useState } from "react";
import { TestsPage } from "../tests-page/tests-page";

interface Inputs {
  phone_number: string;
  surname: string;
  name: string;
  patronymic: string;
  city: string;
}

export const MainPage = () => {
  const [userInfo, setUserInfo] = useState<UserResults>();
  const [submitted, setSubmitted] = useState(false);

  const handleClick = async (userData: UserData) => {
    try {
      const data = await getUserInfo(userData);
      setUserInfo(data);
      setSubmitted(true);
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
      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          action=""
        >
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
      ) : (
        <TestsPage />
      )}
    </div>
  );
};
