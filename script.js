// LALOS starter catalogue — illustrative sample products, not confirmed stock.
const products = [
  {id:"fashion-01",name:"The Essential Linen Shirt",category:"Fashion",detail:"An airy everyday layer in a relaxed silhouette.",price:39,tag:"THE EVERYDAY",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85"},
  {id:"fashion-02",name:"The Tailored Trouser",category:"Fashion",detail:"A clean, versatile shape made for easy styling.",price:55,tag:"NEW CLASSIC",image:"https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=85"},
  {id:"fashion-03",name:"The Canvas Tote",category:"Fashion",detail:"A simple carryall for the everyday essentials.",price:29,tag:"DAILY CARRY",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"},
  {id:"gadgets-01",name:"Wireless Earbuds",category:"Gadgets",detail:"A compact listening companion for life on the move.",price:49,tag:"TECH EDIT",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85"},
  {id:"gadgets-02",name:"The Minimal Desk Lamp",category:"Gadgets",detail:"A considered light for focused moments.",price:35,tag:"AT HOME",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85"},
  {id:"gadgets-03",name:"Portable Bluetooth Speaker",category:"Gadgets",detail:"Small in scale, ready to soundtrack the day.",price:45,tag:"ON THE GO",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85"},
  {id:"accessories-01",name:"Everyday Sunglasses",category:"Accessories",detail:"A timeless frame with an easy, confident feel.",price:29,tag:"FINISHING TOUCH",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85"},
  {id:"accessories-02",name:"The Classic Watch",category:"Accessories",detail:"Understated design for every hour.",price:59,tag:"TIMELESS",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"},
  {id:"accessories-03",name:"Slim Card Holder",category:"Accessories",detail:"A neat, minimal home for the essentials.",price:25,tag:"DAILY OBJECT",image:"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85"},
  {id:"fragrance-01",name:"LALOS Signature Eau de Parfum",category:"Fragrance",detail:"A sample signature scent concept for the LALOS edit.",price:45,tag:"SCENT EDIT",image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85"},
  {id:"fragrance-02",name:"Fragrance Discovery Set",category:"Fragrance",detail:"A sample set concept for discovering new notes.",price:19,tag:"DISCOVER",image:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85"},
  {id:"fragrance-03",name:"Warm Amber Candle",category:"Fragrance",detail:"A warm, atmospheric accent for slower evenings.",price:24,tag:"AT HOME",image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85"}
];

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const sortSelect = document.querySelector("#product-sort");
let activeFilter = "All";

const euro = value => new Intl.NumberFormat("en-IE", {
  style:"currency", currency:"EUR", maximumFractionDigits:0
}).format(value);

function renderProducts() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = products.filter(p =>
    (activeFilter === "All" || p.category === activeFilter) &&
    [p.name,p.category,p.detail].join(" ").toLowerCase().includes(query)
  );
  const sort = sortSelect?.value || "featured";
  if (sort === "low-high") visible.sort((a,b)=>a.price-b.price);
  if (sort === "high-low") visible.sort((a,b)=>b.price-a.price);
  if (sort === "az") visible.sort((a,b)=>a.name.localeCompare(b.name));

  grid.innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <button class="product-open" type="button" data-product-id="${p.id}" aria-label="View ${p.name}">
        <div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><span class="quick-view">QUICK VIEW ↗</span></div>
      </button>
      <div class="product-info">
        <div><p class="product-category">${p.category}</p><h3>${p.name}</h3><p>${p.detail}</p></div>
        <span class="product-price">${euro(p.price)}</span>
      </div>
      <button class="inquire-link" type="button" data-enquire-id="${p.id}">ENQUIRE ↗</button>
    </article>`).join("") : '<p class="empty-state">No matches just yet. Try another search or category.</p>';
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter").forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
}
renderProducts();

document.querySelectorAll(".filter").forEach(button =>
  button.addEventListener("click", () => setFilter(button.dataset.filter))
);
document.querySelectorAll("[data-category-link]").forEach(link =>
  link.addEventListener("click", () => setFilter(link.dataset.categoryLink))
);
searchInput?.addEventListener("input", renderProducts);
sortSelect?.addEventListener("change", renderProducts);

grid.addEventListener("click", event => {
  const enquire = event.target.closest("[data-enquire-id]");
  const open = event.target.closest("[data-product-id]");
  const product = products.find(p => p.id === (enquire?.dataset.enquireId || open?.dataset.productId));
  if (!product) return;
  const subject = encodeURIComponent(`LALOS product enquiry: ${product.name}`);
  const body = encodeURIComponent(`Hello LALOS,\n\nI'm interested in ${product.name} (${euro(product.price)}).\nCould you please share more information?\n\nThank you.`);
  if (enquire) window.location.href = `mailto:lekhzoumysouhail1@gmail.com?subject=${subject}&body=${body}`;
  else showProductDetails(product);
});

function showProductDetails(product) {
  let dialog = document.querySelector("#product-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "product-dialog";
    dialog.className = "product-dialog";
    document.body.append(dialog);
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }
  dialog.innerHTML = `
    <button class="dialog-close" type="button" aria-label="Close">×</button>
    <div class="dialog-layout">
      <img src="${product.image}" alt="${product.name}">
      <div class="dialog-copy">
        <p class="eyebrow">${product.category.toUpperCase()} / LALOS EDIT</p>
        <h2>${product.name}</h2>
        <p class="dialog-description">${product.detail}</p>
        <strong>${euro(product.price)}</strong>
        <p class="sample-disclaimer">Illustrative sample listing. Availability and final pricing are not confirmed.</p>
        <a class="button button-dark" href="mailto:lekhzoumysouhail1@gmail.com?subject=${encodeURIComponent("LALOS product enquiry: "+product.name)}">Enquire about this item ↗</a>
      </div>
    </div>`;
  dialog.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
  dialog.showModal();
}

const toggle = document.querySelector(".menu-toggle");
toggle?.addEventListener("click", () => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  toggle?.setAttribute("aria-expanded","false");
}));
document.querySelector("#newsletter-form")?.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#form-message").textContent = "Thanks for your interest. Newsletter sign-up is not connected yet, so your email has not been saved.";
});
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
