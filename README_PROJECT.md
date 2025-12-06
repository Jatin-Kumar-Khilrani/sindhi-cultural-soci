# Sindhi Cultural Society Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, multilingual website for Sindhi Cultural Society, Jodhpur - a registered cultural organization dedicated to preserving and promoting Indian culture, art, and the Sindhi language.

![Website Preview](https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=Sindhi+Cultural+Society+Jodhpur)

## ✨ Features

- 🌐 **Multilingual Support**: English, Hindi, and Sindhi
- 🎭 **Dynamic Content Management**: Admin panel for managing all content
- 📱 **Fully Responsive**: Works beautifully on desktop, tablet, and mobile
- 🔒 **Secure Admin Panel**: Password-protected content management
- 🎬 **YouTube Integration**: Embedded video gallery
- 📰 **Publications Showcase**: Display newspaper articles and press coverage
- 📊 **Annual Reports**: Share yearly achievements and activities
- 👥 **Leadership Board**: Showcase your team with photos and contact info
- 🎪 **Events Management**: Display upcoming and past cultural events
- 💰 **Donation Integration**: Easy integration with Benevity
- 📱 **Social Media Links**: Facebook and YouTube integration

## 🚀 Quick Start

### For Administrators (Non-Technical)

If you just want to manage content on an already-deployed website:

1. Navigate to your website
2. Click the **Admin** button (gear icon) in the header
3. Login with your credentials
4. Start adding content!

📖 **Read the [Getting Started Guide](GETTING_STARTED.md)** for step-by-step instructions.

### For Developers

#### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

#### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sindhi-cultural-society.git

# Navigate to the project directory
cd sindhi-cultural-society

# Install dependencies
npm install

# Start the development server
npm run dev
```

The website will be available at `http://localhost:5173`

#### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 📚 Documentation

- **[Getting Started Guide](GETTING_STARTED.md)** - First-time setup and basic usage
- **[Deployment Guide](DEPLOYMENT.md)** - How to deploy to various hosting platforms
- **[Image Upload Guide](IMAGE_UPLOAD_GUIDE.md)** - How to add images to your content
- **[PRD.md](PRD.md)** - Product requirements and design philosophy

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui v4
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion
- **Data Persistence**: Azure Cosmos DB
- **Forms**: React Hook Form
- **Notifications**: Sonner

## 📋 Default Content

The website comes pre-configured with:

- Organization name: Sindhi Cultural Society
- Location: Jodhpur, Rajasthan
- Founded: 1982, Registered: 1984
- Contact: 9414411805, sindhicultural@gmail.com
- PAN: AAATS8265M

All of this information can be updated through the admin panel.

## 🔐 Admin Panel

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately after deployment!

### Admin Features
- ✅ Manage leadership team members
- ✅ Create and edit events
- ✅ Add YouTube videos to gallery
- ✅ Upload newspaper publications
- ✅ Manage annual reports
- ✅ Configure site settings (logo, social links, credentials)

## 🌍 Multilingual Support

The website supports three languages:

| Language | Code | Status |
|----------|------|--------|
| English | en | ✅ Default |
| Hindi | hi | ✅ Complete |
| Sindhi | sd | ✅ Complete |

Users can switch languages using the dropdown in the header. All UI elements translate automatically.

## 📱 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## 🚀 Deployment

This website can be deployed to:

- **Netlify** (Recommended) - Zero configuration
- **Vercel** - Automatic deployments
- **GitHub Pages** - Free hosting
- **Any static hosting service**

See the [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/sindhi-cultural-society)

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛️ About Sindhi Cultural Society

Sindhi Cultural Society, Jodhpur is a registered cultural organization established in 1982 and registered under the Societies Registration Act in 1984. The society is affiliated with:

- Central Sahitya Akademi, New Delhi
- Rajasthan Sangeet Natak Akademi, Jodhpur
- Rajasthan Sindhi Akademi, Jaipur
- Ministry of Culture, Government of India

### Mission

To preserve and promote Indian culture, art, and the Sindhi language through theatre, workshops, and cultural programs. We empower youth with cultural values and skills, enrich students with knowledge about theatre, dance, and music, and foster environmental and social consciousness through community activities.

## 📞 Contact

**Sindhi Cultural Society**
- 📍 Address: 17 E/70 Chopasani Housing Board, Jodhpur – 342008
- 📞 Phone: 9414411805
- 📧 Email: sindhicultural@gmail.com
- 🌐 Facebook: [Visit our page](https://www.facebook.com/share/p/PWAzvbuxp9VD7WS9/?mibextid=Nif5oz)
- 📺 YouTube: [@sindhiculturalsocietyjodhp7658](https://www.youtube.com/@sindhiculturalsocietyjodhp7658)

## 💝 Support Us

You can support our cultural mission through:
- [Benevity](https://benevity.com) - Corporate donation matching
- Direct donations (PAN: AAATS8265M)
- Attending our cultural events and workshops
- Volunteering your time and skills

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Phosphor Icons](https://phosphoricons.com/)
- Deployed with [Netlify](https://netlify.com)

---

Made with ❤️ for preserving and promoting Indian culture

© 2024 Sindhi Cultural Society, Jodhpur. All rights reserved.
