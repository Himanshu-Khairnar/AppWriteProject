import React from "react";

export default function HeadingImage({url}) {
  return (
    <div>
      <img src={url} alt="" className="w-full  object-fill mt-24 mb-10" />
    </div>
  );
}
