import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const housing_type = [
  "Boarding House",
  "Apartment",
  "Hotel",
  "Motel",
  "B & B",
];

export default function HouseTypeFlter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-secondary rounded-full py-1 px-2 outline-none">
        Housing Type
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {housing_type.map((h) => (
            <DropdownMenuItem key={h}>{h}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
