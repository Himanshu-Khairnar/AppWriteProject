import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full gap-2 px-4 text-center">
      <p className="text-primaryText font-semibold">NewsLetter</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
        Stories and interviews
      </h1>
      <p className="text-gray-400 max-w-lg">
        Subscribe to learn about new product features, the latest in technology,
        solutions, and updates.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-lg mt-5">
        <input
          type="email"
          className="py-3 px-4 outline-none w-full sm:w-[450px] bg-white text-black rounded-lg border-2"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="py-3 px-4 bg-primaryText rounded-lg w-full sm:w-auto">
          Subscribe
        </button>
      </div>

      <p className="text-gray-400">
        We care about your data in our{" "}
        <span className="underline cursor-default">privacy policy</span>
      </p>
    </div>
  );
}
