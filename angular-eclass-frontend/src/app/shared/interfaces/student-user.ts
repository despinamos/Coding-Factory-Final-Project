export interface StudentUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  address: {
    area: string;
    road: string
  };
  phone: { number: string; type: string }[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoggedInUser {
  username: string,
  email: string,
  roles: [string]
}

export interface StudentClass {
  username: string,
  class: string
}