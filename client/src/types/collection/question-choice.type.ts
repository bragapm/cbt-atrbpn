export type IQuestionChoice = {
  id: string;
  user_created: string | null;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  order: number | null;
  option_image: string | null;
};

export type IQuestionChoiceRequest = {
  question_id: string | number;
  option_text: string | null | undefined;
  is_correct: boolean;
  order: number;
  option_image?: File | null | string;
};
