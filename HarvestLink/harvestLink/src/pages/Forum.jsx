import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  User,
  Clock,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { communityService } from "../services/communityService";
import { useAuth } from "../context/AuthContext";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general"
  });
  const { user } = useAuth();

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "general", name: "General Discussion" },
    { id: "farming-tips", name: "Farming Tips" },
    { id: "recipes", name: "Recipes & Cooking" },
    { id: "marketplace", name: "Marketplace" },
    { id: "events", name: "Events & Meetups" },
    { id: "questions", name: "Questions & Help" },
    { id: "success-stories", name: "Success Stories" }
  ];

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      title: "Best practices for organic tomato farming",
      content: "I've been growing organic tomatoes for 5 years and wanted to share some tips that have worked well for me...",
      author: {
        name: "Sarah Johnson",
        avatar: "👩‍🌾",
        role: "farmer"
      },
      category: "farming-tips",
      likes: 24,
      comments: 8,
      createdAt: "2024-01-15T10:30:00Z",
      tags: ["organic", "tomatoes", "tips"]
    },
    {
      id: 2,
      title: "Delicious recipe: Fresh garden salad with local produce",
      content: "Here's a simple but delicious recipe using fresh vegetables from our local farmers...",
      author: {
        name: "Mike Chen",
        avatar: "👨‍🍳",
        role: "consumer"
      },
      category: "recipes",
      likes: 18,
      comments: 12,
      createdAt: "2024-01-14T15:45:00Z",
      tags: ["recipe", "salad", "fresh"]
    },
    {
      id: 3,
      title: "Upcoming farmers market this weekend",
      content: "Don't forget about the local farmers market this Saturday! We'll have fresh produce, artisanal goods...",
      author: {
        name: "Emma Rodriguez",
        avatar: "👩‍💼",
        role: "organizer"
      },
      category: "events",
      likes: 32,
      comments: 15,
      createdAt: "2024-01-13T09:20:00Z",
      tags: ["market", "weekend", "local"]
    },
    {
      id: 4,
      title: "How to start a small vegetable garden?",
      content: "I'm new to gardening and would love some advice on starting a small vegetable garden in my backyard...",
      author: {
        name: "David Thompson",
        avatar: "👨‍🌱",
        role: "consumer"
      },
      category: "questions",
      likes: 12,
      comments: 25,
      createdAt: "2024-01-12T14:15:00Z",
      tags: ["beginner", "garden", "help"]
    },
    {
      id: 5,
      title: "Success story: From hobby to profitable farm",
      content: "Three years ago, I started with just a small garden. Today, I'm supplying produce to local restaurants...",
      author: {
        name: "Lisa Wang",
        avatar: "👩‍🌾",
        role: "farmer"
      },
      category: "success-stories",
      likes: 45,
      comments: 18,
      createdAt: "2024-01-11T11:30:00Z",
      tags: ["success", "business", "inspiration"]
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredPosts = mockPosts;
      if (selectedCategory !== "all") {
        filteredPosts = mockPosts.filter(post => post.category === selectedCategory);
      }
      
      setPosts(filteredPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load forum posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: {
          name: user?.displayName || "Anonymous",
          avatar: "👤",
          role: user?.role || "consumer"
        },
        category: newPost.category,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        tags: []
      };
      
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", category: "general" });
      setShowCreatePost(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading forum posts...</p>
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
              Community <span className="text-green-600">Forum</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with farmers, share recipes, ask questions, and be part of our growing community.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions, recipes, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                {/* Create Post Button */}
                {user && (
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-6"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </button>
                )}

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-green-100 text-green-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Posts</span>
                      <span className="font-medium">{posts.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-medium">45 posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="lg:col-span-3">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                          {post.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              post.author.role === 'farmer' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {post.author.role}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        <Link to={`/forum/post/${post.id}`} className="hover:text-green-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 line-clamp-3">
                        {post.content}
                      </p>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <Link
                          to={`/forum/post/${post.id}`}
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </Link>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <span className="text-sm text-gray-500 capitalize">
                        {post.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No posts found matching your criteria.</p>
                  {user && (
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Create First Post
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create New Post</h2>
              <button
                onClick={() => setShowCreatePost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your post title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.filter(cat => cat.id !== 'all').map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Share your thoughts, questions, or experiences..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
