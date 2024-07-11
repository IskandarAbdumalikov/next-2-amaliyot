import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="text-white  bg-blue-400">
      <div className="container mx-auto max-w-[1440px] flex items-center justify-between py-[25px]">
        <Link href={"/"}>LOGO</Link>
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
      </div>
    </header>
  );
};

export default Header;
