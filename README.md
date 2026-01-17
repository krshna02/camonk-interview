# CA Monk Blog Application 📝

A modern, responsive blog application built with React, TypeScript, Tailwind CSS, and shadcn/ui for the CA Monk Frontend Developer Intern assignment.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5-646cff)

## 🚀 Features

- ✅ **View All Blogs** - Browse through all blog posts with beautiful card layouts
- ✅ **Blog Details** - Click any blog to view full content with cover images
- ✅ **Create New Blogs** - Add new blog posts with categories and rich content
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **Loading States** - Skeleton loaders for smooth user experience
- ✅ **Error Handling** - Graceful error messages and fallback handling
- ✅ **Category Management** - Dynamic category tags with add/remove functionality
- ✅ **Real-time Updates** - Blog list automatically refreshes after creating new posts

## 🛠️ Technologies Used

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development for better code quality
- **Vite** - Fast build tool and development server
- **Tailwind CSS v3** - Utility-first CSS framework for styling
- **shadcn/ui** - High-quality, accessible UI components
- **JSON Server** - Mock REST API for backend simulation
- **Lucide React** - Beautiful and consistent icon library

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/krshna02/camonk-interview.git
cd camonk-interview

# Install dependencies
npm install
```

## 🚀 Running the Application

You need to run **two servers** simultaneously:

### Terminal 1 - JSON Server (Backend API)
```bash
npm run server
```
This starts the JSON Server API on `http://localhost:3001`

### Terminal 2 - Development Server (Frontend)
```bash
npm run dev
```
This starts the Vite development server on `http://localhost:5173`

Then open **http://localhost:5173** in your browser.

## 📁 Project Structure
```
camonk-interview/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn UI components
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── badge.tsx
│   │       ├── skeleton.tsx
│   │       └── alert.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind directives
├── public/                  # Static assets
├── db.json                  # JSON Server database
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎯 API Endpoints

The JSON Server provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Retrieve all blog posts |
| GET | `/blogs/:id` | Retrieve a specific blog by ID |
| POST | `/blogs` | Create a new blog post |

### Sample Blog Object
```json
{
  "id": 1,
  "title": "Future of Fintech",
  "category": ["FINANCE", "TECH"],
  "description": "Exploring how AI and blockchain are reshaping financial services",
  "date": "2026-01-11T09:12:45.120Z",
  "coverImage": "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
  "content": "Full blog content here..."
}
```

## 🎨 Key Components

### BlogList Component
- Displays all blogs in a card grid layout
- Shows category badges, title, date, and description
- Handles loading states with skeleton loaders
- Highlights selected blog with ring border
- Auto-refreshes when new blogs are created

### BlogDetail Component
- Shows complete blog information
- Displays cover image with fallback handling
- Renders full blog content with proper formatting
- Includes back navigation button
- Responsive image handling

### CreateBlogForm Component
- Modal form for creating new blogs
- Dynamic category management (add/remove)
- Form validation for required fields
- Loading state during submission
- Error handling with user feedback

## ✨ Features Implemented

### State Management
- Custom React hooks (`useState`, `useEffect`, `useCallback`)
- Efficient data fetching with native Fetch API
- Proper loading and error state handling
- Cache invalidation after mutations

### UI/UX Enhancements
- Responsive two-panel layout (list + detail)
- Smooth hover effects and transitions
- Visual feedback for user interactions
- Skeleton loaders during data fetching
- Toast-like alerts for errors
- Image fallback for broken URLs

### Code Quality
- TypeScript for type safety
- Clean component structure
- Reusable utility functions
- Proper error boundaries
- Consistent naming conventions
- Well-organized file structure

## 🎯 Assignment Requirements Checklist

- ✅ **Technology Stack**
  - ✅ React with TypeScript
  - ✅ Tailwind CSS for styling
  - ✅ shadcn/ui components
  - ✅ JSON Server for backend

- ✅ **Core Features**
  - ✅ Get all blogs (GET /blogs)
  - ✅ Get blog by ID (GET /blogs/:id)
  - ✅ Create new blog (POST /blogs)

- ✅ **UI Requirements**
  - ✅ Blog list view with cards
  - ✅ Blog detail view with full content
  - ✅ Create blog form with validation
  - ✅ Category display and management
  - ✅ Responsive design

- ✅ **Code Quality**
  - ✅ Proper component organization
  - ✅ Error handling
  - ✅ Loading states
  - ✅ Type safety with TypeScript
  - ✅ Clean and readable code

## 🔧 Available Scripts
```bash
# Start development server
npm run dev

# Start JSON Server (backend)
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌟 Key Highlights

1. **No External State Management Library** - Pure React hooks implementation
2. **Accessible UI** - Using shadcn/ui for accessible components
3. **Type-Safe** - Full TypeScript coverage
4. **Responsive** - Mobile-first design approach
5. **Performance** - Optimized with React best practices
6. **Clean Code** - Well-organized and maintainable

## 📸 Screenshots

### Homepage - Blog List
*Shows all blog posts in a grid layout with category tags*

### Blog Detail View
*Displays full blog content with cover image and metadata*

### Create Blog Form
*Modal form for adding new blog posts with category management*

## 🚧 Future Enhancements

- [ ] Edit blog functionality
- [ ] Delete blog functionality
- [ ] Search and filter blogs
- [ ] Pagination for blog list
- [ ] Dark mode toggle
- [ ] Rich text editor for content
- [ ] Image upload functionality
- [ ] User authentication
- [ ] Comments section
- [ ] Blog categories filter

## 🤝 Contributing

This is an assignment project. Contributions are not expected, but feedback is welcome!

## 📝 License

This project is created for educational purposes as part of the CA Monk Frontend Developer Intern assignment.

## 👤 Author

**Krishna**
- GitHub: [@krshna02](https://github.com/krshna02)

## 🙏 Acknowledgments

- CA Monk for the assignment opportunity
- shadcn/ui for the beautiful component library
- The React and TypeScript communities

---
