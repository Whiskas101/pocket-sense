
import { createContext, useContext, useState } from "react";

type user = {
  id: string;
  username: string;
  budget: string;
};

type UserContext = {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>>;
};

const UserContext = createContext<UserContext | null>(null);

interface someReactNode {
  children: React.ReactNode;
}

export default function UserContextProvider({ children }: someReactNode) {
  const defaultUser = {
    id: "-1",
    username: "None",
    budget: "None",
  };

  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext Must be used within a UserContext Provider"
    );
  }
  return context;
}
