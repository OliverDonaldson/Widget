# 📖 Study Tracker — Mac Desktop Widget

A beautiful, interactive study tracker widget for your macOS desktop. Built with **React JSX** for [Übersicht](https://tracesof.net/uebersicht/).

![Widget Preview](screenshot.png)

## Features

- **Interactive To-Do Lists** — Click to check/uncheck tasks
- **Gradient Progress Bars** — Per-course and overall progress with animated indicators
- **Growing Knowledge Tree** 🌱→🌳→🌸 — SVG tree that grows as you complete tasks
- **XP & Level System** ⚡ — Earn 20 XP per task, level up as you study
- **Study Streak Tracker** 🔥 — Track consecutive study days
- **Achievement Badges** 🏅 — Unlock milestones as you progress
- **Persistent Data** — All progress saves to `data.json`
- **Dark Glassmorphism UI** — Frosted glass design with custom gradients

## Prerequisites

1. **Übersicht** — Download from [tracesof.net/uebersicht](https://tracesof.net/uebersicht/)
2. macOS 10.14 or later

## Installation

### Quick Install

```bash
git clone https://github.com/OliverDonaldson/Widget.git
cd Widget
chmod +x install.sh
./install.sh
```

### Manual Install

Copy the `study-tracker.widget` folder to your Übersicht widgets directory:

```bash
cp -R study-tracker.widget ~/Library/Application\ Support/Übersicht/widgets/
```

Then right-click the Übersicht menu bar icon → **Refresh All Widgets**.

## Customization

### Adding Your Courses

Edit `data.json` inside the widget folder:

```
~/Library/Application Support/Übersicht/widgets/study-tracker.widget/data.json
```

Each course looks like this:

```json
{
  "id": "unique-id",
  "name": "Your Course Name",
  "color": ["#startColor", "#endColor"],
  "tasks": [
    { "id": "t1", "text": "Task description", "done": false }
  ]
}
```

### Gradient Colors (matching the progress bar styles)

| Style | Colors |
|-------|--------|
| Cyan → Green | `["#00f2fe", "#4facfe"]` |
| Purple → Pink | `["#a855f7", "#ec4899"]` |
| Orange → Red | `["#f97316", "#ef4444"]` |
| Blue → Purple | `["#3b82f6", "#c084fc"]` |
| Yellow → Amber | `["#facc15", "#f97316"]` |
| Emerald → Teal | `["#10b981", "#14b8a6"]` |

### Widget Positioning

In `index.jsx`, modify the `className` export to change position:

```css
top: 30px;    /* distance from top */
left: 30px;   /* distance from left */
width: 420px; /* widget width */
```

## How It Works

| Action | Result |
|--------|--------|
| Click a task | Toggles done/undone, ±20 XP |
| Click "+ Add task..." | Adds new task to that course |
| Click ✕ on a task | Deletes the task |
| Complete tasks | Tree grows, badges unlock, level up |

### Knowledge Tree Stages

| Progress | Stage |
|----------|-------|
| 0–9% | 🌱 Seed/sprout |
| 10–29% | 🌿 First branches |
| 30–49% | 🌳 Growing canopy |
| 50–74% | 🌲 Full tree |
| 75–99% | 🌸 Flowering |
| 100% | 🏆 Fruits & stars |

## File Structure

```
study-tracker.widget/
├── index.jsx      # Main widget code (React JSX)
├── data.json      # Your courses, tasks, XP, achievements
└── widget.json    # Übersicht metadata
```

## Tech Stack

- **Übersicht** — Desktop widget engine for macOS
- **React JSX** — UI rendering
- **SVG** — Knowledge tree graphics
- **CSS-in-JS** — Styling with glassmorphism

## License

MIT — free to use, modify, and share.

---

*Built by Oliver Donaldson*
