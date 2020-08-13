import { useLocalStorage } from "./useLocalStorage";

const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (user) => setUser(user);

  const logout = () => localStorage.removeItem("user");

  return { ...user, login, logout };
};

export default useAuth;
