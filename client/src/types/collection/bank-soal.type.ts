import { IKategori } from "./kategori.type";
import { IMateri } from "./materi.type";
import { IQuestionChoiceRequest } from "./question-choice.type";

export type IBankSoal = {
  id: number;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  kategori_id: IKategori | null;
  random_options: boolean;
  is_required: boolean;
  difficulty: string | null;
  question_text: string;
  question: string | null;
  random_question: string | null;
  materi_id: IMateri | null;
};

export type IBankSoalRequest = {
  kategori_id: string | null;
  random_options: string;
  random_question: string;
  materi_id: string | null;
  question: string | null;
  image: string | File | null;
  choice: IQuestionChoiceRequest[] | null;
};
