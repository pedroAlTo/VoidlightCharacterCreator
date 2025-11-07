# Voidlight DM Tool - Deployment Instructions

## 🎉 Your app has been successfully built and pushed to GitHub!

### Branches Created:
1. **dm-tool** - Contains the full source code and built files
2. **gh-pages** - Contains only the production build for GitHub Pages

## 📦 To Enable GitHub Pages:

1. Go to your repository: https://github.com/pedroAlTo/VoidlightCharacterCreator
2. Click on **Settings** (top right)
3. Scroll down to **Pages** (in the left sidebar under "Code and automation")
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your app will be live at: `https://pedroalto.github.io/VoidlightCharacterCreator/`

## 🚀 Alternative: View the dm-tool branch

You can also view the full source code in the `dm-tool` branch:
https://github.com/pedroAlTo/VoidlightCharacterCreator/tree/dm-tool

## 📝 What's Included:

### Features:
- ⏱️ **Clock Management** - Track 4/6/8/12 segment clocks
- 🎲 **Token Tracking** - Fear tokens (Keeper) and Hope/Stress/HP (Players)
- 🎲 **Duality Dice Roller** - 2d12 Hope + Fear dice with automatic outcomes
- 👥 **NPC & Enemy Tracker** - Manage NPCs with HP, Evasion, and notes
- 📝 **Session Notes** - Take and export campaign notes
- ⚡ **Keeper Moves Reference** - Quick access to Soft and Hard moves

### Technical Details:
- Built with React + Vite
- Fully responsive design
- Dark space-themed UI
- LocalStorage for data persistence
- Export/Import campaign data as JSON

## 🔧 Local Development:

To run locally:
```bash
cd dm-tool-branch
npm install
npm run dev
```

To build:
```bash
npm run build
```

## 📱 Current Live Preview:
Your app is currently running at: https://5173-fa5671da-a7da-4e5a-8568-13765f52659d.proxy.daytona.works

This is a temporary URL. Once you enable GitHub Pages, you'll have a permanent URL.