import { SubmitHandler, useForm } from "react-hook-form";
import { Logo } from "../../assets/logo";
import styles from "./main-page.module.css";
import { getQuestions } from "../../api/api";

interface Inputs {
  phone: number;
  surname: string;
  name: string;
  patronymic: string;
  city: string;
}

export const MainPage = () => {
  getQuestions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo></Logo>
        <h1>
          Кубанский государственный
          <br /> аграрный университет
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
        <input
          {...register("phone", { required: true })}
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
          {...register("city", { required: true })}
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
