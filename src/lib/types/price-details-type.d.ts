import { Price } from "@prisma/client";

export interface PriceDetailsType
  extends Omit<
    Price,
    "per_hour" | "per_six_hour" | "per_12_hour" | "per_night" | "per_month"
  > {
  per_hour: number;
  per_six_hour: number;
  per_12_hours: number;
  per_night: number;
  per_month: number;
}
