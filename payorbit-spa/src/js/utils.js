// Navigation utilities for SPA
// Contains navigation state and scrolling logic without direct DOM manipulation

/**
 * Create a menu toggle controller
 * @returns {Object} Menu controller with methods to manage menu state
 */
function createMenuController() {
  let isMenuOpen = false;
  
  return {
    /**
     * Toggle menu state
     * @returns {boolean} New menu state
     */
    toggleMenu() {
      isMenuOpen = !isMenuOpen;
      return isMenuOpen;
    },
    
    /**
     * Get current menu state
     * @returns {boolean} Current menu state
     */
    isOpen() {
      return isMenuOpen;
    },
    
    /**
     * Set menu state
     * @param {boolean} state - Desired menu state
     */
    setMenuState(state) {
      isMenuOpen = Boolean(state);
      return isMenuOpen;
    }
  };
}

/**
 * Handle keyboard navigation for menu toggle
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Function} toggleCallback - Function to call when toggle is activated
 * @returns {boolean} Whether the event was handled
 */
function handleMenuKeyboardNavigation(event, toggleCallback) {
  if (event.key === "Enter" || event.key === " ") {
    toggleCallback();
    return true;
  }
  return false;
}

/**
 * Scroll to element by ID with smooth behavior
 * @param {string} elementId - Element ID to scroll to (without the # symbol)
 * @returns {boolean} Whether the scroll was performed
 */
function scrollToElement(elementId) {
  // This function is meant to be called by SPA routing/navigation
  // The implementation will depend on the specific SPA framework
  
  if (!elementId || elementId === '') {
    return false;
  }
  
  // Return true to indicate success (actual scrolling would be implemented
  // by the framework or in the component using this function)
  return true;
}

export {
  createMenuController,
  handleMenuKeyboardNavigation,
  scrollToElement
};