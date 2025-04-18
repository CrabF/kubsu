type Answer = {
  question_id: string;
  answer_ids: string[];
};

export interface UserInfo {
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