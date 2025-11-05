import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import Image from "next/image";
import { main } from "@/assets/logos";

export default function Signin() {
  return (
    <>
      <Link className="mb-10 inline-block" href="/">
        <Image
          src={main}
          alt="Logo"
          width={176}
          height={32}
        />
      </Link>
      <div>
        <SigninWithPassword />
      </div>
      <div className="mt-4 text-center">
        <Link href="/auth/verify" className="inline-block text-sm text-primary hover:underline">
          Verify email
        </Link>
      </div>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
      <GoogleSigninButton text="Sign in" />
    </>
  );
}
