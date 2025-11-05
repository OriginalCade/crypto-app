import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDispatch } from "react-redux";
import { setSelectedDate } from "@/lib/features/portfolioData/portfolioDataSlice";

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const dispatch = useDispatch();

  // helper to format date as DD-MM-YYYY
  const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date of purchase
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? formatDate(date) : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
              dispatch(setSelectedDate(formatDate(selectedDate)));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
