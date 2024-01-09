import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref, rows = 2) => (
  <textarea
    {...props}
    ref={ref}
    className="w-full bg-yellow-200 text-black px-4 py-2 rounded-md"
    rows={rows}
  />
));
