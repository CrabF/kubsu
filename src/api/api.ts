import { Question, UserData, UserInfo, UserResults } from "./types";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const getUserInfo = async (userInfo: UserData): Promise<UserResults> => {
  try {
    const response = await fetch(`${BASE_URL}applicant/by-data/`, {
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

export const sendTestResults = async (results: UserInfo): Promise<UserResults> => {
  try {
    const response = await fetch(`${BASE_URL}results/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });
    
    if (!response.ok) {
      throw new Error("Ошибка при отправке результатов");
    }
    
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error(`Ошибка при отправке результатов: ${err}`);
  }
};
