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




export { IUser, IAddress };
