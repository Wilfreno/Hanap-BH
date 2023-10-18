"use client";
import Image from "next/image";
import styles from "./Login.module.css";
import facebookImg from "../../../../public/icons8-facebook.svg";
import googleImg from "../../../../public/icons8-google.svg";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import hanapBHImg from "../../../../public/logo.png";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/store";

export default function Login() {
  const session = useSession();

  const redirect_route = useAppSelector(
    (state) => state.redirect_route_reducer.route
  );

  if (session.status === "authenticated") {
    redirect(redirect_route);
  }
  console.log("LSession", session);
  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Image src={hanapBHImg} alt="Hanap BH" className={styles.logo__img} />
        <h2>Hanap BH</h2>
      </div>
      <div className={styles.login__form}>
        <form>
          <div className={styles.user}>
            <label htmlFor="user">
              <AccountCircleSharpIcon className={styles.input__icon} />
            </label>
            <input type="text" id="user" />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">
              <LockSharpIcon className={styles.input__icon} />
            </label>
            <input type="password" id="password" />
            <VisibilitySharpIcon className={styles.password__visibility} />
          </div>
        </form>
        <button className={styles.login__button}>
          <h3>Login</h3>
        </button>
      </div>
      <hr />
      <div className={styles.o__auth}>
        <div className={styles.facebook}>
          <Image
            src={facebookImg}
            alt="facebook icon"
            className={styles.facebook__icon}
          />
          <h3>Continue with Facebook</h3>
        </div>
        <button className={styles.google} onClick={() => signIn("google")}>
          <Image
            src={googleImg}
            alt="google icon"
            className={styles.google__icon}
          />
          <h3>Continue with Google</h3>
        </button>
      </div>

      <h3 className={styles.sign__up}>
        Don't have Any Account?{" "}
        <Link href="/auth/sign-up" as="/auth/signup">
          Sign up
        </Link>
      </h3>
    </div>
  );
}