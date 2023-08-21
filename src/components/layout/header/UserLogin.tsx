import styles from "./UserLogin.module.css";
import { Avatar } from "@mui/material";
import Link from "next/link";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
export default function UserLogin() {
  return (
    <div className={styles.user}>
      <Link href="/#" className={styles.avatar}>
        <Avatar sx={{ width: 32, height: 32 }} />
        <MenuSharpIcon/>
      </Link>
    </div>
  );
}