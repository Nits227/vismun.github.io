# School Event Registration Portal

 This is a comprehensive, responsive web application for managing school event registrations with modern UI/UX design and full authentication system.

## 🚀 Features

### Core Functionality
- **Home Page**: Event overview, schedule highlights, and key information
- **Event Details**: Comprehensive agenda, speaker information, venue details, and FAQs
- **Registration System**: Multi-step registration form with validation
- **Announcements**: Real-time updates and important notices
- **Contact Form**: General inquiries with form validation
- **User Authentication**: Secure sign-up and login system
- **Admin Dashboard**: Registration management and analytics

### Technical Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Form Validation**: Comprehensive validation with error handling
- **Authentication**: Secure user management with role-based access
- **Data Export**: CSV export functionality for registrations
- **Accessibility**: WCAG 2.1 AA compliant design

## 🎨 Design System

### Color Palette
- **Primary Blue**: #1E3A8A (navbar, headers, primary buttons)
- **Accent Yellow**: #FACC15 (CTAs, hover states, badges)
- **Neutral Dark**: #111827 (body text, headings)
- **Neutral Light**: #F9FAFB (backgrounds, cards)
- **Gray**: #6B7280 (secondary text, dividers)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive Typography**: Scales appropriately across devices
- **Clear Hierarchy**: Consistent heading and body text styles

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Custom implementation with bcrypt

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── UI/
│       ├── LoadingSpinner.tsx
│       └── AnnouncementBanner.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── auth.ts
├── pages/
│   ├── Admin/
│   │   └── AdminDashboard.tsx
│   ├── Home.tsx
│   ├── EventDetails.tsx
│   ├── Register.tsx
│   ├── Announcements.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   └── Profile.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-event-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication System

### Demo Accounts
- **Admin**: admin@school.edu (any password)
- **Regular User**: Any email address (any password)

### Security Features
- Password hashing with bcrypt
- Secure cookie-based sessions
- Role-based access control
- Form validation and sanitization

## 📊 Admin Features

### Dashboard Analytics
- Total registrations count
- Registration status breakdown
- Event capacity tracking
- Recent registration activity

### Management Tools
- View all registrations
- Export data to CSV
- User role management
- Announcement creation

## 🎯 User Experience

### Registration Flow
1. **Account Creation**: Simple sign-up with validation
2. **Event Registration**: Multi-step form with progress tracking
3. **Confirmation**: Success page with next steps
4. **Profile Management**: View and edit account information

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Perfect layout for tablets
- **Desktop Enhanced**: Full-featured desktop experience

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` for color scheme changes
- Update `src/index.css` for global styles
- Component-specific styles in individual files

### Content
- Update event details in respective page components
- Modify FAQ content in `EventDetails.tsx`
- Customize announcement data in `Announcements.tsx`

## 📈 Performance

### Optimization Features
- Code splitting with React.lazy
- Optimized images and assets
- Efficient re-rendering with React hooks
- Smooth animations with Framer Motion

### Best Practices
- TypeScript for type safety
- ESLint for code quality
- Responsive design patterns
- Accessibility considerations

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect GitHub repository
- **Traditional Hosting**: Upload `dist` folder contents

### Environment Variables
Create `.env` file for production:
```env
VITE_APP_TITLE=School Event Portal
VITE_API_URL=your-api-url
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@schoolevent.edu
- Documentation: Check README and code comments
- Issues: Create GitHub issue for bugs

## 🎉 Acknowledgments

- Design inspiration from modern educational platforms
- Icons by Lucide React
- Fonts by Google Fonts
- Built with love for the education community

---

**Built with modern web technologies for the future of educational events.**
