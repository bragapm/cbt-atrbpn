import { FC } from "react";

interface IListQuestion {
  selectSoal: any;
  setSelectSoal: (value: any, idx: number) => void;
  listSoal: any[];
  listAnswer: any[];
  isloading: boolean;
}

const ListQuestionNumbers: FC<IListQuestion> = ({
  selectSoal,
  setSelectSoal,
  listSoal,
  listAnswer,
  isloading,
}) => {
  const legenda = [
    { color: "bg-[#7ADC98]", title: "Soal sudah diisi" },
    { color: "bg-primary", title: "Soal sedang diisi" },
    { color: "bg-gray-200", title: "Soal belum diisi" },
  ];

  return (
    <div className="w-full bg-white border rounded-lg p-3 flex-1 flex flex-col gap-4">
      <p className="text-primary font-medium">Navigasi Nomer Soal</p>
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 ">
          {listSoal?.slice(0, 100)?.map((value, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (!isloading) {
                  setSelectSoal(value, idx + 1);
                }
              }}
              className={`${
                selectSoal === value ? "bg-primary text-white" : ""
              } ${
                listAnswer?.some((answer) => answer.problem === value)
                  ? "bg-[#7ADC98]"
                  : "bg-gray-200"
              } ${
                isloading ? "cursor-wait" : "cursor-pointer"
              } w-8 h-8 rounded-lg  flex  hover:bg-primary/70`}
            >
              <p className="m-auto text-[11px]">{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-10">
        {legenda.map((el) => (
          <div
            key={el.title}
            className="flex items-center gap-2 text-primary font-medium text-xs"
          >
            <div className={` ${el.color} w-3.5 h-3.5 rounded-full`} />
            <p>{el.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListQuestionNumbers;
