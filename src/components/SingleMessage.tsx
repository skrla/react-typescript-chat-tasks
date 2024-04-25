import { forwardRef } from "react";

type SingleMessagePropsType = {
  content: string;
  myMessage?: boolean;
};

const SingleMessage = forwardRef(
  (
    { content, myMessage }: SingleMessagePropsType,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return myMessage ? (
      <div
        ref={ref}
        className="bg-customGreen text-white text-xs self-end max-w-md 
        shadow-md py-3 px-10 rounded-t-full rounded-bl-full border-2 border-white"
      >
        {content}
      </div>
    ) : (
      <div
        ref={ref}
        className="bg-eggPlant text-white text-xs self-start max-w-md 
        shadow-md py-3 px-10 rounded-t-full rounded-br-full border-2 border-white"
      >
        {content}
      </div>
    );
  }
);

export default SingleMessage;
