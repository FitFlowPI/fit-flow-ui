export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    email: string;
    name: string;
    userType: string;
  };
  timestamp: string;
}
