import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  console.log(props)
  return (
    <input
      {...props}
      ref={ref}
      className="w-full bg-yellow-200 text-black px-4 py-2 rounded-md"
    />
  );
});
