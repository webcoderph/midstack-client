export type tUser = {
  id: number;
  name: string;
  email: string;
}

export type tAuthContextProps = {
  user: tUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type tLogin = {
    email: string;
    password: string;
};

export type tRegister = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};