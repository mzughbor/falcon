# Falcon of Codes - Landing Page

A modern, neobrutalism-styled landing page for Falcon of Codes, built with HTML, CSS, and JavaScript.

## Features

- 🎨 Neobrutalism UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and lightweight
- 🔍 SEO optimized
- 🎯 Dynamic service pages from JSON data
- ✨ Smooth animations and interactions

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the settings and deploy

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Drag and drop your project folder
4. Vercel will automatically deploy

## Project Structure

```
FALCON-site/
├── index.html          # Main landing page
├── service.html        # Service detail page template
├── styles.css          # Main stylesheet
├── service.css         # Service page styles
├── script.js           # Main JavaScript (includes services data)
├── service.js          # Service page JavaScript
├── services.json       # Services data (reference only, data is in JS files)
├── vercel.json         # Vercel configuration
└── assets/             # Images and logos
```

## Configuration

### Update Domain URLs

After deployment, update these URLs in `index.html`:

- Line 14, 20: Update Open Graph and Twitter image URLs to your domain
- Line 22: Update canonical URL to your domain
- Line 34: Update logo URL in structured data

Example:
```html
<meta property="og:image" content="https://yourdomain.com/Logo-Test-2-.png">
<link rel="canonical" href="https://yourdomain.com/">
```

## Performance

- HTML: ~11KB
- CSS: ~11KB
- JavaScript: ~10KB
- Total: ~32KB (excluding images)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Falcon of Codes. All rights reserved.

