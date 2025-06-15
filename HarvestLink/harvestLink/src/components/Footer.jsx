import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ArrowRight,
  Leaf,
  Truck,
  Shield,
  Heart
} from "lucide-react";
import Button from "./common/Button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Mission", href: "/mission" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    marketplace: [
      { name: "Browse Products", href: "/market" },
      { name: "Farmers", href: "/farmers" },
      { name: "Seasonal Guide", href: "/seasonal" },
      { name: "Local Farms", href: "/farms" },
      { name: "Events", href: "/events" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
      color: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube,
      color: "hover:text-red-600",
    },
  ];

  const features = [
    {
      icon: Leaf,
      title: "Fresh & Organic",
      description: "100% organic produce from local farms"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery to your doorstep"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Satisfaction guaranteed or money back"
    },
    {
      icon: Heart,
      title: "Support Local",
      description: "Supporting local farmers and communities"
    }
  ];

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeSuccess(true);
      setEmail("");
      setTimeout(() => setSubscribeSuccess(false), 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-green-50 to-blue-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with Fresh News
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for seasonal recipes, farming tips, and exclusive offers from local farmers.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing || subscribeSuccess}
                className="group"
              >
                {isSubscribing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : subscribeSuccess ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mr-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                HarvestLink
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connecting local farmers with consumers for fresh, sustainable produce. 
              Supporting communities through farm-to-table excellence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>hello@harvestlink.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>123 Farm Street, Local City</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${item.color}`}
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketplace</h3>
              <ul className="space-y-3">
                {footerLinks.marketplace.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <feature.icon className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>&copy; {new Date().getFullYear()} HarvestLink. All rights reserved.</span>
              <span>•</span>
              <span>Made with ❤️ for local communities</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Certified Organic</span>
              <span>•</span>
              <span>Carbon Neutral</span>
              <span>•</span>
              <span>B Corp Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
