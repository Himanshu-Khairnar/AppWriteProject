import React from "react";

export default function UpdateAuthDetail() {
  return (
    <div>
      <div>
        <label htmlFor="name">Update Name:</label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
        />
        <button>Update</button>
      </div>
      <div>
        <label htmlFor="email">Update Email:</label>
        <input
          type="email"
          id="email"
          placeholder="abc@gmail.com"
          className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
        />
        <button>Update</button>
      </div>
      <div>
        <label htmlFor="password">Update Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Old password"
          className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
        />
        <input
          type="password"
          id="passwords"
          placeholder="New password"
          className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
        />
        <button>Update</button>
      </div>
    </div>
  );
}
