import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId()
  return <div className=""w-full>
    {
        label && <label htmlFor={id} className=""></label>
    }
    <select {...props} ref={ref} id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {
             options?.map(i => <option key={i} value={i}>{i}</option>)
        }
    </select>
  </div>;
}

export default React.forwardRef(Select)