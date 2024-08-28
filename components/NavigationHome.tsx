"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  navLinks: NavLink[];
};

const NavigationHome = ({ navLinks }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? "active" : ""}
            onClick={handleLinkClick}
          >
            <div className="flex items-center justify-center">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {link.icon}
                  <span>{link.label}</span>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export { NavigationHome };