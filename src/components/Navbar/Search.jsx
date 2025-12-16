"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronDown } from "lucide-react";

export function Search({ data = [], placeholder = "Select coin..." }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between bg-[#CCCCFA66] dark:bg-[#191932]"
          )}
        >
          <div className="pl-7">{placeholder}</div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[200px] p-0 border dark:bg-[#191932] bg-white"
      >
        <Command className={"dark:bg-[#191932]"}>
          <CommandInput placeholder="Search for coins" className="h-9" />

          <CommandList className={"dark:bg-[#191932]"}>
            <CommandEmpty>No results found.</CommandEmpty>

            {data.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={() => setOpen(false)}
                className="p-0"
              >
                <Link
                  href={`/coin/${item}`}
                  className={cn(
                    "block w-full px-4 py-2 capitalize",
                    "text-[#353570] dark:text-white",
                    "hover:bg-[#7878FA] dark:hover:bg-neutral-800"
                  )}
                >
                  {item}
                </Link>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
