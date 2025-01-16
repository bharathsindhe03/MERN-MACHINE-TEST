export type Employee = {
  eid: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  image: string | null | undefined; // Allow null or undefined
};
