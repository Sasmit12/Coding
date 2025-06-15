import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmer-primary">
              About HarvestLink
            </h3>
            <p className="text-gray-600 text-sm">
              Connecting local farmers with consumers for fresher, sustainable
              produce and a stronger community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmer-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/market"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmer-primary">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/forum"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  Farming Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-600 hover:text-farmer-primary text-sm"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-farmer-primary">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                Email: support@harvestlink.com
              </li>
              <li className="text-gray-600 text-sm">Phone: (555) 123-4567</li>
              <li className="text-gray-600 text-sm">
                Address: 123 Farm Street, Harvest City
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} HarvestLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
