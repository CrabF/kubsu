import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./MainPage.module.css";
import { getUserInfo } from "api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserResults } from "src/api/types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  phone_number: z.string().length(11, 'Введите + и 10 цифр'),
  surname: z
    .string()
    .min(1, { message: "Это обязательное поле" })
    .max(50, { message: "Максимальное количество символов: 50" }),
  name: z
    .string()
    .min(1, { message: "Это обязательное поле" })
    .max(50, { message: "Максимальное количество символов: 50" }),
  patronymic: z
    .string()
    .min(1, { message: "Это обязательное поле" })
    .max(50, { message: "Максимальное количество символов: 50" }),
  city: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

export const MainPage = () => {
  const [userInfo, setUserInfo] = useState<UserResults>();
  const [errorSubmit, setErrorSubmit] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onTouched",
    shouldFocusError: true,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (inputsData) => {
    console.log(inputsData);
    try {
      const resolve = await getUserInfo(inputsData);
      setUserInfo(resolve);
      navigate("/tests");
    } catch (error) {
      setErrorSubmit(
        "Не удалось получить данные пользователя. Попробуйте ещё раз."
      );
      console.error("Ошибка получения данных:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", `${userInfo?.uid}`);
    }
  }, [userInfo]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
        <label className={styles.label}>
          Номер телефона *
          <input
            {...register("phone_number")}
            className={styles.input}
            placeholder="+79"
            type="number"
          />
          {errors.phone_number && (
            <span className={styles.error}>{errors.phone_number.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Ваша фамилия *
          <input
            {...register("surname", { required: true })}
            className={styles.input}
            placeholder="Фамилия"
            type="tel"
          />
          {errors.surname && (
            <span className={styles.error}>{errors.surname.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Ваше имя *
          <input
            {...register("name", { required: true })}
            className={styles.input}
            placeholder="Имя"
            type="text"
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Ваше отчество *
          <input
            {...register("patronymic", { required: true })}
            className={styles.input}
            placeholder="Отчество"
            type="text"
          />
          {errors.patronymic && (
            <span className={styles.error}>{errors.patronymic.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Город проживания
          <input
            {...register("city", { required: false })}
            className={styles.input}
            placeholder="Город"
            type="text"
          />
          {errors.city && (
            <span className={styles.error}>{errors.city.message}</span>
          )}
        </label>

        <button className={styles.btn} type="submit">
          Начать прохождение теста
        </button>
        {errorSubmit && <span className={styles.error}>{errorSubmit}</span>}
      </form>
    </div>
  );
};
