import { Room } from "@prisma/client";
import { PriceDetailsType } from "./price-details-type";

export interface RoomDetailsType extends Room {
  price: PriceDetailsType;
}
