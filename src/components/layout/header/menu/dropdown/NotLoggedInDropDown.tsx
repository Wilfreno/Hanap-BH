import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function NotLoggedInDropDown() {
  const path_name = usePathname();
  const router = useRouter();
  return (
    <>
      <Link
        className="hover:cursor-pointer hover:bg-slate-100 px-5 py-3 text-sm font-bold transform transition duration-300 ease-out"
        href={`/login?url_callback=${path_name}`}
        as={`/login?url_callback=${path_name}`}
        prefetch
      >
        <p>Log in</p>
      </Link>
      <div
        className="hover:cursor-pointer hover:bg-slate-100 px-5 py-3  transform transition duration-300 ease-out"
        onClick={() => router.replace(`login?url_callback=${path_name}`)}
      >
        <p>Sign up</p>
      </div>
      <div className="hover:cursor-pointer hover:bg-slate-100 px-5 py-3  transform transition duration-300 ease-out ">
        <p>Add Your Bouarding House</p>
      </div>
      <hr style={{ margin: "10px 0" }} />
      <div className="hover:cursor-pointer hover:bg-slate-100 px-5 py-3  transform transition duration-300 ease-out ">
        <p>FAQ</p>
      </div>
      <div className="hover:cursor-pointer hover:bg-slate-100 px-5 py-3  transform transition duration-300 ease-out ">
        <p>Terms of Service</p>
      </div>
    </>
  );
}
