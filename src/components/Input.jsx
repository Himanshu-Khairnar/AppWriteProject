import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const uid = useId(id);
  return (

    <div className="w-full">
     {label && <label htmlFor={uid} className="mb-1 inline-block mb-1 pl-1">
        {label}
      </label>}
      <input
        id={uid}
        type={type}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
