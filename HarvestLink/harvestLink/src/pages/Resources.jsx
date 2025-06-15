import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { communityService } from "../services/communityService";

export default function Resources() {
  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: () => communityService.getResources(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farmer-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          Error loading resources. Please try again later.
        </div>
      </div>
    );
  }

  const categories = [
    {
      title: "Farming Guides",
      icon: "🌱",
      description: "Learn best practices for sustainable farming",
    },
    {
      title: "Market Insights",
      icon: "📊",
      description: "Stay updated with market trends and pricing",
    },
    {
      title: "Community Support",
      icon: "👥",
      description: "Connect with other farmers and share experiences",
    },
    {
      title: "Weather Updates",
      icon: "🌤️",
      description: "Get local weather forecasts and alerts",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resources</h1>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Latest Resources */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Latest Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {resource.imageUrl && (
              <img
                src={resource.imageUrl}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(resource.publishedAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/resources/${resource.id}`}
                  className="text-farmer-primary hover:text-farmer-primary-dark font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 bg-farmer-primary/5 rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Farming Resources
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest farming tips,
            market insights, and community updates.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmer-primary border-gray-300"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-farmer-primary text-white rounded-lg hover:bg-farmer-primary-dark focus:outline-none focus:ring-2 focus:ring-farmer-primary focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
