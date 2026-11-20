(() => {
  'use strict';
  const requestKey = 'solutions-group-requests';
  const offers = {
    'event-team': { area: 'Eventmanagement', name: 'Team-Moment' },
    'event-business': { area: 'Eventmanagement', name: 'Business-Event' },
    'event-complete': { area: 'Eventmanagement', name: 'Event-Komplett' },
    'shop-start': { area: 'Webshop', name: 'Shop-Start' },
    'shop-business': { area: 'Webshop', name: 'Shop-Business' },
    'shop-plus': { area: 'Webshop', name: 'Shop-Plus' },
  };
  const cartDialog = document.querySelector('#sharedCartDialog');
  const requestDialog = document.querySelector('#requestDialog');
  const content = document.querySelector('[data-shared-cart-content]');
  const requestForm = document.querySelector('#requestForm');
  let originTrigger = null;

  function readRequests() {
    try {
      const saved = JSON.parse(localStorage.getItem(requestKey) || '[]');
      return Array.isArray(saved) ? [...new Set(saved.filter(id => Object.hasOwn(offers, id)))] : [];
    } catch { return []; }
  }
  function saveRequests(ids) {
    localStorage.setItem(requestKey, JSON.stringify(ids));
    render();
  }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(label, ariaLabel, action, className = 'sg-cart-text-button') {
    const node = element('button', label, className);
    node.type = 'button';
    node.setAttribute('aria-label', ariaLabel);
    node.addEventListener('click', action);
    return node;
  }
  function closeCart() { cartDialog.close(); }
  function openCart(trigger) {
    if (document.querySelector('dialog[open]')) return;
    originTrigger = trigger || document.querySelector('[data-open-cart]');
    render();
    cartDialog.showModal();
    document.querySelectorAll("[data-open-cart]").forEach(node => node.setAttribute("aria-expanded", "true"));
  }
  function updateFurniture(token, change) {
    const cart = readCart();
    if (change === 'remove') saveCart(cart.filter(item => item !== token));
    else if (change > 0) {
      if (cart.filter(item => item === token).length < 99) cart.push(token);
      saveCart(cart);
    } else {
      const i = cart.indexOf(token);
      if (i !== -1) cart.splice(i, 1);
      saveCart(cart);
    }
    renderCart();
  }
  function openRequest() {
    const ids = readRequests();
    if (!ids.length) return;
    closeCart();
    requestForm.reset();
    document.querySelector('#requestStatus').textContent = '';
    document.querySelector('#requestSelection').value = ids.map(id => `${offers[id].area}: ${offers[id].name}`).join('\n');
    requestDialog.showModal();
  }
  function addTotal(parent, label, value, attribute) {
    const row = element('p', undefined, 'sg-cart-total-row');
    const amount = element('strong', value);
    if (attribute) amount.setAttribute(attribute, '');
    row.append(element('span', label), amount);
    parent.append(row);
  }
  function render() {
    const cart = readCart();
    const requests = readRequests();
    const count = cart.length + requests.length;
    document.querySelectorAll('[data-cart-count]').forEach(badge => { badge.textContent = String(count); });
    document.querySelectorAll('[data-open-cart]').forEach(trigger => {
      trigger.setAttribute('aria-label', `Warenkorb: ${cart.length} Artikel und ${requests.length} Anfragen`);
      trigger.setAttribute('aria-expanded', String(cartDialog.open));
    });
    document.querySelectorAll('[data-request-package]').forEach(trigger => {
      const selected = requests.includes(trigger.dataset.requestPackage);
      trigger.setAttribute('aria-pressed', String(selected));
      trigger.textContent = selected ? 'Für Anfrage vorgemerkt ✓' : 'Für Anfrage vormerken';
    });
    const focusTarget = cartDialog.contains(document.activeElement) ? document.activeElement.dataset.cartControl : null;
    content.replaceChildren();
    if (!count) {
      const empty = element('div', undefined, 'sg-cart-empty');
      empty.append(element('h3', 'Dein Warenkorb wartet auf gute Ideen'), element('p', 'Entdecke Büroeinrichtung und merke dir passende Pakete für Events und Webshops vor.'));
      const shop = element('a', 'Produkte entdecken', 'button');
      shop.href = 'produkte.html?v=warenkorb-1#produktkatalog';
      shop.setAttribute('data-cart-shop', '');
      empty.append(shop);
      content.append(empty);
      if (focusTarget) cartDialog.querySelector("[data-close-shared-cart]").focus({preventScroll: true});
      return;
    }
    if (cart.length) {
      const section = element('section', undefined, 'sg-cart-section');
      section.setAttribute('data-cart-furniture', '');
      section.setAttribute('aria-labelledby', 'sg-furniture-title');
      const title = element('h3', 'Deine Büroeinrichtung'); title.id = 'sg-furniture-title'; section.append(title);
      const quantities = new Map();
      cart.forEach(token => quantities.set(token, (quantities.get(token) || 0) + 1));
      quantities.forEach((quantity, token) => {
        const line = getCartLine(token);
        const row = element('article', undefined, 'sg-cart-row');
        row.setAttribute('data-cart-furniture-row', '');
        const image = element('img');
        image.src = line.product.image; image.alt = ''; image.width = 64; image.height = 64; image.loading = 'lazy';
        const details = element('div', undefined, 'sg-cart-row-copy');
        details.append(element('h4', line.name), element('p', `${formatPrice(line.price)} pro Stück`));
        const controls = element('div', undefined, 'sg-cart-controls');
        const minus = button('−', `${line.name}: Menge verringern`, () => updateFurniture(token, -1), 'sg-cart-quantity-button');
        const plus = button('+', `${line.name}: Menge erhöhen`, () => updateFurniture(token, 1), 'sg-cart-quantity-button');
        plus.disabled = quantity >= 99;
        const qty = element('span', String(quantity)); qty.setAttribute('data-cart-quantity', '');
        minus.setAttribute('data-cart-decrease', ''); plus.setAttribute('data-cart-increase', '');
        minus.dataset.cartControl = `decrease:${token}`; plus.dataset.cartControl = `increase:${token}`;
        const remove = button('Entfernen', `${line.name} aus dem Warenkorb entfernen`, () => updateFurniture(token, 'remove'));
        remove.setAttribute('data-cart-remove-product', ''); remove.dataset.cartControl = `remove:${token}`;
        controls.append(minus, qty, plus, element('strong', formatPrice(line.price * quantity)), remove);
        details.append(controls); row.append(image, details); section.append(row);
      });
      const coupon = element('details', undefined, 'sg-cart-coupon');
      coupon.open = Boolean(activeCoupon);
      coupon.append(element('summary', 'Gutscheincode (Demo)'));
      const couponForm = element('form');
      const label = element('label', 'Gutscheincode'); label.htmlFor = 'sharedCoupon';
      const input = element('input'); input.id = 'sharedCoupon'; input.name = 'coupon'; input.autocomplete = 'off'; input.value = activeCoupon;
      const apply = element('button', 'Einlösen', 'sg-dialog-close'); apply.type = 'submit';
      const status = element('p', activeCoupon ? '10 % Rabatt wurde angewendet.' : ''); status.setAttribute('role', 'status'); status.setAttribute('data-common-coupon-status', '');
      couponForm.append(label, input, apply, status); coupon.append(couponForm); section.append(coupon);
      couponForm.addEventListener('submit', event => {
        event.preventDefault();
        if (input.value.trim().toUpperCase() !== 'WELCOME10') {
          activeCoupon = ''; localStorage.removeItem(couponStorageKey); render();
          const details = content.querySelector('.sg-cart-coupon'); details.open = true;
          content.querySelector('[data-common-coupon-status]').textContent = 'Der Gutscheincode ist ungültig. Probiere WELCOME10.';
        } else {
          activeCoupon = 'WELCOME10'; localStorage.setItem(couponStorageKey, activeCoupon); render();
        }
      });
      const totals = calculateTotals(cart);
      addTotal(section, 'Zwischensumme Büroeinrichtung', formatPrice(totals.subtotal), 'data-cart-subtotal-value');
      if (totals.discount) addTotal(section, 'Rabatt auf Büroeinrichtung', `− ${formatPrice(totals.discount)}`);
      addTotal(section, 'Versand', totals.shipping ? formatPrice(totals.shipping) : 'Kostenlos');
      addTotal(section, 'Gesamtsumme Büroeinrichtung', formatPrice(totals.total), 'data-cart-furniture-total');
      const checkout = button('Zur Bestellung (Demo)', 'Zur Bestellung (Demo)', () => { closeCart(); startCheckout(); }, 'button');
      checkout.setAttribute('data-common-checkout', '');
      section.append(checkout, element('p', 'Bestellungen und Zahlungen werden hier nur simuliert.', 'sg-cart-note'));
      content.append(section);
    }
    if (requests.length) {
      const section = element('section', undefined, 'sg-cart-section');
      section.setAttribute('data-cart-requests', '');
      section.setAttribute('aria-labelledby', 'sg-request-title');
      const title = element('h3', 'Deine Anfragen'); title.id = 'sg-request-title';
      section.append(title, element('p', 'Unverbindlich vorgemerkt. Die Beispielpreise der Pakete werden nicht zur Möbelsumme addiert. Der endgültige Preis wird persönlich abgestimmt.', 'sg-cart-note'));
      requests.forEach(id => {
        const row = element('article', undefined, 'sg-request-row'); row.setAttribute('data-cart-request-row', '');
        const copy = element('div'); copy.append(element('h4', offers[id].name), element('p', offers[id].area));
        const remove = button('Entfernen', `${offers[id].name} aus den Anfragen entfernen`, () => saveRequests(readRequests().filter(item => item !== id)));
        remove.setAttribute('data-cart-remove-request', ''); remove.dataset.cartControl = `request:${id}`;
        row.append(copy, remove); section.append(row);
      });
      const inquiry = button('Anfrage stellen', 'Anfrage stellen', openRequest, 'button');
      inquiry.setAttribute('data-common-request', ''); section.append(inquiry); content.append(section);
    }
    if (focusTarget) {
      const next = [...content.querySelectorAll('[data-cart-control]')].find(node => node.dataset.cartControl === focusTarget);
      (next || cartDialog.querySelector('[data-close-shared-cart]')).focus({preventScroll: true});
    }
  }
  document.querySelectorAll('[data-open-cart]').forEach(trigger => trigger.addEventListener('click', () => openCart(trigger)));
  cartDialog.querySelector('[data-close-shared-cart]').addEventListener('click', closeCart);
  cartDialog.addEventListener('close', () => {
    document.querySelectorAll('[data-open-cart]').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    originTrigger?.focus({preventScroll: true});
  });
  cartDialog.addEventListener('click', event => {
    if (event.target !== cartDialog) return;
    const rect = cartDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeCart();
  });
  requestDialog.querySelector('[data-close-request]').addEventListener('click', () => requestDialog.close());
  requestDialog.addEventListener('close', () => { document.querySelector('[data-open-cart]')?.focus({preventScroll: true}); });
  requestForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;
    document.querySelector('#requestStatus').textContent = 'Deine Demo-Anfrage wurde geprüft. Es wurde keine Nachricht versendet und keine Buchung ausgelöst. Deine vorgemerkten Pakete bleiben erhalten.';
  });
  document.querySelectorAll('[data-request-package]').forEach(trigger => trigger.addEventListener('click', () => {
    const id = trigger.dataset.requestPackage;
    if (!Object.hasOwn(offers, id)) return;
    const ids = readRequests();
    if (!ids.includes(id)) saveRequests([...ids, id]);
    const status = document.querySelector('[data-package-status]');
    if (status) status.textContent = `${offers[id].name} ist für deine Anfrage vorgemerkt. Du findest die Auswahl oben im Warenkorb.`;
  }));
  window.addEventListener('sg:cart-change', render);
  window.addEventListener('storage', event => {
    if ([storageKey, requestKey, couponStorageKey, null].includes(event.key)) {
      if (event.key === couponStorageKey || event.key === null) activeCoupon = localStorage.getItem(couponStorageKey) || '';
      render();
    }
  });
  window.SGCart = { open: () => openCart(), render };
  render();
  if (location.hash === '#warenkorb') openCart();
})();
