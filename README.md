# 7339 Alabama Ave — Home Listing Site

A static single-page website promoting the sale of 7339 Alabama Ave, Canoga Park, CA 91303.

## Structure

- `index.html` — page content
- `style.css` — styling
- `script.js` — photo gallery + lightbox, contact form submission
- `images/` — property photos

## Setup before deploying

The contact form posts to Formspree. Before going live:

1. Create a free account at [formspree.io](https://formspree.io) using OLegGapanovich@gmail.com.
2. Create a new form and copy its endpoint ID.
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` attribute with the real ID.

## Hosting (GitHub Pages)

1. Push this repo to GitHub.
2. In the repo settings, enable **Pages**, serving from the `main` branch root.
3. The site will be live at `https://<username>.github.io/<repo>/`.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static file server.
