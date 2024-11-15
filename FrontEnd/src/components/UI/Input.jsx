import * as React from "react";

const Input = React.forwardRef(
  ({ className, type, value, onChange, ...props }, ref) => {
    return (
      <div className="">
        <input
          type={type}
          value={value || ""}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
