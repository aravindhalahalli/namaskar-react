import { createContext } from "react";
const UserContext = createContext({
  loggedInUser: "Deafult Guest",
});
export default UserContext;
