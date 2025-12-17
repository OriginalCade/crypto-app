"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  setSellingCoin,
  setBuyingCoin,
} from "@/lib/features/converterData/converterDataSlice";

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
  type = "",
}) {
  const { data: converterData } = useSelector((state) => state.converterData);

  const { sellingCoin, buyingCoin } = converterData;

  const [open, setOpen] = React.useState(false);
  const value = type === "selling" ? sellingCoin : buyingCoin;

  const dispatch = useDispatch();

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setOpen(false);
    onChange?.(newValue);

    if (type === "selling") {
      dispatch(setSellingCoin(newValue));
    } else if (type === "buying") {
      dispatch(setBuyingCoin(newValue));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between border border-neutral-700 bg-white dark:bg-[#191925] text-black dark:text-white"
          )}
        >
          {value || placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "w-[200px] p-0 border border-neutral-700 dark:bg-[#191925] bg-white dark:text-white text-black shadow-lg"
        )}
      >
        <Command className="dark:bg-[#191925] bg-white dark:text-white text-black">
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
                    "cursor-pointer dark:text-white text-black hover:bg-neutral-800"
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
