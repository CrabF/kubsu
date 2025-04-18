import { Question, UserData, UserInfo, UserResults } from "./types";


export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(
      "http://45.159.250.22:20000/backend/api/questions/"
    );
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

export const checkResults = async (results: UserInfo): Promise<UserResults> => {
  return fetch("http://45.159.250.22:20000/backend/api/questions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      throw error;
    });
};

export const getUserInfo = async (userInfo: UserData): Promise<UserResults> => {
  try {
    const response = await fetch(
      "http://45.159.250.22:20000/backend/api/applicant/by-data/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error(`Ошибка при получении данных: ${err}`);
  }
};
