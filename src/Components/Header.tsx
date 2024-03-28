import React from "react";
import Button from "./Button";
const logo = require("../assets/logo.png");

type HeaderProps = {};

function Header({}: HeaderProps) {
  return (
    <div className="flex items-center flex-wrap sm:flex-row gap-5 justify-between bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white drop-shadow-md">
      <img
        src={logo}
        alt="Logo icon"
        className="w-[70px] drop-shadow-md cursor-pointer"
      />
      <div className="flex">
        <Button text="Add New List Board" secondary />
      </div>
    </div>
  );
}

export default Header;
