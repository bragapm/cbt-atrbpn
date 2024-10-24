import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const PinPage: React.FC = () => {
  const [pin, setpin] = useState("");
  const navigate = useNavigate();

  return (
    <div className={`w-full h-full flex justify-end items-center`}>
      <Card className="w-[642px] p-4 h-full bg-secondary">
        <div className="w-full h-full flex gap-4 flex-col px-20 justify-center">
          <div className="w-full flex gap-2.5 flex-col">
            <div className="w-full flex justify-center">
              <div className="flex rounded-lg bg-white p-5 items-center ">
                <img
                  src="/images/ic-pin.svg"
                  alt="ic-chat"
                  className="w-[60px] h-[60px]"
                />
              </div>
            </div>
            <div className="text-center text-4xl font-semibold">
              Masukan <br></br>PIN Sesi Ujian{" "}
            </div>

            <p className="text-sm text-center">
              Computer Based Test Pejabat Pembuat Akta Tanah
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              name="PIN"
              type="text"
              placeholder="Masukan PIN"
              className="h-14"
              value={pin}
              onChange={(e) => setpin(e.target.value)}
            />
            <Button
              variant="default"
              className="h-14"
              disabled={pin === ""}
              onClick={() => navigate("/exam")}
            >
              Mulai Ujian{" "}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PinPage;
