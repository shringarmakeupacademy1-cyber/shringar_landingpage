# Shringar Makeup Academy Website

This archive is a complete backup of the current Shringar Makeup Academy website. The production-ready static website is inside the `dist/` folder. The root-level files are the editable source copy.

## Fast deployment on normal hosting

1. Open the `dist/` folder.
2. Upload **all files and folders inside `dist/`** to your domain's public web directory.
   - Hostinger/cPanel commonly uses `public_html/`.
   - Other hosts may call it `www/`, `htdocs/`, or the site's document root.
3. Ensure `index.html` is directly inside that public directory, not inside an extra `dist` folder.
4. Connect the domain to the hosting provider and enable SSL/HTTPS.
5. Open the domain and test navigation, the three brochure downloads, all four student videos, WhatsApp links, and the call button.

No database, server runtime, build command, package manager, or ChatGPT Sites connection is required. This is a static HTML/CSS/JavaScript website.

## Local preview

You can open `dist/index.html` directly in a browser. For the most accurate preview, serve the folder with any static web server, for example:

```bash
python3 -m http.server 8080 --directory dist
```

Then open `http://localhost:8080`.

## File structure

- `dist/index.html` - deployment-ready page
- `dist/styles.css` - design and responsive styling
- `dist/script.js` - navigation, animations, course modals, enquiry form, and testimonial video player
- `dist/assets/` - all website images, posters, four feedback videos, and three PDF brochures
- `dist/raw_contact.jpg` - contact-section image asset
- Root `index.html`, `styles.css`, `script.js`, `assets/`, and `raw_contact.jpg` - editable source copy
- `.openai/hosting.json` - original Sites configuration retained only as backup metadata; it is not required on independent hosting

## Updating the website later

Edit the root source files, then copy the updated files into `dist/` before uploading. Keep relative paths and the `assets/` folder structure unchanged so images, brochures, and videos continue to work.

The website currently loads its two display fonts from Google Fonts. If a visitor blocks Google Fonts, the included CSS automatically uses standard fallback fonts; the website remains functional.
