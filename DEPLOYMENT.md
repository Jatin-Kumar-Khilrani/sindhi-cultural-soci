# Sindhi Cultural Society Website - Production Deployment Guide

## Overview
This is a multilingual cultural organization website for Sindhi Cultural Society, Jodhpur. It supports English, Hindi, and Sindhi languages with a secure admin panel for content management.

## Features
- ✅ Multilingual support (English, Hindi, Sindhi)
- ✅ Secure admin authentication
- ✅ Dynamic content management (Leadership, Events, Publications, Videos, Annual Reports)
- ✅ Social media integration (Facebook)
- ✅ Donation platform integration (Benevity)
- ✅ Responsive design for mobile and desktop
- ✅ YouTube video gallery
- ✅ Newspaper publications showcase
- ✅ Annual reports section

## Admin Panel

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately after first login via Admin Panel → Settings tab.

### Admin Features
1. **Leadership Management**: Add/edit/remove office bearers with photos, contact info
2. **Events Management**: Create and manage cultural events, workshops, and programs
3. **Publications**: Add newspaper articles and press coverage
4. **Annual Reports**: Upload yearly reports
5. **Videos**: Manage YouTube video gallery
6. **Site Settings**: Configure admin credentials, social media links, donation links, and logo

### Adding Leader Photos
1. Upload your photo to a free image hosting service:
   - [Imgur](https://imgur.com) (recommended)
   - [ImgBB](https://imgbb.com)
   - Or use any direct image URL
2. Copy the direct image URL
3. In Admin Panel → Leadership → Photo URL field, paste the URL
4. Preview will show immediately

### Position Names
- Use "President" (English) - automatically translates to "Adhyaksh" in Hindi/Sindhi
- Use "Vice President" (English) - automatically translates accordingly
- Use "Secretary" (English) - automatically translates accordingly

## Pre-configured Information

### Organization Details
- **Name**: Sindhi Cultural Society
- **Location**: Jodhpur, Rajasthan
- **Founded**: 1982
- **Registered**: 1984
- **Address**: 17 E/70 Chopasani Housing Board, Jodhpur – 342008
- **Phone**: 9414411805
- **Email**: sindhicultural@gmail.com
- **PAN**: AAATS8265M

### Affiliations
- Central Sahitya Akademi, New Delhi
- Rajasthan Sangeet Natak Akademi, Jodhpur
- Rajasthan Sindhi Akademi, Jaipur
- Ministry of Culture, Government of India

### Social Links
- **Facebook**: https://www.facebook.com/share/p/PWAzvbuxp9VD7WS9/?mibextid=Nif5oz
- **YouTube**: https://www.youtube.com/@sindhiculturalsocietyjodhp7658
- **Benevity (Donations)**: https://benevity.com

## Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui v4
- **Icons**: Phosphor Icons
- **Persistence**: Azure Cosmos DB
- **Animations**: Framer Motion
- **Notifications**: Sonner (toast)

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy

### Option 2: Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Framework preset: Vite
4. Deploy

### Option 3: GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. Use the provided workflow (see below)

#### GitHub Pages Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Environment Configuration

The application stores all data in Azure Cosmos DB. See `AZURE_SETUP.md` for setup instructions.

### Required Environment Variables
- `VITE_COSMOS_ENDPOINT`: Your Cosmos DB endpoint URL
- `VITE_COSMOS_KEY`: Your Cosmos DB access key
- `VITE_COSMOS_DATABASE`: Database name (default: sindhi-cultural-db)
- `VITE_COSMOS_CONTAINER`: Container name (default: kv-store)

## Security Considerations

1. **Change Admin Credentials**: The default admin username/password should be changed immediately
2. **HTTPS**: Always deploy with HTTPS enabled (automatic on Netlify/Vercel)
3. **Content Security**: Admin panel requires authentication before any modifications
4. **Data Persistence**: All data is stored in Azure Cosmos DB

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

## Multilingual Content

The website automatically translates UI elements based on language selection. Content entered in the admin panel (events, publications, etc.) should be entered in the desired language. Consider:

1. Adding events/content in all three languages separately
2. Using English titles with local language descriptions
3. Keeping names and proper nouns in their original script

## Troubleshooting

### YouTube Videos Not Loading
- Ensure video IDs are correct (the part after `watch?v=` in YouTube URL)
- Example: For `https://www.youtube.com/watch?v=ABC123`, use `ABC123`

### Images Not Displaying
- Verify image URLs are direct links (end in .jpg, .png, etc.)
- Ensure image hosting service allows embedding
- Check browser console for CORS errors

### Admin Login Not Working
- Clear browser cache and localStorage
- Verify credentials in Admin Panel → Settings
- Check browser console for errors

## Support & Maintenance

For technical issues or questions:
- Email: sindhicultural@gmail.com
- Phone: 9414411805

## License

Copyright © 2024 Sindhi Cultural Society, Jodhpur. All rights reserved.

The technical implementation uses open-source libraries as listed in `package.json`.
