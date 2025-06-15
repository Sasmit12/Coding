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
  orderBy,
  limit,
} from "firebase/firestore";
import { productService } from "./index";

export const orderService = {
  // Get all orders for a user (consumer or farmer)
  async getOrders(userId, userRole) {
    try {
      const field = userRole === "farmer" ? "farmerId" : "consumerId";
      const q = query(
        collection(db, "orders"),
        where(field, "==", userId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get a single order by ID
  async getOrder(orderId) {
    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Order not found");
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Create a new order
  async createOrder(orderData) {
    try {
      // Start a transaction to update product stock
      const orderItems = orderData.items;
      for (const item of orderItems) {
        await productService.updateStock(item.productId, item.quantity);
      }

      const docRef = await addDoc(collection(db, "orders"), {
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return {
        id: docRef.id,
        ...orderData,
        status: "pending",
      };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const docRef = doc(db, "orders", orderId);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date().toISOString(),
      });

      return {
        id: orderId,
        status,
      };
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Add tracking information to an order
  async addTrackingInfo(orderId, trackingInfo) {
    try {
      const docRef = doc(db, "orders", orderId);
      await updateDoc(docRef, {
        tracking: trackingInfo,
        updatedAt: new Date().toISOString(),
      });

      return {
        id: orderId,
        tracking: trackingInfo,
      };
    } catch (error) {
      console.error("Error adding tracking info:", error);
      throw error;
    }
  },

  // Get recent orders for dashboard
  async getRecentOrders(userId, userRole, limit = 5) {
    try {
      const field = userRole === "farmer" ? "farmerId" : "consumerId";
      const q = query(
        collection(db, "orders"),
        where(field, "==", userId),
        orderBy("createdAt", "desc"),
        limit(limit),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      throw error;
    }
  },
};
