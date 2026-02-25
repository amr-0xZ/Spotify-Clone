import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboardIcon, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignInOAuthBottuns from "./SignInOAuthBottuns";

const Topbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="flex items-center justify-between sticky p-4 top-0 bg-zinc-900/75 
        backdrop-blur-md z-10 rounded-lg gap-4
    "
    >
      {/* Left: Logo */}
      <div className="flex gap-2 items-center flex-shrink-0">Spotify</div>

      {/* Middle: Search Bar */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 text-sm text-white placeholder-zinc-400 rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-white/20 transition"
          />
        </div>
      </div>

      {/* Right: Nav links + Auth */}
      <div className="flex gap-4 items-center flex-shrink-0">
        {isAdmin && (
          <Link
            to={"/admin"}
            className="flex items-center text-sm text-zinc-300 hover:text-white transition"
          >
            <LayoutDashboardIcon className="size-4 mr-2 inline" />
            Dashboard
          </Link>
        )}

        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
            <SignOutButton>
              <button className="text-sm text-zinc-300 hover:text-white transition px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>

        <SignedOut>
          <SignInOAuthBottuns />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
