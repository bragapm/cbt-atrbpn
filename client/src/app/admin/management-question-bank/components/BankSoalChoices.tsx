import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestionChoice } from "@/types/collection/question-choice.type";
import { getDirectusUrl } from "@/lib/utils";
import React from "react";

type IBankSoalChoices = {
  data: IQuestionChoice[];
};

const BankSoalChoices: React.FC<IBankSoalChoices> = ({ data }) => {
  const getOrderOption = (option: IQuestionChoice["order"]) => {
    switch (option) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      case 5:
        return "E";
    }
  };

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
                  {getOrderOption(option.order)}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs">{option.option_text}</p>
                {option.option_image && (
                  <img
                    src={getDirectusUrl(option.option_image)}
                    alt={option.option_text ?? "Gambar pilihan jawaban"}
                    className="max-w-full h-auto max-h-40 w-auto rounded-md border"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BankSoalChoices;
