import Image from "next/image";
import styles from "./page.module.css";
import Signup from "./signup/page";
import Login from "./login/page";
import Link from "next/link";
export default function Home() {
  return (
 <>
 <h2>Hello Sign in or signout please</h2>
<Link href="/signup"> <button>Go to sign up page</button></Link>
<Link href="/login"> <button>Go to login page</button></Link>
 </>
  );
}
