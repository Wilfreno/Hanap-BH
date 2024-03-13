import { PlaceDetailsType } from "./place-detail";
import { UserDetailType } from "./user-detail-type";

export type HTTPStatusResponseType =
  | "OK"
  | "INTERNAL_SERVER_ERROR"
  | "NO_RESULT"
  | "OUT_OF_BOUND"
  | "REQUEST_TIMEOUT"
  | undefined;

  
export type HTTPDataType = {
  data: PlaceDetailsType[] | UserDetailType;
};

export type NextPageTokenType = string;
export type HTTPResponseType = {
  status: HTTPStatusResponseType;
  message: string;
  next_page_token?: NextPageTokenType;
};
