import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  User, 
  Settings,
  ChevronRight,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      articles: [
        {
          title: "How to create an account",
          description: "Step-by-step guide to creating your HarvestLink account",
          popular: true
        },
        {
          title: "Understanding your dashboard",
          description: "Learn how to navigate and use your dashboard effectively",
          popular: false
        },
        {
          title: "Setting up your profile",
          description: "Complete your profile to get the most out of HarvestLink",
          popular: false
        }
      ]
    },
    {
      id: "shopping",
      title: "Shopping & Orders",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
      articles: [
        {
          title: "How to place an order",
          description: "Complete guide to browsing and ordering products",
          popular: true
        },
        {
          title: "Understanding product listings",
          description: "Learn about product information, pricing, and availability",
          popular: false
        },
        {
          title: "Managing your cart",
          description: "Add, remove, and modify items in your shopping cart",
          popular: false
        },
        {
          title: "Order tracking",
          description: "Track your orders from farm to delivery",
          popular: true
        }
      ]
    },
    {
      id: "delivery",
      title: "Delivery & Shipping",
      icon: Truck,
      color: "bg-orange-100 text-orange-600",
      articles: [
        {
          title: "Delivery options and costs",
          description: "Learn about our delivery options and pricing",
          popular: true
        },
        {
          title: "Delivery timeframes",
          description: "When to expect your fresh produce",
          popular: false
        },
        {
          title: "Delivery notifications",
          description: "Stay updated on your delivery status",
          popular: false
        },
        {
          title: "Contactless delivery",
          description: "How our safe delivery process works",
          popular: false
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      articles: [
        {
          title: "Accepted payment methods",
          description: "All the ways you can pay for your orders",
          popular: true
        },
        {
          title: "Understanding charges",
          description: "Breakdown of your order costs and fees",
          popular: false
        },
        {
          title: "Refunds and returns",
          description: "Our satisfaction guarantee and return policy",
          popular: true
        },
        {
          title: "Billing and receipts",
          description: "Access and manage your billing information",
          popular: false
        }
      ]
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: User,
      color: "bg-indigo-100 text-indigo-600",
      articles: [
        {
          title: "Updating your information",
          description: "Keep your account details current",
          popular: false
        },
        {
          title: "Privacy and security",
          description: "How we protect your personal information",
          popular: true
        },
        {
          title: "Account settings",
          description: "Customize your account preferences",
          popular: false
        },
        {
          title: "Deleting your account",
          description: "How to permanently delete your account",
          popular: false
        }
      ]
    },
    {
      id: "farmer",
      title: "For Farmers",
      icon: Settings,
      color: "bg-yellow-100 text-yellow-600",
      articles: [
        {
          title: "Becoming a farmer partner",
          description: "Join our network of local farmers",
          popular: true
        },
        {
          title: "Listing your products",
          description: "How to add and manage your product listings",
          popular: true
        },
        {
          title: "Managing orders",
          description: "Process and fulfill customer orders",
          popular: false
        },
        {
          title: "Payment and earnings",
          description: "How you get paid and track your earnings",
          popular: false
        }
      ]
    }
  ];

  const popularArticles = categories.flatMap(category => 
    category.articles.filter(article => article.popular)
  );

  const filteredCategories = selectedCategory === "all" 
    ? categories 
    : categories.filter(cat => cat.id === selectedCategory);

  const searchResults = searchQuery 
    ? categories.flatMap(category => 
        category.articles.filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Help <span className="text-green-600">Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions and learn how to make the most of HarvestLink
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results for "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((article, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                      Read more
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500">
                  Try different keywords or browse our categories below
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Articles */}
      {!searchQuery && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Help Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Read article
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {!searchQuery && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600">
                Find help articles organized by topic
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Category Content */}
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-sm p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.articles.map((article, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 mb-4">{article.description}</p>
                        <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                          Read more
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <MessageSquare className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                Live Chat
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 