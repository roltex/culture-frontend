# Cultural Institution Website - Frontend

A modern Vue.js frontend for the cultural institution website, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Vue.js 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **Vue I18n** for internationalization (Georgian/English)
- **Axios** for API communication
- **Swiper** for carousels and sliders
- **Responsive design** for all devices

## 🛠️ Tech Stack

- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Vue Query (TanStack Query)
- **Routing**: Vue Router 4
- **Internationalization**: Vue I18n
- **HTTP Client**: Axios
- **UI Components**: Custom components with Swiper

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://culture-backend.up.railway.app/api/v1

# For local development:
# VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import this repository to Vercel
   - Vercel will auto-detect Vue.js/Vite configuration

2. **Environment Variables**
   - Add `VITE_API_BASE_URL` with your backend URL

3. **Deploy**
   - Vercel will automatically build and deploy

### Manual Deployment

```bash
# Build the project
npm run build

# The built files will be in the `dist` directory
# Upload these files to your hosting provider
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Vue components
│   ├── home/       # Home page components
│   ├── institutions/ # Institution components
│   ├── layout/     # Layout components
│   ├── news/       # News components
│   └── projects/   # Project components
├── composables/    # Vue composables
├── i18n/          # Internationalization
├── plugins/       # Vue plugins
├── router/        # Vue Router configuration
├── services/      # API services
├── utils/         # Utility functions
├── views/         # Page components
├── App.vue        # Root component
└── main.ts        # Application entry point
```

## 🌐 API Integration

The frontend connects to a Laravel backend API with the following endpoints:

- **News**: `/api/v1/news`
- **Projects**: `/api/v1/projects`
- **Competitions**: `/api/v1/competitions`
- **Institutions**: `/api/v1/subordinate-institutions`
- **Vacancies**: `/api/v1/vacancies`
- **Legislation**: `/api/v1/legislation`

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom components** for specific UI elements
- **Responsive design** for mobile, tablet, and desktop
- **Dark mode support** (if needed)

## 🔧 Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🌍 Internationalization

Supports multiple languages:
- **Georgian** (ka) - Default
- **English** (en)

Language switching is available throughout the application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Backend API**: https://culture-backend.up.railway.app
- **Admin Panel**: https://culture-backend.up.railway.app/admin
- **API Documentation**: https://culture-backend.up.railway.app/docs
