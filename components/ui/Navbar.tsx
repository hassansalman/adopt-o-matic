'use client';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { NavigationMenu } from './navigation-menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <NavigationMenu className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between items-center max-w-full">
      <Link href="/" legacyBehavior passHref>
        Adopt-O-Matic 5000
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-black">BT</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        {!!user ? (
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link onClick={() => logout()} href="#">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/login">Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </NavigationMenu>
  );
};
export default Navbar;
