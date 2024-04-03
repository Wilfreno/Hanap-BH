import { LodgingDetailsType } from "./lodging-detail-type";
import { UserDetailType } from "./user-detail-type";

export type APIStatusResponseType =
  | "OK"
  | "INTERNAL_SERVER_ERROR"
  | "NO_RESULT"
  | "OUT_OF_BOUND"
  | "REQUEST_TIMEOUT"
  | "CONFLICT"
  | undefined;

export type NextPageTokenType = string;

export type APIResponseType = {
  status: APIStatusResponseType;
  message: string;
  next_page_token?: NextPageTokenType;
  data: LodgingDetailsType[] | LodgingDetailsType | UserDetailType;
  otp?: string
};
