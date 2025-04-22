export interface Inputs {
  phone_number: string;
  surname: string;
  name: string;
  patronymic: string;
  city: string;
}

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
  city: string;
  uuid: string;
  faculty_type: FacultyType[];
}

export interface FacultyType {
  name: string;
  compliance: number;
  faculties: Faculty[];
}

export interface Faculty {
  name: string;
  url: string;
}

export interface UserData {
  surname: string;
  name: string;
  patronymic: string;
  phone_number: string;
  city: string;
}

export interface Question {
  id: string;
  question: string;
  answers: Answers[];
}

interface Answers {
  uuid: string;
  question_id: string;
  text: string;
}