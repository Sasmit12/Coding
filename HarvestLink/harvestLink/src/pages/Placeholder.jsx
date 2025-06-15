import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Placeholder({ title = "Coming Soon", description = "This page is under construction. Please check back later." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
      <Link to="/" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
} 