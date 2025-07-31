# Hank Kim's Portfolio

A modern 3D portfolio website built with React, Three.js, and D3.js featuring interactive experiences and project showcases.

## Features

- **3D Interactive Experience**: Built with Three.js and React Three Fiber
- **Interactive Force Graph**: D3.js-powered network visualization in menu
- **Responsive 3D Office Environment**: Virtual workspace with animated avatar
- **Project Showcase**: Interactive 3D project gallery
- **Smooth Animations**: GSAP and Framer Motion powered transitions

## Tech Stack

- **Frontend**: React 18, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Data Visualization**: D3.js
- **Animations**: GSAP, Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: Formspree

## Getting Started

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

## Project Structure

```
src/
├── components/
│   ├── Avatar.jsx          # 3D character model
│   ├── Background.jsx      # Scene background
│   ├── Experience.jsx      # Main 3D scene
│   ├── Interface.jsx       # UI overlay
│   ├── Menu.jsx           # Navigation with D3 force graph
│   ├── Office.jsx         # 3D office environment
│   └── Projects.jsx       # Project showcase gallery
├── stores/
│   └── projectStore.js    # State management
└── config.js              # App configuration
```

## Interactive Features

- **3D Navigation**: Scroll-based scene transitions
- **Force Graph Menu**: Interactive D3.js network visualization
- **Project Gallery**: 3D carousel with smooth transitions
- **Animated Avatar**: Character animations using FBX models
- **Responsive Design**: Works across all devices

## Deployment

Deployed on Vercel with automatic builds from main branch.

```bash
npm run deploy
```

## Contact

Built by Hank Kim - [LinkedIn](https://www.linkedin.com/in/huiung-kim-3b1330244/) | [GitHub](https://github.com/hank1245)