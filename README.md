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


## Supabase connection (static HTML website)

This project remains a static HTML/CSS/JavaScript site. It does not need Next.js.

1. Open `supabase-config.js`.
2. Replace `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE` with your Supabase Project URL.
3. Replace `PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE` with the Supabase **Publishable key** (or legacy `anon` key).
4. Save the file and publish the updated project through your existing GitHub → Cloudflare Pages workflow.

Only use the publishable/anon key in this browser configuration. Never put a `sb_secret_...` or `service_role` key in any website file.

The site will try to read active rows from `public.products`. Its Row Level Security policy must allow public `SELECT` of active products. If the table is empty, the site continues to show the sample catalogue. If the connection fails, the site also falls back to the sample catalogue.

### Important current limitations

- This update only connects the public product catalogue for read access.
- It does not submit customer orders, store customer details, provide an admin panel, or process payments.
- Do not accept real orders or payments yet. Those features need a server-side order function, validation of prices and quantities, and carefully designed security policies first.
- The example products and prices remain illustrative, not confirmed stock or offers.
