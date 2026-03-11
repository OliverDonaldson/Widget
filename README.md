# 📖 Study Tracker — Mac Desktop Widget

Study Tracker is a desktop widget I built to help organise my university study tasks. It sits right on the macOS desktop and provides a compact, glanceable view of course-by-course progress, daily task lists, and a gamified XP & levelling system to keep motivation high.

The widget is fully interactive — I can check off tasks as I complete them, add or remove courses and tasks as needed, and it updates in real-time to reflect my current status. Progress is visualised with a growing plant that flourishes as more tasks are completed.

> The tasks shown in the preview are demo data for demonstration purposes. I have done them, I swear!

![Widget Preview](screenshot.png)

## Key Features

- **Course-based task management** — organise tasks under each course (e.g. DATA 303, DATA 305, STAT 292) with lectures, tutorials, assignments, and more
- **Progress tracking** — per-course and overall completion percentages with animated gradient progress bars
- **XP & levelling system** — earn experience points for completing tasks, level up, and unlock achievement badges like "First Task" and "All Complete"
- **Growing plant visualisation** — a virtual plant that grows as you complete more tasks, providing a satisfying visual reward
- **Collapsible tasks** — each course's tasks can be expanded or collapsed for a cleaner view
- **Interactive editing** — easily add, edit, or remove courses and their associated tasks to fit your study needs
- **Desktop widget** — quick at-a-glance progress right on your macOS desktop
- **Local data persistence** — all task state and progress saves automatically and remains after reloads and restarts

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

## Technical Details

- **Built with React JSX** for UI rendering, powered by the [Übersicht](https://tracesof.net/uebersicht/) desktop widget engine for macOS
- **Custom SVG graphics** for the knowledge tree visualisation that grows as tasks are completed
- **CSS-in-JS styling** with glassmorphism effects for a modern, translucent aesthetic
- **Local data persistence** — task state and progress are serialized to JSON and written to a local file on every state change, so courses, task edits, and completion states persist between refreshes and desktop restarts
- **Responsive layout** with custom animations for plant growth and XP progression

### Data Persistence

To avoid losing task updates, the widget serializes the current state to JSON and writes it directly to `data.json` each time anything changes. This means everything survives reboots, sleeps, and app restarts — the file is the database.

```js
function saveData(data) {
  const escaped = JSON.stringify(data).replace(/'/g, "'\\''");
  run(`echo '${escaped}' > ~/${DATA_FILE}`);
}
```

## Motivation

Juggling multiple courses with lectures, tutorials, and assignments can be overwhelming. I wanted a tool that lives right on my desktop to give me instant visibility into what's done, what's due, and how I'm tracking overall. Having it always visible means I can quickly jot down a task or check something off the moment I finish it — no switching apps, no friction.

The gamification elements like XP and levels make the process of checking off tasks quirky and fun. It's not just about getting things done, but about making the journey rewarding and enjoyable.

## License

MIT — free to use, modify, and share.

---

*Built by Oliver Donaldson*
