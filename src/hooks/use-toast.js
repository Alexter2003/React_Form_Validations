// Simple toast implementation
export const toast = ({ title, description, variant = "default" }) => {
  console.log(`Toast (${variant}):`, title, description);

  // Create a toast element
  const toastEl = document.createElement("div");
  toastEl.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
    variant === "destructive"
      ? "bg-red-600 text-white"
      : "bg-gray-800 text-white"
  }`;

  // Create toast content
  toastEl.innerHTML = `
    <div class="flex flex-col gap-1">
      <h3 class="font-medium">${title}</h3>
      ${description ? `<p class="text-sm opacity-90">${description}</p>` : ""}
    </div>
  `;

  // Add to DOM
  document.body.appendChild(toastEl);

  // Remove after 3 seconds
  setTimeout(() => {
    toastEl.classList.add("opacity-0", "transition-opacity");
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, 300);
  }, 3000);
};
