// import React, { createContext, useState, ReactNode } from "react";

// interface UserContextType {
//   userName: string | null;
//   setUserName: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const initialContext: UserContextType = {
//   userName: null,
//   setUserName: () => {},
// };

// const UserContext = createContext<UserContextType>(initialContext);

// const UserProvider: React.FunctionComponent<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [userName, setUserName] = useState<string | null>(null);

//   return (
//     <UserContext.Provider value={{ userName, setUserName }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserProvider, UserContext };
