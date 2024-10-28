export type IQuestionChoiceRequest = {
  question_id: string;
  option_text: string | null | undefined;
  is_correct: boolean;
  order: number;
  option_image?: File | null;
};
