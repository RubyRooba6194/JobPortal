import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("/api/job/mine").then((res) => setApps(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      {apps.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Resume</th>
              <th className="text-left p-2">Applied</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id} className="border-b">
                <td className="p-2">{app.name}</td>
                <td className="p-2">{app.email}</td>
                <td className="p-2">
                  {app.resume && (
                    <a
                      href={`/uploads/resumes/${app.resume}`}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  )}
                </td>
                <td className="p-2">
                  {new Date(app.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
