import React from "react";
import { IconType } from "react-icons";
import Spinner from "./Spinner";

type IconProps = {
  IconName: IconType;
  size?: number;
  className?: string;
  loading?: boolean;
  ping?: boolean;
  reduceOpacityOnHover?: boolean;
  onClick?: () => void;
};

function Icon({
  IconName,
  size,
  className,
  loading,
  ping,
  reduceOpacityOnHover,
  onClick,
}: IconProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative p-3 rounded-full cursor-pointer hover:bg-customGreen transition-all ${
        reduceOpacityOnHover
          ? "bg-customGreen hover:bg-eggPlant text-white border-2 border-white hover:drop-shadow-lg"
          : "hover:bg-opacity-30"
      } ${loading && "cursor-wait"} ${className}`}
    >
      {loading ? <Spinner /> : <IconName size={size} />}

      {ping && (
        <>
          <span className="absolute -top-1 left-7 inline-flex w-3 h-3 border-2 border-gray-800 rounded-full bg-eggPlant"></span>
          <span className="animate-ping absolute -top-1 left-7 inline-flex w-3 h-3 border-gray-800 rounded-full bg-eggPlant"></span>
        </>
      )}
    </button>
  );
}

export default Icon;
