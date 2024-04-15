import React from "react";

type SideBarProps = {
  children?: JSX.Element;
  isRight?: boolean;
  className?: string;
};

function SideBar({ children, isRight, className }: SideBarProps) {
  return (
    <div
      className={`bg-white shadow-md border-2 lg:flex-[0.3] ${
        isRight ? "rounded-r-3xl" : "rounded-l-3xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default SideBar;
