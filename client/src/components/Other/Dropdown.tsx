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
}
export function Dropdown({ style, dropdownOptions, onChange, defaultValue }:  DropdownProps) {
  const [position, setPosition] = useState(defaultValue || dropdownOptions[0].value || "");
  const handleOnChange = (value: string) => {
    setPosition(value);
    onChange?.(value);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button style={style} variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
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
