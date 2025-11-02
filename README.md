# 🐉 Kali Portfolio OS

A unique, interactive portfolio website that mimics a Kali Linux desktop environment. Built with Next.js, this project showcases your work in an innovative OS-themed interface complete with windows, a taskbar, dock, terminal, and various themed applications.

![Kali Portfolio](https://img.shields.io/badge/Kali-Portfolio-purple) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 🖥️ Desktop Environment

- **Boot Screen**: Animated boot sequence that loads the desktop
- **Desktop Icons**: Customizable desktop icons for quick access
- **Window Manager**: Full window management with drag, resize, minimize, maximize, and close functionality
- **Taskbar**: Shows running applications and system status
- **Dock**: macOS-inspired dock for quick app launching
- **Context Menu**: Right-click context menu on desktop
- **Wallpaper System**: Multiple Kali Linux-themed wallpapers with dynamic switching

### 📱 Applications

#### Portfolio Sections

- **About**: Personal information, skills, and background
- **Projects**: Showcase of your projects and work
- **Contact**: Contact form with email integration
- **Certifications**: Display your certifications and achievements

#### Themed Security Tools (UI Only)

- **Terminal**: Interactive terminal with custom commands (help, about, skills, projects, etc.)
- **Metasploit**: Themed interface mimicking the Metasploit Framework
- **Nmap Scanner**: Network scanning themed interface
- **Wireshark**: Packet analysis themed interface
- **John the Ripper**: Password cracking tool themed interface
- **Phishing Attack**: Security awareness themed component

#### System Apps

- **Settings**: System settings and preferences
- **Trash Bin**: File deletion and recovery interface
- **Folder**: File system browser with folder navigation
- **Calendar**: Calendar panel for date selection
- **Wi-Fi Panel**: Network status indicator
- **Battery Panel**: System battery indicator
- **Volume Control**: Audio volume management

### 🎨 Design Features

- **Kali Linux Theme**: Authentic Kali Linux color scheme and aesthetics
- **Smooth Animations**: Framer Motion powered animations throughout
- **Responsive Design**: Works on various screen sizes
- **Glass Morphism**: Modern glassmorphic UI elements
- **Dark Theme**: Optimized for dark backgrounds
- **Custom Cursor Effects**: Animated cursor follower with glow effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Calendar**: [React Calendar](https://github.com/wojtekmaj/react-calendar)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd kali-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Email Configuration (for contact form)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   YOUR_EMAIL=your-email@gmail.com
   ```

   > **Note**: For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📧 Email Configuration

The contact form requires SMTP configuration to send emails. Here's how to set it up:

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use these settings in `.env.local`:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   YOUR_EMAIL=your-email@gmail.com
   ```

### Other Email Providers

- **Outlook/Hotmail**:

  ```env
  SMTP_HOST=smtp-mail.outlook.com
  SMTP_PORT=587
  ```

- **Yahoo**:

  ```env
  SMTP_HOST=smtp.mail.yahoo.com
  SMTP_PORT=587
  ```

- **Custom SMTP**: Update `SMTP_HOST` and `SMTP_PORT` accordingly

## 📁 Project Structure

```text
kali-portfolio/
├── public/                 # Static assets
│   ├── wallpapers/        # Desktop wallpapers
│   └── ...                # Other assets
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── api/           # API routes
│   │   │   └── contact/   # Contact form endpoint
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── Desktop.tsx    # Main desktop component
│   │   ├── Window.tsx     # Window wrapper component
│   │   ├── Taskbar.tsx    # Taskbar component
│   │   ├── Dock.tsx       # Dock component
│   │   ├── Terminal.tsx   # Terminal application
│   │   ├── About.tsx      # About section
│   │   ├── Projects.tsx   # Projects section
│   │   ├── Contact.tsx    # Contact form
│   │   └── ...            # Other components
│   ├── state/             # Zustand state management
│   │   ├── useWindowManager.ts  # Window state
│   │   ├── useWallpaper.ts      # Wallpaper state
│   │   ├── useFileSystem.ts     # File system state
│   │   └── useIconPositions.ts  # Desktop icon positions
│   └── utils/             # Utility functions
│       └── wallpapers.ts  # Wallpaper configuration
├── .env.local            # Environment variables (create this)
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎮 Usage

### Terminal Commands

The terminal application supports several commands:

- `help` - Show available commands
- `about` - Display personal information
- `skills` - List technical skills
- `projects` - Show projects
- `contact` - Display contact information
- `experience` - View work experience
- `education` - Show educational background
- `socials` - Display social media links
- `clear` - Clear terminal screen
- `whoami` - Display current user
- `neofetch` - System information

### Window Management

- **Drag**: Click and hold the title bar to move windows
- **Resize**: Drag window edges or corners
- **Minimize**: Click the minimize button
- **Maximize**: Click the maximize button
- **Close**: Click the close button or use the context menu
- **Focus**: Click anywhere on a window to bring it to front

### Desktop Interaction

- **Right-click**: Open context menu
- **Double-click icons**: Launch applications
- **Dock**: Click dock icons to open/switch applications

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

#### Changing Wallpapers

Edit `src/utils/wallpapers.ts` to add or modify wallpapers:

```typescript
export const wallpapers = [
  { id: 'kali-1', name: 'Kali Theme 1', url: '/wallpapers/kali-1.png' },
  // Add more wallpapers...
];
```

#### Adding New Applications

1. Create a new component in `src/components/`
2. Add the component to `Desktop.tsx` render function
3. Add window opening logic in the appropriate component (Dock, DesktopIcons, etc.)

#### Modifying Terminal Commands

Edit `src/components/Terminal.tsx` to add new commands or modify existing ones.

#### Styling

- Theme colors are defined in `tailwind.config.ts` as CSS variables
- Global styles are in `src/app/globals.css`
- Component-specific styles use Tailwind utility classes

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The project can be deployed on any platform that supports Next.js:

- **Netlify**: Use Next.js plugin
- **Railway**: Connect your GitHub repository
- **AWS**: Use Amplify or EC2 with proper setup
- **Docker**: Create a Dockerfile and deploy to any container platform

### Environment Variables in Production

Make sure to add all environment variables in your deployment platform's environment variable settings.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

### Shriram Narkhede

- Full Stack Developer
- Cyber Security Enthusiast
- Location: Pune, India

## 🙏 Acknowledgments

- Kali Linux for the theme inspiration
- Next.js team for the amazing framework
- All contributors and open-source libraries used in this project

## 📧 Contact

For questions, suggestions, or support, please use the contact form in the application or reach out through the provided contact information.

---

Made with ❤️ and ⚡ by [Your Name]
