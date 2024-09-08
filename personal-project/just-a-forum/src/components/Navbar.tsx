import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import SearchBar from "./SearchBar";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit py-2 sm:py-0 bg-zinc-100 border-b border-zinc-300 z-[10] ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-10 w-10 sm:h-20 sm:w-20" />
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
            <span className="text-xs hidden md:block">Sign In</span>
            <span className="block md:hidden lg:block lg:ml-1">
              <LogIn size={16} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
