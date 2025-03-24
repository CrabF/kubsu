type Answer = {
  question_id: string;
  answer_ids: string[];
};

interface UserInfo {
  uuid: string;
  answers: Answer[];
}

export interface UserResults {
  surname: string;
  name: string;
  patronymic: string;
  phone_number: string;
  uid: string;
  faculty_type: [
    {
      name: string;
      compliance: 0;
      faculties: [
        {
          name: string;
          url: string;
        }
      ];
    }
  ];
}

export interface UserData {
  surname: string;
  name: string;
  patronymic: string;
  phone_number: string;
}

export interface Question {
  id: string;
  question: string;
  answers: Answers[];
}

interface Answers {
  uid: string;
  question_id: string;
  text: string;
}

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
