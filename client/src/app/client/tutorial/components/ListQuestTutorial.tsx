import React, { useEffect, useState } from "react";

const ListQuestTutorial = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const newNumbers = [];
    for (let i = 1; i <= 100; i++) {
      newNumbers.push(i);
    }
    setNumbers(newNumbers);
  }, []);

  const legenda = [
    { color: "bg-[#7ADC98]", title: "Soal sudah diisi" },
    { color: "bg-primary", title: "Soal sedang diisi" },
    { color: "bg-[#EF957C]", title: "Soal tidak diisi" },
  ];

  return (
    <div className="demo_listquest w-full bg-white border rounded-lg p-3 flex-1 flex flex-col gap-4">
      <p className="text-primary font-medium">Navigasi Nomer Soal</p>
      <div className="flex flex-wrap gap-2 flex-1">
        {numbers.map((number) => (
          <div
            key={number}
            className={`w-8 h-8 rounded-lg flex ${
              number === 1
                ? legenda[0].color
                : number === 2
                ? legenda[2].color
                : number === 3
                ? `${legenda[1].color} text-white`
                : "bg-gray-200"
            }`}
          >
            <p className="m-auto text-[11px]">{number}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 mt-10 demo_ket">
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

export default ListQuestTutorial;
