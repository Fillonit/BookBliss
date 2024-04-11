import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export interface DropdownProps {
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void | Promise<void>;
  defaultValue?: string;
  style?: React.CSSProperties;
  buttonTitle?: string;
  optionsTitle?: string;
}
export function Dropdown({ style, dropdownOptions, onChange, defaultValue, buttonTitle, optionsTitle }: DropdownProps) {
  const [position, setPosition] = useState(defaultValue || dropdownOptions[0].value || "");
  const handleOnChange = (value: string) => {
    setPosition(value);
    onChange?.(value);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="inline-flex items-center justify-center gap-2 rounded-xl 
                           bg-amber-800 px-4 py-3 text-sm font-semibold shadow-sm hover:text-white
                           transition-all duration-150 hover:bg-amber-700 text-white focus:outline-none
                           focus:ring-2 focus:ring-amber-600 dark:bg-amber-700 dark:hover:bg-amber-600
                           dark:focus:ring-amber-500" style={style} variant="outline">{buttonTitle ?? "Open"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{optionsTitle ?? "Options"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleOnChange}>
          {dropdownOptions.map((option, index) => (
            <DropdownMenuRadioItem key={index} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
