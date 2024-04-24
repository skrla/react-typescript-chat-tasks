import React from "react";
import Spinner from "./Spinner";

type ButtonProps = {
  text?: string;
  className?: string;
  secondary?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

function Button({
  text = "Button",
  className,
  secondary,
  onClick,
  loading,
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center gap-3 py-2 px-9 rounded-full text-white border-2 border-white hover:bg-eggPlant transition-all hover:drop-shadow-lg ${
        secondary ? "bg-eggPlant" : "bg-customGreen"
      } ${className} ${loading && "cursor-wait"}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
}

export default Button;
