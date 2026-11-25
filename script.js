// Edit these sample products as you build your real LALOS catalogue.
// Keep prices as "—" until you have confirmed products and pricing.
const products = [
  {name:"The Everyday Overshirt",category:"Fashion",detail:"An easy layer for every day",price:"—",tag:"STYLE",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"},
  {name:"Studio Headphones",category:"Gadgets",detail:"Sound, considered",price:"—",tag:"TECH",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"},
  {name:"Classic Timepiece",category:"Accessories",detail:"A detail that stays with you",price:"—",tag:"OBJECTS",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"},
  {name:"Scent No. 01",category:"Fragrance",detail:"A signature in the making",price:"—",tag:"SCENT",image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"}
];

const grid = document.querySelector("#product-grid");
function renderProducts(filter="All") {
  const visible = filter === "All" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div>
      <div class="product-info"><div><h3>${p.name}</h3><p>${p.detail}</p><a class="inquire-link" href="mailto:hello@lalos.example?subject=${encodeURIComponent("LALOS product enquiry: "+p.name)}">ENQUIRE ↗</a></div><span>${p.price}</span></div>
    </article>`).join("") : '<p class="empty-state">More discoveries coming soon.</p>';
}
renderProducts();

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  renderProducts(button.dataset.filter);
}));
document.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => {
  const category = link.dataset.categoryLink;
  document.querySelectorAll(".filter").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === category);
  });
  renderProducts(category);
}));
const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  toggle.setAttribute("aria-expanded","false");
}));
document.querySelector("#newsletter-form").addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#form-message").textContent = "Thanks for your interest. Newsletter sign-up will be activated when the store is connected to an email service.";
});
document.querySelector("#year").textContent = new Date().getFullYear();
