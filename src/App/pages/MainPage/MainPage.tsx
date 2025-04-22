import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./MainPage.module.css";
import { getUserInfo, sendTestResults, getQuestions } from "api/api";
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
  patronymic: z.string().max(50, { message: "Максимальное количество символов: 50" }),
  city: z.string().min(1, { message: "Это обязательное поле" }),
  noPatronymic: z.boolean().optional(),
}).refine((data) => {
  if (!data.noPatronymic && !data.patronymic) {
    return false;
  }
  return true;
}, {
  message: "Это обязательное поле",
  path: ["patronymic"]
});

type Schema = z.infer<typeof schema>;

export const MainPage = () => {
  const [userInfo, setUserInfo] = useState<UserResults>();
  const [errorSubmit, setErrorSubmit] = useState("");
  const [noPatronymic, setNoPatronymic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Schema>({
    mode: "onTouched",
    shouldFocusError: true,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (inputsData) => {
    setIsLoading(true);
    setErrorSubmit("");
    
    try {
      const userResult = await getUserInfo(inputsData);
      setUserInfo(userResult);
      
      if (userResult.faculty_type && userResult.faculty_type.length > 0) {
        navigate("/results");
        return;
      }
      
      if (userResult.uuid) {
        localStorage.setItem("uuid", userResult.uuid);
        
        try {
          await sendTestResults({
            uuid: userResult.uuid,
            answers: []
          });
          
          await getQuestions();
          navigate("/tests");
        } catch (error: unknown) {
          const apiError = error as { status?: number };
          
          if (apiError.status === 422) {
            await getQuestions();
            navigate("/tests");
          } else {
            setErrorSubmit(
              "Произошла ошибка при проверке результатов. Попробуйте ещё раз."
            );
            console.error("Ошибка:", error);
          }
        }
      } else {
        setErrorSubmit(
          "Не удалось получить идентификатор пользователя. Попробуйте ещё раз."
        );
      }
    } catch (error) {
      setErrorSubmit(
        "Не удалось обработать запрос. Попробуйте ещё раз."
      );
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("uuid") && userInfo?.uuid) {
      localStorage.setItem("uuid", userInfo.uuid);
    }
  }, [userInfo]);

  const handleNoPatronymicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setNoPatronymic(isChecked);
    setValue("noPatronymic", isChecked);
    if (isChecked) {
      setValue("patronymic", "");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${isLoading ? styles.formDisabled : ''}`} action="">
        <label className={styles.label}>
          Номер телефона *
          <input
            {...register("phone_number")}
            className={styles.input}
            placeholder="+79"
            type="number"
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </label>

        <div className={styles.patronymicContainer}>
          <label className={styles.label}>
            Ваше отчество *
            <input
              {...register("patronymic")}
              className={styles.input}
              placeholder="Отчество"
              type="text"
              disabled={noPatronymic || isLoading}
            />
            {errors.patronymic && (
              <span className={styles.error}>{errors.patronymic.message}</span>
            )}
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={noPatronymic}
              onChange={handleNoPatronymicChange}
              disabled={isLoading}
            />
            Нет отчества
          </label>
        </div>

        <label className={styles.label}>
          Город проживания
          <input
            {...register("city", { required: false })}
            className={styles.input}
            placeholder="Город"
            type="text"
            disabled={isLoading}
          />
          {errors.city && (
            <span className={styles.error}>{errors.city.message}</span>
          )}
        </label>

        <button className={styles.btn} type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className={styles.btnContent}>
              <span>Начать прохождение теста</span>
              <div className={styles.preloader}></div>
            </div>
          ) : (
            "Начать прохождение теста"
          )}
        </button>
        {errorSubmit && <span className={styles.error}>{errorSubmit}</span>}
      </form>
    </div>
  );
};
