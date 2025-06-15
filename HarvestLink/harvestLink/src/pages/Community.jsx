import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  MapPin, 
  Star,
  ArrowRight,
  Heart,
  Share2,
  Clock,
  User,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Mock data for demonstration
  const mockEvents = [
    {
      id: 1,
      title: "Local Farmers Market",
      description: "Weekly farmers market featuring fresh produce from local farms",
      date: "2024-01-20T09:00:00Z",
      location: "Downtown Square",
      attendees: 45,
      image: "https://via.placeholder.com/300x200?text=Farmers+Market",
      category: "market"
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      description: "Learn sustainable farming practices from expert farmers",
      date: "2024-01-25T14:00:00Z",
      location: "Community Center",
      attendees: 28,
      image: "https://via.placeholder.com/300x200?text=Workshop",
      category: "workshop"
    },
    {
      id: 3,
      title: "Cooking with Local Produce",
      description: "Chef demonstration using fresh, local ingredients",
      date: "2024-01-22T18:00:00Z",
      location: "Culinary Institute",
      attendees: 32,
      image: "https://via.placeholder.com/300x200?text=Cooking+Class",
      category: "cooking"
    }
  ];

  const mockResources = [
    {
      id: 1,
      title: "Beginner's Guide to Organic Farming",
      description: "Complete guide for new farmers starting their organic journey",
      type: "guide",
      author: "Dr. Sarah Johnson",
      rating: 4.8,
      downloads: 1250,
      image: "https://via.placeholder.com/200x150?text=Guide"
    },
    {
      id: 2,
      title: "Seasonal Planting Calendar",
      description: "Month-by-month guide for optimal planting times",
      type: "calendar",
      author: "Farm Extension Office",
      rating: 4.9,
      downloads: 890,
      image: "https://via.placeholder.com/200x150?text=Calendar"
    },
    {
      id: 3,
      title: "Sustainable Pest Management",
      description: "Natural methods to protect your crops without chemicals",
      type: "guide",
      author: "Mike Chen",
      rating: 4.7,
      downloads: 756,
      image: "https://via.placeholder.com/200x150?text=Pest+Control"
    }
  ];

  const mockRecentPosts = [
    {
      id: 1,
      title: "Best practices for organic tomato farming",
      author: "Sarah Johnson",
      likes: 24,
      comments: 8,
      category: "farming-tips"
    },
    {
      id: 2,
      title: "Delicious recipe: Fresh garden salad",
      author: "Mike Chen",
      likes: 18,
      comments: 12,
      category: "recipes"
    },
    {
      id: 3,
      title: "How to start a small vegetable garden?",
      author: "David Thompson",
      likes: 12,
      comments: 25,
      category: "questions"
    }
  ];

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API calls
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 1000)),
        new Promise(resolve => setTimeout(resolve, 1200)),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      
      setEvents(mockEvents);
      setResources(mockResources);
      setRecentPosts(mockRecentPosts);
    } catch (err) {
      console.error("Error fetching community data:", err);
      setError("Failed to load community data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      market: "bg-green-100 text-green-700",
      workshop: "bg-blue-100 text-blue-700",
      cooking: "bg-orange-100 text-orange-700",
      "farming-tips": "bg-green-100 text-green-700",
      recipes: "bg-orange-100 text-orange-700",
      questions: "bg-blue-100 text-blue-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchCommunityData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Our <span className="text-green-600">Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with fellow farmers, share knowledge, discover events, and access valuable resources 
              to grow together in sustainable agriculture.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-gray-600">Active Members</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-sm text-gray-600">Events This Month</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">Resources Available</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">567</p>
                <p className="text-sm text-gray-600">Forum Posts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-sm text-gray-500">{event.attendees} attending</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Learning Resources</h2>
            <Link 
              to="/resources" 
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Browse All Resources
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{resource.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Forum Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Forum Posts</h2>
            <Link 
              to="/forum" 
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Join the Discussion
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">by {post.author}</span>
                    </div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 