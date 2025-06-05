// Utility functions for navigation and formatting

// Create a menu toggle controller
export function createMenuController() {
  let isMenuOpen = false;
  
  return {
    toggleMenu() {
      isMenuOpen = !isMenuOpen;
      return isMenuOpen;
    },
    isOpen() {
      return isMenuOpen;
    },
    setMenuState(state) {
      isMenuOpen = Boolean(state);
      return isMenuOpen;
    }
  };
}

// Handle keyboard navigation for menu toggle
export function handleMenuKeyboardNavigation(event, toggleCallback) {
  if (event.key === "Enter" || event.key === " ") {
    toggleCallback();
    return true;
  }
  return false;
}

// Scroll to element by ID with smooth behavior
export function scrollToElement(elementId) {
  if (!elementId || elementId === '') return false;
  // Actual scrolling logic can be implemented in UI components.
  return true;
}

// Currency formatter (e.g., for INR payouts)
export const formatCurrency = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

// Date formatter
export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

// Capitalize the first letter
export const capitalize = (str) =>
  str && typeof str === "string"
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str;
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}