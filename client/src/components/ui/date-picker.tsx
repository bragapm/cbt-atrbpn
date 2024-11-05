"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

type IDatePicker = {
  title: string;
  value: Date;
  onChange: (value: Date) => void;
};

export function DatePicker({ title, value, onChange }: IDatePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal h-[55px]",
            !value && "text-muted-foreground"
          )}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-gray-500">{title}</span>
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </div>
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
