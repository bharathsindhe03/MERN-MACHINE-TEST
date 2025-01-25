export interface RegisterData {
    email: string;
    password: string;
    navigate: (path: string) => void;
  }