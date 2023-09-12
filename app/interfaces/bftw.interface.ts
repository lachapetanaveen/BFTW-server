import { Document } from 'mongoose';


interface IAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  lat?: string;
  lang?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  password_hash: string;
  is_deleted?: boolean;
  user_type?: string;
  // address?: IAddress;
  createdAt?: string;
  updatedAt?: string;
}
interface IEmailSignup {
  _id?: string;
  name: string;
  email: string;
  address: string;
}
interface IUpload {
  filename: string,
  url: string,
  interests?: String[],
  filetype: String
}


export { IUser, IAddress, IUpload, IEmailSignup };
