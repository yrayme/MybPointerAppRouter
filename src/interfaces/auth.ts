export interface LoginRequestForm {
  email: string;
  password: string;
}
export interface LoginInterface {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface NewPaswordForm {
  user: string;
  password: string;
  confirmPassword: string;
  checkbox?: boolean;
}
export interface TokenData {
  access_token: string;
  fresh: boolean;
  iat: number;
  jti: string;
  type: string;
  sub: string;
  nbf: number;
  exp: number;
  type_rol: string;
  name: string;
  email: string;
  description_rol: string;
  id: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface LogoutResponse {
  Success: string;
}
export interface QrCodeResponse {
  Success: string;
  code:    string;
}

export interface ResetPasswordRequest {
  token_email: string | undefined;
  password: string;
}