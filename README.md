# José Daniel Gómez - Professional Landing Page

A modern, responsive personal landing page with bilingual support (English/Spanish).

## Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Bilingual support (English/Spanish) with language toggle
- ✅ Smooth scroll animations
- ✅ Modern, minimalist design
- ✅ Professional color scheme
- ✅ SEO-friendly structure

## Files Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality (language toggle, animations, smooth scrolling)

## How to Customize

### 1. Updating Text Content

All text content has bilingual support using `data-en` and `data-es` attributes. To update:

**Example:**
```html
<p data-en="Your English text here" data-es="Tu texto en español aquí">
    Your English text here
</p>
```

Simply replace the text within the `data-en` and `data-es` attributes. The JavaScript will automatically update the displayed text when the language is toggled.

### 2. Changing Color Theme

Edit the CSS variables in `styles.css` at the top of the file:

```css
:root {
    --color-primary: #2563eb;        /* Main blue accent */
    --color-primary-dark: #1e40af;   /* Darker blue for hover */
    --color-primary-light: #3b82f6;  /* Lighter blue variant */
    --color-text: #1f2937;           /* Main text color */
    --color-text-light: #6b7280;     /* Secondary text color */
    --color-bg: #ffffff;              /* Background color */
    --color-bg-alt: #f9fafb;         /* Alternate section background */
}
```

Change these values to match your preferred color scheme.

### 3. Updating Contact Information

**Email:**
- Update the email in `script.js` (line ~200): `const email = 'your.email@example.com';`
- Also update the email display in `index.html` (line ~200): `jose.daniel.gomez@example.com`

**LinkedIn:**
- The LinkedIn link is already set to: `https://www.linkedin.com/in/josedanielgomez1/`
- To change it, update the `href` attribute in the contact section of `index.html`

### 4. Customizing Fonts

The page uses Google Fonts (Inter). To change:

1. Update the Google Fonts link in `index.html` `<head>` section
2. Update `--font-family` in `styles.css` CSS variables

### 5. Adding/Removing Sections

1. Add new section in `index.html` with a unique `id`
2. Add corresponding navigation link in the navbar
3. Style the new section in `styles.css`
4. Add bilingual text using `data-en` and `data-es` attributes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.
