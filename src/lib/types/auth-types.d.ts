export type SignUpFormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string
  birthday: {
    year?: number;
    month?: string;
    day?: number;
  };
  password: string;
  confirm_password: string;
  otp: string;
};
