import stylses from "./LoggedInDropDown.module.css";
import { signOut } from "next-auth/react";
export default function LoggedInDropDown() {
  return (
    <button onClick={() => signOut()}>
      <h1>Logout</h1>
    </button>
  );
}
