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
      <button class="add-to-bag" type="button" data-add-id="${p.id}">ADD TO BAG +</button>
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

const CART_KEY = "lalos-demo-cart-v1";
let cart = loadCart();
function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); } catch { return {}; } }
function saveCart(){ try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} }
function addToCart(product){ cart[product.id]=(cart[product.id]||0)+1; saveCart(); renderCart(); openCart(); }
function changeQty(id,delta){ cart[id]=(cart[id]||0)+delta; if(cart[id]<=0) delete cart[id]; saveCart(); renderCart(); }
function cartEntries(){ return Object.entries(cart).map(([id,qty])=>({product:products.find(p=>p.id===id),qty})).filter(x=>x.product); }
function renderCart(){
  const entries=cartEntries(), count=entries.reduce((n,x)=>n+x.qty,0), subtotal=entries.reduce((n,x)=>n+x.product.price*x.qty,0);
  document.querySelector("#cart-count").textContent=count;
  document.querySelector("#drawer-count").textContent=`(${count})`;
  document.querySelector("#cart-subtotal").textContent=euro(subtotal);
  document.querySelector("#cart-items").innerHTML=entries.length?entries.map(({product:p,qty})=>`<div class="cart-line"><img src="${p.image}" alt=""><div class="cart-line-info"><strong>${p.name}</strong><span>${euro(p.price)}</span><div class="qty-control"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button><span>${qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Increase quantity">+</button><button type="button" class="remove-item" data-remove="${p.id}">Remove</button></div></div></div>`).join(""):'<p class="cart-empty">Your bag is waiting for something considered.</p>';
}
function openCart(){ document.querySelector("#cart-overlay").hidden=false; document.querySelector("#cart-drawer").classList.add("is-open"); document.querySelector("#cart-drawer").setAttribute("aria-hidden","false"); document.body.classList.add("cart-open"); }
function closeCart(){ document.querySelector("#cart-overlay").hidden=true; document.querySelector("#cart-drawer").classList.remove("is-open"); document.querySelector("#cart-drawer").setAttribute("aria-hidden","true"); document.body.classList.remove("cart-open"); }
document.querySelector("#cart-trigger").addEventListener("click",openCart);
document.querySelector("#cart-close").addEventListener("click",closeCart);
document.querySelector("#cart-overlay").addEventListener("click",closeCart);
document.querySelector("#cart-items").addEventListener("click",e=>{ const q=e.target.closest("[data-qty]"); const rm=e.target.closest("[data-remove]"); if(q) changeQty(q.dataset.id,Number(q.dataset.qty)); if(rm){delete cart[rm.dataset.remove];saveCart();renderCart();} });
document.querySelector("#checkout-preview").addEventListener("click",()=>{document.querySelector("#checkout-message").textContent="Checkout preview only: no order has been placed and no payment or customer details have been collected. We'll activate checkout after the business and payment setup is complete.";});
grid.addEventListener("click", event => {
  const add=event.target.closest("[data-add-id]"); const open=event.target.closest("[data-product-id]");
  if(add){const p=products.find(x=>x.id===add.dataset.addId);if(p)addToCart(p);return;}
  const product=products.find(p=>p.id===open?.dataset.productId); if(product) showProductDetails(product);
});
document.addEventListener("click",e=>{const add=e.target.closest("[data-modal-add]");if(add){const p=products.find(x=>x.id===add.dataset.modalAdd);if(p){document.querySelector("#product-dialog")?.close();addToCart(p);}}});
renderCart();

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
        <button class="button button-dark" type="button" data-modal-add="${product.id}">Add to bag +</button>
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
