import { Link } from "react-router-dom"; // If using React Router

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryBg text-center ">
      <h1 className="text-5xl font-bold text-white flex items-center gap-2">
        404 <span className="text-4xl">😢</span>
      </h1>
      <h2 className="text-2xl font-semibold mt-4 text-white">
        Lost in the Digital Wilderness
      </h2>
      <p className="text-white mt-2 max-w-lg">
        You've ventured into uncharted digital territory. The page you seek has
        eluded us. Let's guide you back to familiar paths.
      </p>
      <Link
        to="/"
        className="py-3 px-6 bg-primaryText rounded-lg w-full md:w-auto font-medium transition-all hover:opacity-90 mt-4"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
