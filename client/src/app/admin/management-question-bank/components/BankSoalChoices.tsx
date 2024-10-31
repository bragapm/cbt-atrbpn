import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestionChoice } from "@/types/collection/question-choice.type";
import React from "react";

type IBankSoalChoices = {
  data: IQuestionChoice[];
};

const BankSoalChoices: React.FC<IBankSoalChoices> = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary text-sm">
          Pilih Jawaban Anda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {data.map((option) => (
            <div
              key={option.id}
              className="flex rounded-lg border px-4 py-2 gap-2"
            >
              <div className="w-12 h-fit flex-grow-0 flex-shrink-0">
                <div className="flex w-6 h-6 text-sm items-center justify-center rounded-full font-semibold bg-primary text-white">
                  {option.id.toUpperCase()}
                </div>
              </div>
              <p className="text-xs">{option.option_text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BankSoalChoices;
