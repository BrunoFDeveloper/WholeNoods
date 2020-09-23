import { forwardRef } from "react";

export type Props = {
  label: string;
} & React.ComponentProps<"input">;

export default forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="block">
        <div className="font-semibold mb-1">{label}</div>
        <input
          className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
