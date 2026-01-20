// Main entry point - initializes all modules
// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI components (language, scroll effects, mobile menu)
  initUI()
  
  // Initialize wizard (must be before forms as forms depends on wizard)
  initWizard()
  
  // Initialize forms (submit handlers)
  initForms()
})
