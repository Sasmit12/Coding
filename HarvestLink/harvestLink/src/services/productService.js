import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";

// Mock data for development
const mockProducts = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description: "Sweet, juicy organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    price: 3.99,
    category: "vegetables",
    stock: 50,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    rating: 4.8,
    reviews: 24,
    organic: true,
    local: true,
    createdAt: "2024-01-15T10:30:00Z",
    tags: ["organic", "fresh", "local"]
  },
  {
    id: "2",
    name: "Crisp Apples",
    description: "Fresh, crisp apples from our orchard. Sweet and perfect for eating or baking.",
    price: 2.49,
    category: "fruits",
    stock: 75,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    farmerId: "farmer2",
    farmerName: "Apple Hill Orchard",
    rating: 4.6,
    reviews: 18,
    organic: false,
    local: true,
    createdAt: "2024-01-14T15:45:00Z",
    tags: ["fresh", "sweet", "local"]
  },
  {
    id: "3",
    name: "Fresh Eggs",
    description: "Farm-fresh eggs from free-range chickens. Rich in flavor and nutrients.",
    price: 4.99,
    category: "dairy",
    stock: 30,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1569288063648-850b3e4c4e1c?w=400&h=300&fit=crop",
    farmerId: "farmer3",
    farmerName: "Happy Hen Farm",
    rating: 4.9,
    reviews: 32,
    organic: true,
    local: true,
    createdAt: "2024-01-13T09:20:00Z",
    tags: ["organic", "fresh", "free-range"]
  },
  {
    id: "4",
    name: "Fresh Lettuce",
    description: "Crisp, fresh lettuce perfect for salads and sandwiches.",
    price: 1.99,
    category: "vegetables",
    stock: 40,
    unit: "head",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    rating: 4.5,
    reviews: 15,
    organic: true,
    local: true,
    createdAt: "2024-01-12T14:15:00Z",
    tags: ["organic", "fresh", "salad"]
  },
  {
    id: "5",
    name: "Fresh Milk",
    description: "Pure, fresh milk from grass-fed cows. Rich and creamy.",
    price: 3.49,
    category: "dairy",
    stock: 25,
    unit: "gallon",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    farmerId: "farmer4",
    farmerName: "Dairy Delight Farm",
    rating: 4.7,
    reviews: 28,
    organic: true,
    local: true,
    createdAt: "2024-01-11T11:30:00Z",
    tags: ["organic", "fresh", "grass-fed"]
  },
  {
    id: "6",
    name: "Fresh Carrots",
    description: "Sweet, crunchy carrots grown in rich soil. Perfect for snacking or cooking.",
    price: 2.99,
    category: "vegetables",
    stock: 60,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
    farmerId: "farmer1",
    farmerName: "Green Valley Farm",
    rating: 4.4,
    reviews: 22,
    organic: true,
    local: true,
    createdAt: "2024-01-10T16:45:00Z",
    tags: ["organic", "fresh", "sweet"]
  }
];

export const productService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    try {
      // If Firebase is available, try to fetch from database
      if (db) {
        let q = collection(db, "products");
        const constraints = [];

        if (filters.category) {
          constraints.push(where("category", "==", filters.category));
        }
        if (filters.farmerId) {
          constraints.push(where("farmerId", "==", filters.farmerId));
        }
        if (filters.minPrice) {
          constraints.push(where("price", ">=", filters.minPrice));
        }
        if (filters.maxPrice) {
          constraints.push(where("price", "<=", filters.maxPrice));
        }
        if (filters.inStock) {
          constraints.push(where("stock", ">", 0));
        }

        // Add sorting
        constraints.push(orderBy("createdAt", "desc"));
        if (filters.limit) {
          constraints.push(limit(filters.limit));
        }

        q = query(q, ...constraints);
        const querySnapshot = await getDocs(q);

        const firebaseProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // If we have data from Firebase, return it
        if (firebaseProducts.length > 0) {
          return firebaseProducts;
        }
      }

      // Fallback to mock data
      let filteredProducts = [...mockProducts];

      // Apply filters to mock data
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.farmerId) {
        filteredProducts = filteredProducts.filter(p => p.farmerId === filters.farmerId);
      }
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
      }
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
      }
      if (filters.organic) {
        filteredProducts = filteredProducts.filter(p => p.organic);
      }
      if (filters.local) {
        filteredProducts = filteredProducts.filter(p => p.local);
      }

      return filteredProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return mock data as fallback
      return mockProducts;
    }
  },

  // Get a single product by ID
  async getProduct(productId) {
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Product not found");
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Get products for a specific farmer
  async getFarmerProducts(farmerId) {
    try {
      const q = query(
        collection(db, "products"),
        where("farmerId", "==", farmerId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching farmer products:", error);
      throw error;
    }
  },

  // Create a new product
  async createProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return {
        id: docRef.id,
        ...productData,
      };
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update an existing product
  async updateProduct(productId, updateData) {
    try {
      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date().toISOString(),
      });

      return {
        id: productId,
        ...updateData,
      };
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(productId) {
    try {
      const docRef = doc(db, "products", productId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // Update product stock
  async updateStock(productId, quantity) {
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Product not found");
      }

      const currentStock = docSnap.data().stock;
      const newStock = Math.max(0, currentStock - quantity);

      await updateDoc(docRef, {
        stock: newStock,
        updatedAt: new Date().toISOString(),
      });

      return newStock;
    } catch (error) {
      console.error("Error updating product stock:", error);
      throw error;
    }
  },
};
