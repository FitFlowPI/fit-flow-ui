export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  active_plan?: boolean;
  user_type?: string;
  gender?: string;
  weight?: number;
  height?: number;
}

export interface RegisterResponse {
  status: number; // HTTP status code
  message: string; // success or error message
  data: {
    token: string; // authentication token returned after registration
    email: string; // the email of the registered user
    name: string; // username or full name
    userType: string; // type of user (e.g., student, admin)
  };
  timestamp: string; // time when the response was generated
}
