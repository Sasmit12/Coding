import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  increment,
} from "firebase/firestore";

const TIERS = {
  BRONZE: {
    name: "Bronze",
    minPoints: 0,
    benefits: [
      "Basic rewards program access",
      "Email notifications for special offers",
    ],
  },
  SILVER: {
    name: "Silver",
    minPoints: 1000,
    benefits: [
      "All Bronze benefits",
      "5% discount on all purchases",
      "Free shipping on orders over $50",
      "Early access to new products",
    ],
  },
  GOLD: {
    name: "Gold",
    minPoints: 5000,
    benefits: [
      "All Silver benefits",
      "10% discount on all purchases",
      "Free shipping on all orders",
      "Priority customer support",
      "Exclusive product previews",
    ],
  },
  PLATINUM: {
    name: "Platinum",
    minPoints: 10000,
    benefits: [
      "All Gold benefits",
      "15% discount on all purchases",
      "Free express shipping",
      "Personal shopping assistant",
      "VIP event invitations",
    ],
  },
};

export const loyaltyService = {
  // Get loyalty points for a user
  async getLoyaltyPoints(userId) {
    try {
      const docRef = doc(db, "loyalty", userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Initialize loyalty points if not exists
        await this.initializeLoyaltyPoints(userId);
        return {
          points: 0,
          tier: "Bronze",
          nextTierPoints: 100,
        };
      }

      const data = docSnap.data();
      return {
        points: data.points,
        tier: this.calculateTier(data.points),
        nextTierPoints: this.calculateNextTierPoints(data.points),
      };
    } catch (error) {
      console.error("Error fetching loyalty points:", error);
      throw error;
    }
  },

  // Add points to user's loyalty account
  async addPoints(userId, points) {
    try {
      const docRef = doc(db, "loyalty", userId);
      await updateDoc(docRef, {
        points: increment(points),
        updatedAt: new Date().toISOString(),
      });

      // Get updated points
      const updatedDoc = await getDoc(docRef);
      const currentPoints = updatedDoc.data().points;

      return {
        points: currentPoints,
        tier: this.calculateTier(currentPoints),
        nextTierPoints: this.calculateNextTierPoints(currentPoints),
      };
    } catch (error) {
      console.error("Error adding loyalty points:", error);
      throw error;
    }
  },

  // Initialize loyalty points for a new user
  async initializeLoyaltyPoints(userId) {
    try {
      const docRef = doc(db, "loyalty", userId);
      await updateDoc(docRef, {
        points: 0,
        tier: "Bronze",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error initializing loyalty points:", error);
      throw error;
    }
  },

  // Calculate tier based on points
  calculateTier(points) {
    if (points >= 1000) return "Platinum";
    if (points >= 500) return "Gold";
    if (points >= 100) return "Silver";
    return "Bronze";
  },

  // Calculate points needed for next tier
  calculateNextTierPoints(points) {
    if (points >= 1000) return null; // Already at highest tier
    if (points >= 500) return 1000;
    if (points >= 100) return 500;
    return 100;
  },

  // Get tier benefits
  getTierBenefits(tier) {
    const benefits = {
      Bronze: ["Basic customer support", "Standard delivery options"],
      Silver: [
        "Priority customer support",
        "Free standard delivery",
        "5% discount on all purchases",
      ],
      Gold: [
        "24/7 premium customer support",
        "Free express delivery",
        "10% discount on all purchases",
        "Early access to new products",
      ],
      Platinum: [
        "Dedicated account manager",
        "Free same-day delivery",
        "15% discount on all purchases",
        "Exclusive product launches",
        "VIP event invitations",
      ],
    };

    return benefits[tier] || benefits.Bronze;
  },

  // Get transaction history
  async getTransactionHistory(userId, limit = 10) {
    try {
      const docRef = doc(db, "loyalty", userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Loyalty account not found");
      }

      const { history } = docSnap.data();
      return history
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      throw error;
    }
  },

  // Helper function to format loyalty data for frontend
  formatLoyaltyData(data) {
    const tier = TIERS[data.tier];
    const nextTier = Object.values(TIERS).find(
      (t) => t.minPoints > data.points,
    );

    return {
      points: data.points,
      tier: tier.name,
      benefits: tier.benefits,
      nextTierPoints: nextTier ? nextTier.minPoints - data.points : 0,
      history: data.history,
    };
  },
};
