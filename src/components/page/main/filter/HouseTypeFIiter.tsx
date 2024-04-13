import LodgingTypes from "@/components/LodgingTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HouseTypeFlter() {
  const lodging_type = LodgingTypes();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-secondary rounded-full py-1 px-2 outline-none">
        Lodging Type
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {lodging_type.map((h) => (
            <DropdownMenuItem key={h.name}>{h.name}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
