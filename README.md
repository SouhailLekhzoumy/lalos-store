# LALOS — website starter

A responsive, static catalogue website for the LALOS lifestyle concept.

## Included
- Premium black, white and beige visual direction
- Responsive desktop and mobile layout
- Fashion, Gadgets, Accessories and Fragrance category filters
- Sample catalogue cards (not real products)
- Email enquiry links (replace the placeholder email)
- No checkout, payment collection, customer database or backend

## Preview locally
1. Download and unzip this folder.
2. Open `index.html` in a browser.
3. Edit `script.js` to change the sample products and image URLs.
4. Edit `styles.css` to change the design.

## Before publishing
- Replace `hello@lalos.example` in `index.html` and `script.js` with an email address you control.
- Replace sample products, descriptions and images with products you actually offer and have rights to advertise.
- Remove any sample claims that don't match your real business.
- Add your legal business information, privacy/cookie information, terms, delivery and returns details as appropriate for your business and applicable law.
- The newsletter form is a visual placeholder; it does not collect or store emails.
- The current site is a catalogue preview only. It does not take orders or payments.

## Free hosting with Cloudflare Pages
Recommended route:
1. Create a GitHub account at https://github.com/
2. Create a new repository, e.g. `lalos-store`.
3. Upload the contents of this folder to the repository root (not the enclosing folder).
4. Create a Cloudflare account at https://dash.cloudflare.com/
5. In Cloudflare, open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
6. Connect GitHub, select `lalos-store`, and configure:
   - Framework preset: **None**
   - Build command: leave blank
   - Build output directory: `/` (or `.` if the interface requires a relative path)
7. Deploy. Cloudflare will provide a `*.pages.dev` address.
8. Later edits pushed to GitHub can automatically trigger a new deployment.

Cloudflare Pages documentation:
https://developers.cloudflare.com/pages/get-started/git-integration/
https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Important hosting note
Use Cloudflare Pages for this static catalogue. GitHub Pages' terms say it is not intended for sites primarily facilitating commercial transactions, so don't use GitHub Pages as the live host for a commercial storefront.

## Suggested next steps
1. Replace sample product data.
2. Add genuine product photography.
3. Connect a proper enquiry form service if you need form submissions.
4. When ready, add a compliant ecommerce backend and payment provider. Do not collect card details directly in this static site.
