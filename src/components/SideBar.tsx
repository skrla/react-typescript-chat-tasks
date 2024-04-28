import React from "react";

type SideBarProps = {
  children?: JSX.Element;
  isRight?: boolean;
  className?: string;
};

function SideBar({ children, isRight, className }: SideBarProps) {
  return (
    <div
      className={`bg-customBlack transition duration-150 ease-in-out shadow-md lg:flex-[0.3] ${
        isRight ? "rounded-r-3xl" : "rounded-3xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default SideBar;
