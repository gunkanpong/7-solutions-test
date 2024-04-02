export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: {
      color: string;
  };
  address: {
      postalCode: string;
  };
  company: {
      department: string;
  };
}

export interface TransformedData {
  [key: string]: {
      male: number;
      female: number;
      ageRange: string;
      hair: { [key: string]: number };
      addressUser: { [key: string]: string };
  };
}
