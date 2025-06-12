import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="p-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Welcome to the Job Portal</h1>
      <p className="mb-4 ml-10">
        Please{" "}
        <Link to="/register" className="text-blue-600 underline">
          register
        </Link>{" "}
        or{" "}
        <Link to="/login" className="text-blue-600 underline">
          login
        </Link>{" "}
        to apply for jobs.
      </p>
    </div>
  );
}
