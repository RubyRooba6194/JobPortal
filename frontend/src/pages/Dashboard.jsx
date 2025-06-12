import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex gap-4">
        <Link to="/apply" className="btn-primary">
          Apply for Job
        </Link>
        <Link to="/applications" className="btn-primary">
          My Applications
        </Link>
      </div>
    </div>
  );
}
