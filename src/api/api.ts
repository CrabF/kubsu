import { Question, UserData, UserInfo, UserResults } from "./types";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

// Получение вопросов
export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${BASE_URL}questions/`);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    throw new Error("Ошибка");
  }
};

// Получение результатов теста
export const getTestResults = async (userInfo: UserInfo): Promise<UserResults> => {
  try {
    const response = await fetch(`${BASE_URL}results/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data: UserResults = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    throw new Error("Ошибка");
  }
};

// Получение информации о пользователе
export const getUserInfo = async (uuid: string): Promise<UserResults> => {
  try {
    const response = await fetch(`${BASE_URL}applicant/${uuid}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error(`Ошибка при получении данных: ${err}`);
  }
};

// Регистрация пользователя
export const registerUser = async (userInfo: UserData): Promise<{ uuid: string }> => {
  try {
    const response = await fetch(`${BASE_URL}applicant/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error(`Ошибка при получении данных: ${err}`);
  }
};