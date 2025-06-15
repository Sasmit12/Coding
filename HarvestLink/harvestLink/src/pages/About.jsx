import { 
  Users, 
  Leaf, 
  Heart, 
  Target, 
  Award, 
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We promote sustainable farming practices that protect our environment for future generations."
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building strong connections between farmers and consumers in local communities."
    },
    {
      icon: Target,
      title: "Quality",
      description: "Ensuring the highest quality produce through rigorous standards and farmer partnerships."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Leveraging technology to create efficient farm-to-table supply chains."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former agricultural consultant with 15+ years experience in sustainable farming.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Tech entrepreneur passionate about using technology to solve food system challenges.",
      avatar: "👨‍💻"
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      bio: "Supply chain expert with deep knowledge of local food systems and logistics.",
      avatar: "👩‍🔬"
    },
    {
      name: "David Thompson",
      role: "Head of Farmer Relations",
      bio: "Former farmer with 20+ years experience in organic agriculture and community building.",
      avatar: "👨‍🌾"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description: "HarvestLink was founded with a vision to connect local farmers with consumers."
    },
    {
      year: "2021",
      title: "First 100 Farmers",
      description: "Reached our first 100 farmer partnerships across the region."
    },
    {
      year: "2022",
      title: "10,000 Customers",
      description: "Served over 10,000 customers with fresh, local produce."
    },
    {
      year: "2023",
      title: "Expansion",
      description: "Expanded to 25+ cities and launched mobile app."
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Launched AI-powered recommendations and real-time tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              About <span className="text-green-600">HarvestLink</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people access fresh, local produce by creating 
              direct connections between farmers and consumers through innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At HarvestLink, we believe that everyone deserves access to fresh, nutritious, 
                and sustainably grown food. Our mission is to strengthen local food systems by 
                connecting farmers directly with consumers, ensuring fair prices for farmers 
                and fresh produce for families.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're committed to supporting sustainable farming practices, reducing food waste, 
                and building stronger, more resilient communities through the power of local food.
              </p>
              <Link 
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
              <div className="text-center">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Building Connections</h3>
                <p className="text-green-100">
                  Connecting farmers and consumers for a sustainable future
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at HarvestLink
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind HarvestLink's mission
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize local food systems
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-green-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Award className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Farm-to-Table Revolution
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking to reach more customers or a consumer seeking fresh, 
            local produce, we'd love to have you join our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register?role=consumer"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Join as Consumer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/register?role=farmer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Join as Farmer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
