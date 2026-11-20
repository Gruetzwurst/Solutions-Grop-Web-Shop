# Browserprüfungen für den gemeinsamen Warenkorb

Voraussetzungen: Node.js mit `node:test`, Python und Playwright mit Chromium.

Im Repository-Verzeichnis:

1. Einmalig `npm install --no-save playwright` und `npx playwright install chromium` ausführen.
2. `python -m http.server 8770` starten.
3. In einem zweiten Terminal `node --test tests/warenkorb.test.cjs` ausführen.

Optional: `SG_CART_BASE_URL` ändert die Basisadresse; `SG_CHROMIUM_PATH` wählt eine vorhandene Chromium-Installation.

Die Tests prüfen den leeren Warenkorb auf allen Seiten, bestehende Möbel-Auswahlen und Varianten, Mengen und Summen, getrennte Anfragen, den Demo-Checkout, den Demo-Gutschein, mobile Darstellung, Tastaturbedienung, Aktualisierung zwischen Tabs und beschädigte lokale Speicherdaten. Alle Eingaben sind Testdaten. Bestellungen und Anfragen bleiben reine Demos.
