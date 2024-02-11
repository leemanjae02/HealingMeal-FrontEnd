import React, { useState } from "react";

export const useForm = (): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

// import React, { useState } from "react";

// export const useForm = (
//   initialValue?: string | number
// ): [string | number, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
//   const [value, setValue] = useState<string | number>(initialValue || "");
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//   };
//   return [value, onChange];
// };
