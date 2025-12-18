// main.js - Shared functionality for all pages

// HTML INCLUDE ENGINE
async function loadIncludes() {
  const includeElements = document.querySelectorAll("[include-html]");

  for (const el of includeElements) {
    const file = el.getAttribute("include-html");
    try {
      const res = await fetch(file);
      if (res.ok) {
        const html = await res.text();
        el.innerHTML = html;
      }
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  }
}

// MOBILE MENU INITIALIZATION
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobilePanel = document.getElementById("mobilePanel");
  const closeMenu = document.getElementById("closeMobileMenu");

  if (!mobileMenuBtn || !mobileMenu) return;

  // Open menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.remove("opacity-0");
      mobilePanel.classList.remove("translate-x-full");
    }, 10);
  });

  // Close menu button
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("opacity-0");
    mobilePanel.classList.add("translate-x-full");
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);
  });

  // Close menu when clicking overlay
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMenu.click();
    }
  });
}

// INITIALIZE EVERYTHING
document.addEventListener("DOMContentLoaded", async () => {
  // Load all includes first
  await loadIncludes();
  
  // Then initialize the mobile menu
  initializeMobileMenu();
  
  // Update year in footer if element exists
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});