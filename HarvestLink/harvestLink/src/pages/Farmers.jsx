import { useState, useEffect } from "react";
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Truck,
  Leaf,
  Users
} from "lucide-react";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock farmers data
  useEffect(() => {
    const mockFarmers = [
      {
        id: 1,
        name: "Green Valley Farms",
        owner: "Sarah Johnson",
        location: "Albany, NY",
        specialties: ["Organic Vegetables", "Herbs", "Microgreens"],
        rating: 4.8,
        reviewCount: 127,
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
        description: "Family-owned organic farm specializing in fresh vegetables and herbs. We focus on sustainable farming practices and deliver fresh produce to local communities.",
        phone: "(518) 555-0123",
        email: "sarah@greenvalleyfarms.com",
        website: "www.greenvalleyfarms.com",
        deliveryRadius: "25 miles",
        certifications: ["USDA Organic", "Certified Naturally Grown"],
        yearsInBusiness: 15
      },
      {
        id: 2,
        name: "Sunny Acres",
        owner: "Michael Chen",
        location: "Buffalo, NY",
        specialties: ["Fruits", "Berries", "Honey"],
        rating: 4.9,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=300&fit=crop",
        description: "Specializing in seasonal fruits and berries. Our farm uses integrated pest management and sustainable practices to grow the sweetest, healthiest fruits.",
        phone: "(716) 555-0456",
        email: "michael@sunnyacres.com",
        website: "www.sunnyacres.com",
        deliveryRadius: "30 miles",
        certifications: ["USDA Organic"],
        yearsInBusiness: 8
      },
      {
        id: 3,
        name: "Harvest Hill",
        owner: "Emily Rodriguez",
        location: "Rochester, NY",
        specialties: ["Root Vegetables", "Greens", "Flowers"],
        rating: 4.7,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
        description: "Diverse farm growing root vegetables, leafy greens, and cut flowers. We believe in crop rotation and soil health for sustainable agriculture.",
        phone: "(585) 555-0789",
        email: "emily@harvesthill.com",
        website: "www.harvesthill.com",
        deliveryRadius: "20 miles",
        certifications: ["Certified Naturally Grown"],
        yearsInBusiness: 12
      }
    ];

    setFarmers(mockFarmers);
    setLoading(false);
  }, []);

  const categories = ["all", "vegetables", "fruits", "herbs", "flowers", "organic"];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || 
                           farmer.specialties.some(specialty => 
                             specialty.toLowerCase().includes(filterCategory)
                           );
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading farmers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Farmers</h1>
        <p className="text-xl text-gray-600">
          Meet the dedicated farmers who bring fresh, local produce to your table.
        </p>
      </div>
    </div>
  );
} 