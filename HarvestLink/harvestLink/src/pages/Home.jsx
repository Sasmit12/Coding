import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import { 
  Truck, 
  Users, 
  Star, 
  Leaf, 
  MapPin, 
  Clock, 
  Shield, 
  Heart,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      title: "Fresh Local Produce",
      description:
        "Connect directly with local farmers and get the freshest produce delivered to your door within 24 hours.",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Support Local Farmers",
      description:
        "Help local farmers thrive by buying directly from them at fair prices, ensuring sustainable farming practices.",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Community Market",
      description: "Join our vibrant community of farmers and food lovers, share recipes and farming tips.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Sustainable Farming",
      description:
        "Support sustainable farming practices and reduce food miles while getting the highest quality produce.",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const stats = [
    { label: "Active Farmers", value: "500+", icon: Users },
    { label: "Happy Customers", value: "10K+", icon: Heart },
    { label: "Products Available", value: "1000+", icon: Leaf },
    { label: "Cities Served", value: "25+", icon: MapPin },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Consumer",
      content: "The quality of vegetables I get from HarvestLink is incredible! Fresh, organic, and delivered right to my door.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Farmer",
      content: "HarvestLink has transformed my business. I can now reach more customers and get fair prices for my produce.",
      rating: 5,
      avatar: "👨‍🌾",
    },
    {
      name: "Emma Rodriguez",
      role: "Consumer",
      content: "I love supporting local farmers while getting the freshest produce. The community aspect is amazing!",
      rating: 5,
      avatar: "👩‍🍳",
    },
  ];

  const benefits = [
    "Fresh produce delivered within 24 hours",
    "Direct support to local farmers",
    "100% organic and sustainable",
    "Community-driven marketplace",
    "Fair pricing for both farmers and consumers",
    "Real-time order tracking",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Join 10,000+ happy customers
            </div>
            
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Fresh from the Farm</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Direct to Your Kitchen
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl md:mt-8 md:text-2xl">
              Connect with local farmers, get fresh produce, and support
              sustainable agriculture. Join the farm-to-kitchen revolution today!
            </p>
            
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <Link to="/market">
                  <Button size="lg" className="group">
                    Browse Market
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register?role=consumer">
                    <Button size="lg" className="group">
                      Join as Consumer
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/register?role=farmer">
                    <Button size="lg" variant="outline" className="group">
                      Join as Farmer
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Why Choose <span className="text-green-600">HarvestLink</span>?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              We're building a better way to connect farmers with consumers, creating a sustainable food ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Experience the Difference
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of satisfied customers who have discovered the joy of fresh, local produce delivered right to their doorstep.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Truck className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Fast Delivery</h3>
                  <p className="text-green-100">Get your fresh produce delivered within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Community Says
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Real stories from real people in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join our community today and experience the difference of fresh, local produce delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="bg-white text-green-600 hover:bg-gray-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
