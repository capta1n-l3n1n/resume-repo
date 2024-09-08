import { Icons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-20 w-20" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Just a forum account and agree to
          our{" "}
          <a
            className="hover:text-purple-700 hover:underline transition-all duration-300"
            href="https://policies.google.com/terms?hl=en-US"
            target="_blank"
          >
            User Agreement and Privacy Policy
          </a>
          .
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already a JAFer?{" "}
        <Link
          href="/sign-in"
          className="hover:text-brand hover:text-purple-700 duration-300 text-sm underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
