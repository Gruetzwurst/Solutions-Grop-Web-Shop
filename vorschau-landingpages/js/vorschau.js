const products = {
  schreibtisch_milano: { name: "Schreibtisch Milano", price: 749, image: "https://testseite-ubungsfirma.web.app/calisma%20masasi/masa_1_minimal_beyaz_mese.webp" },
  schreibtisch_natura: { name: "Schreibtisch Natura", price: 899, image: "https://testseite-ubungsfirma.web.app/calisma%20masasi/masa_2_koyu_ceviz.webp" },
  schreibtisch_eckloesung: { name: "Eckschreibtisch Loft", price: 1190, image: "https://testseite-ubungsfirma.web.app/calisma%20masasi/masa_3_L_kose.webp" },
  schreibtisch_pro: { name: "Premium-Höhenverstellbarer Schreibtisch Pro", price: 1590, image: "https://testseite-ubungsfirma.web.app/calisma%20masasi/masa_4_yukseklik_ayarli.webp" },
  schreibtisch_nordic: { name: "Schreibtisch Nordic mit Regal", price: 990, image: "https://testseite-ubungsfirma.web.app/calisma%20masasi/masa_5_iskandinav_rafli.webp" },
  stuhl_aero: { name: "Ergonomischer Bürostuhl Aero", price: 649, image: "https://testseite-ubungsfirma.web.app/ofis%20sandalyesi/sandalye_1_beyaz_gri_file.webp" },
  stuhl_executive: { name: "Chefsessel Executive", price: 899, image: "https://testseite-ubungsfirma.web.app/ofis%20sandalyesi/sandalye_2_siyah_deri_yonetici.webp" },
  stuhl_comfort: { name: "Bürostuhl Comfort", price: 799, image: "https://testseite-ubungsfirma.web.app/ofis%20sandalyesi/sandalye_3_gri_kumas_ergonomik.webp" },
  stuhl_scandi: { name: "Designstuhl Scandi", price: 1190, image: "https://testseite-ubungsfirma.web.app/ofis%20sandalyesi/sandalye_4_krem_bukle_iskandinav.webp" },
  stuhl_mesh: { name: "Ergonomischer Netzstuhl Mesh", price: 999, image: "https://testseite-ubungsfirma.web.app/ofis%20sandalyesi/sandalye_5_siyah_file_ergonomik.webp" },
  schrank_natura: { name: "Schubladenschrank Natura", price: 549, image: "https://testseite-ubungsfirma.web.app/produkt3/dolap_1_beyaz_mese_3cekmeceli.webp" },
  schrank_industrial: { name: "Aktenschrank Industrial", price: 749, image: "https://testseite-ubungsfirma.web.app/produkt3/dolap_2_siyah_metal_ahsap.webp" },
  schrank_modern: { name: "Büroschrank Modern", price: 629, image: "https://testseite-ubungsfirma.web.app/produkt3/dolap_3_gri_ahsap_rafli.webp" },
  lampe_natura: { name: "Tischleuchte Natura", price: 229, image: "https://testseite-ubungsfirma.web.app/produkt3/lamba_1_beyaz_ahsap.webp" },
  lampe_metro: { name: "Metallleuchte Metro", price: 349, image: "https://testseite-ubungsfirma.web.app/produkt3/lamba_2_siyah_metal.webp" },
  lampe_studio: { name: "Schreibtischleuchte Studio", price: 279, image: "https://testseite-ubungsfirma.web.app/produkt3/lamba_3_gri_ahsap_dimmer.webp" },
  lampe_mobile: { name: "Akku-Tischleuchte Mobile", price: 399, image: "https://testseite-ubungsfirma.web.app/produkt3/lamba_4_beyaz_krom_sarjli.webp" },
  lampe_scandi: { name: "Designleuchte Scandi", price: 299, image: "https://testseite-ubungsfirma.web.app/produkt3/lamba_5_iskandinav_ahsap.webp" },
  kaffeemaschine_espresso: { name: "Espressomaschine Noir", price: 499, image: "https://testseite-ubungsfirma.web.app/produkt3/kahve_1_siyah_celik_espresso.webp" },
  kaffeemaschine_filter: { name: "Filterkaffeemaschine Pure", price: 249, image: "https://testseite-ubungsfirma.web.app/produkt3/kahve_2_beyaz_gri_filtre.webp" },
  kaffeemaschine_kapsel: { name: "Kapselmaschine Atelier", price: 329, image: "https://testseite-ubungsfirma.web.app/produkt3/kahve_3_siyah_ahsap_kapsul.webp" },
  organizer_natura: { name: "Schreibtisch-Set Natura", price: 149, image: "https://testseite-ubungsfirma.web.app/produkt3/organizator_1_ahsap_beyaz_set.webp" },
  organizer_executive: { name: "Organizer-Set Executive", price: 199, image: "https://testseite-ubungsfirma.web.app/produkt3/organizator_2_siyah_metal_deri.webp" },
  organizer_minimal: { name: "Schreibtisch-Organizer Minimal", price: 179, image: "https://testseite-ubungsfirma.web.app/produkt3/organizator_3_gri_ahsap_minimal.webp" },
};

const productVariants = [
  { id: "standard", name: "Standard", multiplier: 1 },
  { id: "premium", name: "Premium-Ausführung", multiplier: 1.1 },
  { id: "design", name: "Design-Edition", multiplier: 1.18 },
];
Object.values(products).forEach((product) => { product.variants = productVariants; });

const storageKey = "solutions-group-cart";
const authStorageKey = "solutions-group-user";
const demoEmail = "admin@ubungsfirma.de";
const demoPassword = "123456";
const wishlistStorageKey = "solutions-group-wishlist";
const recentStorageKey = "solutions-group-recent";
const couponStorageKey = "solutions-group-coupon";
const priceFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function getCartLine(token) {
  const [id, variantId = "standard"] = String(token).split("::");
  const product = products[id];
  if (!product) return null;
  const variant = product.variants?.find((item) => item.id === variantId);
  if (!variant) return null;
  return {
    id,
    product,
    variant,
    token: variantId === "standard" ? id : `${id}::${variantId}`,
    name: variantId === "standard" ? product.name : `${product.name} – ${variant.name}`,
    price: Math.round(product.price * variant.multiplier),
  };
}

function createCartToken(id, variantId = "standard") {
  return variantId === "standard" ? id : `${id}::${variantId}`;
}

function readCart() {
  const savedCart = localStorage.getItem(storageKey);
  if (!savedCart) return [];

  const parsedCart = JSON.parse(savedCart);
  if (!Array.isArray(parsedCart)) return [];

  return parsedCart.filter((token) => getCartLine(token));
}

function saveCart(cart) {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function formatPrice(price) {
  return `${priceFormatter.format(price)} €`;
}

function readStoredIds(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return [];

  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((id) => Object.hasOwn(products, id));
}

function setupCatalog() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return null;

  const categoryNames = {
    desks: "Schreibtische",
    chairs: "Bürostühle",
    storage: "Büroschränke & Aufbewahrung",
    lighting: "Schreibtischleuchten",
    coffee: "Kaffeemaschinen",
    organization: "Schreibtisch-Organisation",
  };
  const brandByCategory = {
    desks: ["Nordwerk", "Forma Studio", "Arbeitswelt"],
    chairs: ["ErgoForm", "Nordwerk", "Forma Studio"],
    storage: ["Nordwerk", "Forma Studio", "Arbeitswelt"],
    lighting: ["Lichtwerk", "Forma Studio", "Nordwerk"],
    coffee: ["Kaffeekontor", "Lichtwerk", "Arbeitswelt"],
    organization: ["Forma Studio", "Nordwerk", "Arbeitswelt"],
  };
  const scores = [4.8, 4.6, 4.9, 4.7, 4.2];
  const sourceSections = [...document.querySelectorAll(".product-category")];
  let catalogIndex = 0;

  sourceSections.forEach((section) => {
    const headingId = section.querySelector(".section-heading h2")?.id || "";
    const category = headingId.replace("-heading", "");
    const cards = [...section.querySelectorAll(".product-card")];
    cards.forEach((card, index) => {
      const addButton = card.querySelector("[data-add-to-cart]");
      const id = addButton?.dataset.addToCart;
      const product = products[id];
      if (!product) return;

      product.id = id;
      product.category = category;
      product.categoryName = categoryNames[category];
      product.brand = brandByCategory[category][index % brandByCategory[category].length];
      product.rating = scores[catalogIndex % scores.length];
      product.reviews = 18 + ((catalogIndex * 17) % 184);
      product.available = catalogIndex % 7 !== 5;
      product.newest = catalogIndex;
      product.discount = catalogIndex % 6 === 2;
      const descriptors = `${product.name} ${product.description}`.toLocaleLowerCase("de");
      product.attributes = [];
      if (descriptors.includes("ergonom") || descriptors.includes("netz")) product.attributes.push("Ergonomisch");
      if (descriptors.includes("holz") || descriptors.includes("eiche") || descriptors.includes("walnuss")) product.attributes.push("Holzdesign");
      if (id === "schreibtisch_pro") product.attributes.push("Höhenverstellbar");
      if (id === "lampe_mobile") product.attributes.push("Kabellos");
      if (descriptors.includes("skandinav")) product.attributes.push("Skandinavisch");
      product.originalPrice = product.discount ? Math.round(product.price * 1.12) : null;
      product.imageAlt = card.querySelector(".product-image")?.alt || product.name;
      product.description = card.querySelector(".card-body > p:not(.price)")?.textContent.trim() || "";
      if (addButton && !product.available) {
        addButton.disabled = true;
        addButton.textContent = "Derzeit nicht lieferbar";
      }

      card.dataset.productId = id;
      card.dataset.category = category;
      card.dataset.brand = product.brand;
      card.dataset.price = String(product.price);
      card.dataset.rating = String(product.rating);
      card.dataset.available = String(product.available);
      card.dataset.newest = String(product.newest);
      card.querySelector(".product-image")?.setAttribute("loading", "lazy");

      const visual = document.createElement("div");
      visual.className = "product-visual";
      const image = card.querySelector(".product-image");
      image?.replaceWith(visual);
      if (image) visual.append(image);

      if (product.discount) {
        const saleBadge = document.createElement("span");
        saleBadge.className = "product-sale-badge";
        saleBadge.textContent = "Demo-Angebot";
        visual.append(saleBadge);
      }

      const favoriteButton = document.createElement("button");
      favoriteButton.className = "favorite-button";
      favoriteButton.type = "button";
      favoriteButton.dataset.toggleWishlist = id;
      favoriteButton.setAttribute("aria-label", `${product.name} zur Merkliste hinzufügen`);
      favoriteButton.setAttribute("aria-pressed", "false");
      favoriteButton.textContent = "♡";
      visual.append(favoriteButton);

      const detailButton = document.createElement("button");
      detailButton.className = "button button-secondary product-detail-button";
      detailButton.type = "button";
      detailButton.dataset.openProduct = id;
      detailButton.textContent = "Details ansehen";
      addButton.insertAdjacentElement("afterend", detailButton);

      const cardBody = card.querySelector(".card-body");
      const rating = document.createElement("p");
      rating.className = "product-rating";
      const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
      rating.innerHTML = `<span aria-label="${product.rating} von 5 Sternen">${stars}</span> <strong>${product.rating.toFixed(1).replace(".", ",")}</strong> <small>(${product.reviews} Demo-Bewertungen)</small>`;
      cardBody?.querySelector(".price")?.insertAdjacentElement("beforebegin", rating);

      const fulfillment = document.createElement("p");
      fulfillment.className = product.available ? "product-fulfillment" : "product-fulfillment is-limited";
      fulfillment.textContent = product.available ? "✓ Expressversand · sofort lieferbar (Demo)" : "Bald wieder verfügbar (Demo)";
      cardBody?.querySelector(".price")?.insertAdjacentElement("beforebegin", fulfillment);

      const price = cardBody?.querySelector(".price");
      if (price && product.discount) {
        const oldPrice = document.createElement("span");
        oldPrice.className = "old-price";
        oldPrice.textContent = formatPrice(product.originalPrice);
        price.prepend(oldPrice);
      }

      grid.append(card);
      catalogIndex += 1;
    });
  });
  sourceSections.forEach((section) => section.remove());

  const brandContainer = document.querySelector("[data-brand-filters]");
  const brands = [...new Set(Object.values(products).map((product) => product.brand))].sort();
  brands.forEach((brand, index) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = brand;
    checkbox.name = "brand";
    checkbox.id = `brand-${index}`;
    label.htmlFor = checkbox.id;
    label.append(checkbox, document.createTextNode(` ${brand}`));
    brandContainer?.append(label);
  });

  const attributeContainer = document.querySelector("[data-attribute-filters]");
  const attributes = ["Ergonomisch", "Holzdesign", "Höhenverstellbar", "Kabellos", "Skandinavisch"];
  attributes.forEach((attribute, index) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = attribute;
    checkbox.name = "attribute";
    checkbox.id = `attribute-${index}`;
    label.htmlFor = checkbox.id;
    label.append(checkbox, document.createTextNode(` ${attribute}`));
    attributeContainer?.append(label);
  });

  return {
    grid,
    categoryFilter: document.querySelector("#categoryFilter"),
    priceMin: document.querySelector("#priceMin"),
    priceMax: document.querySelector("#priceMax"),
    ratingFilter: document.querySelector("#ratingFilter"),
    availabilityFilter: document.querySelector("#availabilityFilter"),
    sort: document.querySelector("#catalogSort"),
    search: document.querySelector("#catalogSearch"),
  };
}

const catalog = setupCatalog();
let activeCoupon = localStorage.getItem(couponStorageKey) || "";

function productCardMarkup(id, compact = false) {
  const product = products[id];
  if (!product) return null;
  const card = document.createElement("article");
  card.className = compact ? "engagement-card" : "product-card card";
  const openButton = document.createElement("button");
  openButton.className = "engagement-open";
  openButton.type = "button";
  openButton.dataset.openProduct = id;
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.imageAlt || product.name;
  image.loading = "lazy";
  openButton.append(image);
  const title = document.createElement("span");
  title.textContent = product.name;
  openButton.append(title);
  const price = document.createElement("strong");
  price.textContent = formatPrice(product.price);
  card.append(openButton, price);
  return card;
}

function renderEngagementShelves() {
  const wishlist = readStoredIds(wishlistStorageKey);
  document.querySelectorAll("[data-wishlist-count]").forEach((badge) => {
    badge.textContent = String(wishlist.length);
  });
  document.querySelectorAll("[data-toggle-wishlist]").forEach((button) => {
    const saved = wishlist.includes(button.dataset.toggleWishlist);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${products[button.dataset.toggleWishlist].name} ${saved ? "aus der" : "zur"} Merkliste ${saved ? "entfernen" : "hinzufügen"}`);
    button.textContent = saved ? "♥" : "♡";
  });

  const wishlistContainer = document.querySelector("[data-wishlist-items]");
  const recentContainer = document.querySelector("[data-recent-items]");
  if (!wishlistContainer || !recentContainer) return;
  wishlistContainer.replaceChildren();
  recentContainer.replaceChildren();
  wishlist.forEach((id) => {
    const card = productCardMarkup(id, true);
    if (card) wishlistContainer.append(card);
  });

  const recent = readStoredIds(recentStorageKey).slice(0, 8);
  recent.forEach((id) => {
    const card = productCardMarkup(id, true);
    if (card) recentContainer.append(card);
  });
  document.querySelector("[data-wishlist-empty]").hidden = wishlist.length > 0;
  document.querySelector("[data-recent-empty]").hidden = recent.length > 0;
}

function applyCatalogFilters() {
  if (!catalog) return;
  const query = catalog.search?.value.trim().toLocaleLowerCase("de") || "";
  const category = catalog.categoryFilter?.value || "all";
  const min = Number(catalog.priceMin?.value) || 0;
  const max = Number(catalog.priceMax?.value) || Infinity;
  const minRating = Number(catalog.ratingFilter?.value) || 0;
  const availableOnly = Boolean(catalog.availabilityFilter?.checked);
  const selectedBrands = [...document.querySelectorAll("[name=brand]:checked")].map((input) => input.value);
  const selectedAttributes = [...document.querySelectorAll("[name=attribute]:checked")].map((input) => input.value);
  const sort = catalog.sort?.value || "relevance";

  const cards = [...catalog.grid.querySelectorAll(".product-card")];
  const filtered = cards.filter((card) => {
    const product = products[card.dataset.productId];
    const searchText = `${product.name} ${product.description} ${product.brand} ${product.categoryName}`.toLocaleLowerCase("de");
    const matches = (!query || searchText.includes(query))
      && (category === "all" || product.category === category)
      && product.price >= min
      && product.price <= max
      && product.rating >= minRating
      && (!availableOnly || product.available)
      && (!selectedBrands.length || selectedBrands.includes(product.brand))
      && selectedAttributes.every((attribute) => product.attributes.includes(attribute));
    card.hidden = !matches;
    return matches;
  });

  const sorters = {
    relevance: (a, b) => b.rating - a.rating || a.newest - b.newest,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => b.newest - a.newest,
  };
  filtered.sort((a, b) => sorters[sort](products[a.dataset.productId], products[b.dataset.productId]));
  filtered.forEach((card) => catalog.grid.append(card));

  const resultCount = document.querySelector("[data-results-count]");
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "Produkt" : "Produkte"} gefunden`;
  document.querySelector("[data-no-results]").hidden = filtered.length !== 0;

  const categoryNames = {
    all: "Alle Produkte",
    desks: "Schreibtische",
    chairs: "Bürostühle",
    storage: "Aufbewahrung",
    lighting: "Beleuchtung",
    coffee: "Kaffeemaschinen",
    organization: "Organisation",
  };
  document.querySelector("[data-breadcrumb-current]").textContent = categoryNames[category];
}

function updateSearchSuggestions() {
  if (!catalog?.search) return;
  const suggestions = document.querySelector("[data-search-suggestions]");
  const query = catalog.search.value.trim().toLocaleLowerCase("de");
  suggestions.replaceChildren();
  if (query.length < 2) {
    suggestions.hidden = true;
    return;
  }

  const results = Object.entries(products)
    .filter(([, product]) => `${product.name} ${product.brand} ${product.categoryName}`.toLocaleLowerCase("de").includes(query))
    .slice(0, 5);
  results.forEach(([id, product]) => {
    const suggestion = document.createElement("button");
    suggestion.type = "button";
    suggestion.dataset.suggestion = id;
    suggestion.textContent = `${product.name} · ${formatPrice(product.price)}`;
    suggestions.append(suggestion);
  });
  suggestions.hidden = results.length === 0;
}

function initializeDiscovery() {
  if (!catalog) return;
  applyCatalogFilters();
  renderEngagementShelves();
  [catalog.categoryFilter, catalog.priceMin, catalog.priceMax, catalog.ratingFilter, catalog.availabilityFilter, catalog.sort]
    .filter(Boolean)
    .forEach((control) => control.addEventListener("input", applyCatalogFilters));
  document.querySelectorAll("[name=brand], [name=attribute]").forEach((control) => control.addEventListener("change", applyCatalogFilters));
  catalog.search?.addEventListener("input", () => {
    applyCatalogFilters();
    updateSearchSuggestions();
  });
  document.querySelector("#headerSearch")?.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("[data-search-suggestions]").hidden = true;
    applyCatalogFilters();
    document.querySelector("#produktkatalog").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("[data-search-suggestions]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-suggestion]");
    if (!button) return;
    const card = catalog.grid.querySelector(`[data-product-id="${button.dataset.suggestion}"]`);
    document.querySelector("[data-search-suggestions]").hidden = true;
    openProductDetails(button.dataset.suggestion);
    card?.scrollIntoView({ block: "nearest" });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header-search")) {
      const suggestions = document.querySelector("[data-search-suggestions]");
      if (suggestions) suggestions.hidden = true;
    }
  });
  document.querySelectorAll("[data-category-jump]").forEach((link) => {
    link.addEventListener("click", () => {
      catalog.categoryFilter.value = link.dataset.categoryJump;
      applyCatalogFilters();
    });
  });
  document.querySelectorAll("[data-clear-filters]").forEach((button) => {
    button.addEventListener("click", () => {
      catalog.search.value = "";
      catalog.categoryFilter.value = "all";
      catalog.priceMin.value = "";
      catalog.priceMax.value = "";
      catalog.ratingFilter.value = "0";
      catalog.availabilityFilter.checked = false;
      document.querySelectorAll("[name=brand], [name=attribute]").forEach((filter) => { filter.checked = false; });
      catalog.sort.value = "relevance";
      applyCatalogFilters();
    });
  });

  document.addEventListener("click", (event) => {
    const favorite = event.target.closest("[data-toggle-wishlist]");
    if (favorite) {
      const id = favorite.dataset.toggleWishlist;
      const wishlist = readStoredIds(wishlistStorageKey);
      const updated = wishlist.includes(id) ? wishlist.filter((item) => item !== id) : [id, ...wishlist];
      localStorage.setItem(wishlistStorageKey, JSON.stringify(updated));
      renderEngagementShelves();
      return;
    }
    const openButton = event.target.closest("[data-open-product]");
    if (openButton) openProductDetails(openButton.dataset.openProduct);
  });
}

function openProductDetails(id) {
  const product = products[id];
  const dialog = document.querySelector("#productDialog");
  if (!product || !dialog) return;
  document.querySelector("[data-detail-image]").src = product.image;
  document.querySelector("[data-detail-image]").alt = product.imageAlt;
  document.querySelector("[data-detail-title]").textContent = product.name;
  document.querySelector("[data-detail-category]").textContent = product.categoryName;
  document.querySelector("[data-detail-description]").textContent = product.description;
  document.querySelector("[data-detail-brand]").textContent = `Marke: ${product.brand}`;
  const detailStars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
  document.querySelector("[data-detail-rating]").textContent = `${detailStars} ${product.rating.toFixed(1).replace(".", ",")} · ${product.reviews} Demo-Bewertungen`;
  const stock = document.querySelector(".detail-stock");
  stock.replaceChildren();
  const stockIndicator = document.createElement("span");
  stockIndicator.setAttribute("aria-hidden", "true");
  stockIndicator.textContent = "●";
  const stockText = document.createTextNode(product.available ? " Sofort lieferbar " : " Derzeit nicht lieferbar ");
  const stockNote = document.createElement("small");
  stockNote.textContent = "(Demo-Bestand)";
  stock.classList.toggle("is-limited", !product.available);
  stock.append(stockIndicator, stockText, stockNote);
  document.querySelector("#detailQuantity").value = "1";
  document.querySelector("[data-detail-add]").dataset.productId = id;
  document.querySelector("[data-detail-buy]").dataset.productId = id;
  document.querySelector("[data-detail-add]").disabled = !product.available;
  document.querySelector("[data-detail-buy]").disabled = !product.available;
  document.querySelector("#detailVariant").value = "standard";
  updateDetailPrice(product);
  const thumbnails = document.querySelector("[data-detail-thumbnails]");
  thumbnails.replaceChildren();
  const thumbnail = document.createElement("button");
  thumbnail.className = "detail-thumbnail is-active";
  thumbnail.type = "button";
  thumbnail.setAttribute("aria-label", `${product.name} anzeigen`);
  const thumbnailImage = document.createElement("img");
  thumbnailImage.src = product.image;
  thumbnailImage.alt = "";
  thumbnail.append(thumbnailImage);
  thumbnails.append(thumbnail);
  thumbnail.addEventListener("click", () => {
    document.querySelector("[data-detail-image]").src = product.image;
  });

  const recent = readStoredIds(recentStorageKey).filter((item) => item !== id);
  localStorage.setItem(recentStorageKey, JSON.stringify([id, ...recent].slice(0, 8)));
  renderEngagementShelves();
  dialog.showModal();
}

function updateDetailPrice(product) {
  const variant = product.variants.find((item) => item.id === document.querySelector("#detailVariant").value);
  document.querySelector("[data-detail-price]").textContent = formatPrice(Math.round(product.price * variant.multiplier));
}

function addProductToCart(token, quantity = 1) {
  const line = getCartLine(token);
  if (!line || !line.product.available) return;
  const cart = readCart();
  for (let count = 0; count < quantity; count += 1) cart.push(line.token);
  saveCart(cart);
  renderCart();
}

function calculateTotals(cart = readCart()) {
  const subtotal = cart.reduce((sum, token) => sum + getCartLine(token).price, 0);
  const discount = activeCoupon === "WELCOME10" ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const taxableTotal = subtotal - discount;
  const shipping = taxableTotal === 0 || taxableTotal >= 1000 ? 0 : 19.9;
  const total = taxableTotal + shipping;
  const tax = total * 19 / 119;
  return { subtotal, discount, shipping, total, tax };
}

function updateCheckoutSummary() {
  const couponStatus = document.querySelector("[data-coupon-status]");
  const couponInput = document.querySelector("#couponCode");
  const discountRow = document.querySelector("[data-discount-row]");
  if (!document.querySelector("[data-cart-summary]")) return;
  const { subtotal, discount, shipping, total, tax } = calculateTotals();
  document.querySelector("[data-cart-subtotal]").textContent = formatPrice(subtotal);
  document.querySelector("[data-cart-discount]").textContent = `− ${formatPrice(discount)}`;
  document.querySelector("[data-cart-shipping]").textContent = shipping === 0 ? "Kostenlos" : formatPrice(shipping);
  document.querySelector("[data-cart-tax]").textContent = formatPrice(tax);
  document.querySelector("[data-cart-total]").textContent = formatPrice(total);
  discountRow.hidden = discount === 0;
  if (couponInput && activeCoupon) couponInput.value = activeCoupon;
  if (couponStatus && activeCoupon === "WELCOME10") couponStatus.textContent = "10 % Rabatt wurde angewendet.";
}

function startCheckout() {
  if (readCart().length === 0) return;
  const shippingForm = document.querySelector("#shippingForm");
  const paymentForm = document.querySelector("#paymentForm");
  const confirmation = document.querySelector("[data-order-confirmation]");
  shippingForm.reset();
  paymentForm.reset();
  const cardFields = paymentForm.querySelector("[data-card-fields]");
  cardFields.hidden = false;
  cardFields.querySelectorAll("input").forEach((field) => { field.required = true; });
  shippingForm.hidden = false;
  paymentForm.hidden = true;
  confirmation.hidden = true;
  document.querySelectorAll("[data-checkout-step-indicator]").forEach((step) => step.removeAttribute("aria-current"));
  document.querySelector('[data-checkout-step-indicator="shipping"]').setAttribute("aria-current", "step");
  document.querySelector("#checkoutDialog").showModal();
}

function initializeCheckout() {
  if (!document.querySelector("#paymentForm")) return;

  document.querySelector("[data-coupon-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#couponCode");
    const status = document.querySelector("[data-coupon-status]");
    if (input.value.trim().toUpperCase() !== "WELCOME10") {
      activeCoupon = "";
      localStorage.removeItem(couponStorageKey);
      status.textContent = "Der Gutscheincode ist ungültig. Probiere WELCOME10.";
      status.classList.add("is-error");
    } else {
      activeCoupon = "WELCOME10";
      localStorage.setItem(couponStorageKey, activeCoupon);
      status.classList.remove("is-error");
      status.textContent = "10 % Rabatt wurde angewendet.";
    }
    updateCheckoutSummary();
  });
  document.querySelector("[data-start-checkout]")?.addEventListener("click", startCheckout);

  const shippingForm = document.querySelector("#shippingForm");
  shippingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!shippingForm.reportValidity()) return;
    shippingForm.hidden = true;
    document.querySelector("#paymentForm").hidden = false;
    document.querySelectorAll("[data-checkout-step-indicator]").forEach((step) => step.removeAttribute("aria-current"));
    document.querySelector('[data-checkout-step-indicator="payment"]').setAttribute("aria-current", "step");
  });

  const paymentForm = document.querySelector("#paymentForm");
  const method = paymentForm?.elements.namedItem("method");
  const updatePaymentFields = () => {
    const cardFields = document.querySelector("[data-card-fields]");
    const useCard = method.value === "card";
    cardFields.hidden = !useCard;
    cardFields.querySelectorAll("input").forEach((field) => {
      field.required = useCard;
      if (!useCard) field.value = "";
    });
  };
  method?.addEventListener("change", updatePaymentFields);
  updatePaymentFields();
  document.querySelector("[data-checkout-back]")?.addEventListener("click", () => {
    paymentForm.hidden = true;
    shippingForm.hidden = false;
    document.querySelectorAll("[data-checkout-step-indicator]").forEach((step) => step.removeAttribute("aria-current"));
    document.querySelector('[data-checkout-step-indicator="shipping"]').setAttribute("aria-current", "step");
  });
  paymentForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!paymentForm.reportValidity()) return;
    const methodSelect = paymentForm.elements.namedItem("method");
    if (methodSelect.value === "card") {
      const cardNumber = paymentForm.elements.namedItem("cardNumber").value.replace(/\s/g, "");
      const expiry = paymentForm.elements.namedItem("expiry").value;
      if (!isValidCardNumber(cardNumber)) {
        document.querySelector("[data-payment-error]").textContent = "Bitte prüfe die Demo-Kartennummer.";
        return;
      }

      const [month, year] = expiry.split("/").map(Number);
      const now = new Date();
      const expiryDate = new Date(2000 + year, month);
      if (expiryDate <= new Date(now.getFullYear(), now.getMonth())) {
        document.querySelector("[data-payment-error]").textContent = "Die Karte ist abgelaufen. Bitte prüfe das Gültigkeitsdatum.";
        return;
      }
    }

    const orderId = `SG-${Date.now().toString(36).toUpperCase()}`;
    const orderTotal = calculateTotals().total;
    document.querySelector("[data-order-id]").textContent = `Bestellnummer: ${orderId}`;
    document.querySelector("[data-order-summary]").textContent = `Demo-Bestellung über ${formatPrice(orderTotal)}. Es wurde keine Zahlung ausgelöst.`;
    paymentForm.elements.namedItem("cardNumber").value = "";
    paymentForm.elements.namedItem("expiry").value = "";
    paymentForm.elements.namedItem("cvv").value = "";
    document.querySelector("[data-payment-error]").textContent = "";
    paymentForm.hidden = true;
    document.querySelector("[data-order-confirmation]").hidden = false;
    document.querySelectorAll("[data-checkout-step-indicator]").forEach((step) => step.removeAttribute("aria-current"));
    document.querySelector('[data-checkout-step-indicator="confirmation"]').setAttribute("aria-current", "step");
    saveCart([]);
    activeCoupon = "";
    localStorage.removeItem(couponStorageKey);
    renderCart();
  });
  document.querySelector("[data-close-checkout]")?.addEventListener("click", () => {
    document.querySelector("#checkoutDialog").close();
    document.querySelector("#produktkatalog").scrollIntoView({ behavior: "smooth" });
  });
}

function isValidCardNumber(cardNumber) {
  if (!/^\d{13,19}$/.test(cardNumber)) return false;
  let sum = 0;
  let doubleDigit = false;
  for (let index = cardNumber.length - 1; index >= 0; index -= 1) {
    let digit = Number(cardNumber[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

function renderCart() {
  const cart = readCart();
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(cart.length);
  });
  document.querySelectorAll(".cart-link").forEach((link) => {
    link.setAttribute("aria-label", `Warenkorb, ${cart.length} ${cart.length === 1 ? "Artikel" : "Artikel"}`);
  });

  const itemsContainer = document.querySelector("[data-cart-items]");
  const totalElement = document.querySelector("[data-cart-total]");
  const subtotalElement = document.querySelector("[data-cart-subtotal]");
  const summary = document.querySelector("[data-cart-summary]");
  const summaryCount = document.querySelector("[data-cart-summary-count]");
  if (!itemsContainer || !totalElement || !subtotalElement || !summary || !summaryCount) return;

  itemsContainer.replaceChildren();
  if (cart.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "cart-empty";

    const emptyTitle = document.createElement("h3");
    emptyTitle.textContent = "Dein Warenkorb wartet auf gute Ideen.";
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Entdecke hochwertige Ausstattung für deinen Arbeitsplatz.";
    const shopLink = document.createElement("a");
    shopLink.className = "button";
    shopLink.href = "#produktkatalog";
    shopLink.textContent = "Produkte entdecken";

    emptyState.append(emptyTitle, emptyMessage, shopLink);
    itemsContainer.append(emptyState);
    totalElement.textContent = "";
    subtotalElement.textContent = formatPrice(0);
    summary.hidden = true;
    return;
  }

  const quantities = new Map();
  cart.forEach((token) => quantities.set(token, (quantities.get(token) || 0) + 1));
  quantities.forEach((quantity, token) => {
    const line = getCartLine(token);
    const product = line.product;
    const item = document.createElement("article");
    item.className = "cart-item";
    item.dataset.cartLine = token;

    const image = document.createElement("img");
    image.className = "cart-item-image";
    image.src = product.image;
    image.alt = "";
    image.width = 96;
    image.height = 96;
    image.loading = "lazy";

    const details = document.createElement("div");
    details.className = "cart-item-details";
    const name = document.createElement("h3");
    name.textContent = line.name;
    const unitPrice = document.createElement("p");
    unitPrice.className = "cart-unit-price";
    unitPrice.textContent = `${formatPrice(line.price)} pro Stück`;
    details.append(name, unitPrice);

    const quantityControl = document.createElement("div");
    quantityControl.className = "quantity-control";
    quantityControl.setAttribute("aria-label", `Menge: ${quantity}`);

    const decreaseButton = document.createElement("button");
    decreaseButton.className = "quantity-button";
    decreaseButton.type = "button";
    decreaseButton.textContent = "−";
    decreaseButton.setAttribute("aria-label", `${line.name}: Menge verringern`);
    decreaseButton.addEventListener("click", () => {
      const itemIndex = cart.indexOf(token);
      if (itemIndex !== -1) cart.splice(itemIndex, 1);
      saveCart(cart);
      renderCart();
    });

    const quantityValue = document.createElement("span");
    quantityValue.className = "quantity-value";
    quantityValue.textContent = String(quantity);
    quantityValue.setAttribute("aria-live", "polite");

    const increaseButton = document.createElement("button");
    increaseButton.className = "quantity-button";
    increaseButton.type = "button";
    increaseButton.textContent = "+";
    increaseButton.setAttribute("aria-label", `${line.name}: Menge erhöhen`);
    increaseButton.addEventListener("click", () => {
      cart.push(token);
      saveCart(cart);
      renderCart();
    });

    quantityControl.append(decreaseButton, quantityValue, increaseButton);

    const itemTotal = document.createElement("p");
    itemTotal.className = "cart-item-total";
    itemTotal.textContent = formatPrice(line.price * quantity);

    const removeButton = document.createElement("button");
    removeButton.className = "cart-remove";
    removeButton.type = "button";
    removeButton.textContent = "Entfernen";
    removeButton.setAttribute("aria-label", `${line.name} aus dem Warenkorb entfernen`);
    removeButton.addEventListener("click", () => {
      const remainingItems = cart.filter((cartToken) => cartToken !== token);
      saveCart(remainingItems);
      renderCart();
    });

    const itemActions = document.createElement("div");
    itemActions.className = "cart-item-actions";
    itemActions.append(quantityControl, itemTotal, removeButton);
    item.append(image, details, itemActions);
    itemsContainer.append(item);
  });

  summaryCount.textContent = `${cart.length} Artikel`;
  summary.hidden = false;
  updateCheckoutSummary();
}

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.addToCart;
    if (!Object.hasOwn(products, productId)) return;

    addProductToCart(productId);
    button.textContent = "Hinzugefügt";
    window.setTimeout(() => {
      button.textContent = "In den Warenkorb";
    }, 1200);
  });
});

document.querySelector("#detailVariant")?.addEventListener("change", () => {
  const product = products[document.querySelector("[data-detail-add]").dataset.productId];
  if (product) updateDetailPrice(product);
});

document.querySelector("[data-detail-add]")?.addEventListener("click", (event) => {
  const quantity = Math.min(10, Math.max(1, Number(document.querySelector("#detailQuantity").value) || 1));
  const token = createCartToken(event.currentTarget.dataset.productId, document.querySelector("#detailVariant").value);
  addProductToCart(token, quantity);
  document.querySelector("#productDialog").close();
  document.querySelector("#warenkorb").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("[data-detail-buy]")?.addEventListener("click", (event) => {
  const quantity = Math.min(10, Math.max(1, Number(document.querySelector("#detailQuantity").value) || 1));
  const token = createCartToken(event.currentTarget.dataset.productId, document.querySelector("#detailVariant").value);
  addProductToCart(token, quantity);
  document.querySelector("#productDialog").close();
  startCheckout();
});

initializeDiscovery();
initializeCheckout();

const contactForm = document.querySelector("#kontaktForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#formStatus");
    status.textContent = "Das Formular ist noch nicht mit einem E-Mail-Dienst verbunden. Es wurde keine Nachricht versendet.";
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const authAction = document.querySelector("[data-auth-action]");
const loggedInUser = localStorage.getItem(authStorageKey);
if (authAction && loggedInUser) {
  const logoutButton = document.createElement("button");
  logoutButton.className = "nav-auth-link";
  logoutButton.type = "button";
  logoutButton.textContent = "Abmelden";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(authStorageKey);
    window.location.href = "login.html";
  });
  authAction.replaceWith(logoutButton);
}

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value;
    const status = document.querySelector("#loginStatus");

    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem(authStorageKey, email);
      window.location.href = "index.html";
      return;
    }

    status.textContent = "E-Mail-Adresse oder Passwort ist falsch. Bitte versuche es erneut.";
  });
}

renderCart();
