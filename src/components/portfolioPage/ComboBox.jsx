"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { useDispatch } from "react-redux";
import { setSelectedCoin } from "@/lib/features/portfolioData/portfolioDataSlice";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  data = [],
  placeholder = "Select option...",
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    onChange?.(newValue);
    dispatch(setSelectedCoin(newValue));
  };

  const dispatch = useDispatch();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between border border-neutral-700")}
        >
          {value || placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "w-[200px] p-0 border border-neutral-700 bg-black text-white shadow-lg"
        )}
      >
        <Command className="bg-black text-white">
          <CommandInput
            placeholder="Search..."
            className="text-white placeholder:text-neutral-500 border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty className="text-neutral-500">
              No results found.
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={handleSelect}
                  className={cn(
                    "cursor-pointer text-white hover:bg-neutral-800 hover:text-white"
                  )}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
