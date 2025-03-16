export const getQuestions = () => {
  return fetch("http://45.159.250.22:20000/backend/api/questions/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      throw error;
    });
};
