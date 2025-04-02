import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Trophy,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";

interface NavbarProps {
  isAdmin?: boolean;
  username?: string;
  avatarUrl?: string;
}

const Navbar = ({
  isAdmin = false,
  username = "User",
  avatarUrl = "",
}: NavbarProps) => {
  const { user, isAuthenticated } = useAuth();

  // Use user data from auth context if available
  const displayName = user?.user_metadata?.username || username;
  const userAvatarUrl = user?.user_metadata?.avatar_url || avatarUrl;

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="w-full h-[70px] bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-xl font-bold text-blue-600">QuizMaster</h1>
        </Link>

        <div className="ml-10 hidden md:flex space-x-6">
          <NavLink
            href="/"
            icon={<Home className="w-4 h-4 mr-2" />}
            label="Home"
          />
          <NavLink
            href="/leaderboard"
            icon={<Trophy className="w-4 h-4 mr-2" />}
            label="Leaderboard"
          />
          {isAuthenticated && (
            <NavLink
              href="/profile"
              icon={<User className="w-4 h-4 mr-2" />}
              label="Profile"
            />
          )}
          {isAdmin && (
            <NavLink
              href="/admin"
              icon={<Settings className="w-4 h-4 mr-2" />}
              label="Admin"
              isAdmin
            />
          )}
        </div>
      </div>

      <div className="flex items-center">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatarUrl} alt={displayName} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">
                  {displayName}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="cursor-pointer w-full flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => (window.location.href = "/")}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isAdmin?: boolean;
}

const NavLink = ({ href, icon, label, isAdmin = false }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors",
        isAdmin && "text-orange-600 hover:text-orange-700",
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Navbar;
