/**
 * Study Tracker Widget for Übersicht
 * ===================================
 * Interactive to-do lists, gradient progress bars, growing knowledge tree,
 * XP system, streak tracking, and achievement badges.
 *
 * Author: Oliver Donaldson
 * Built with: React JSX for Übersicht
 */

import { css, run } from "uebersicht";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WIDGET_DIR = "study-tracker.widget";
const DATA_FILE = `Library/Application\\ Support/Übersicht/widgets/${WIDGET_DIR}/data.json`;

// ─── REFRESH ─────────────────────────────────────────────────────────────────
export const refreshFrequency = false; // manual refresh only

// ─── DATA COMMAND ────────────────────────────────────────────────────────────
export const command = `cat ~/${DATA_FILE}`;

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
export const className = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

  position: fixed;
  top: 30px;
  left: 30px;
  width: 420px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #e2e8f0;
  z-index: 1;

  /* Custom scrollbar */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 3px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
`;

// ─── HELPER: save data back to disk ──────────────────────────────────────────
function saveData(data) {
  const escaped = JSON.stringify(data).replace(/'/g, "'\\''");
  run(`echo '${escaped}' > ~/${DATA_FILE}`);
}

// ─── HELPER: calculate XP level thresholds ───────────────────────────────────
function xpForLevel(lvl) { return lvl * 150; }

// ─── COMPONENT: Gradient Progress Bar ────────────────────────────────────────
function ProgressBar({ percent, gradient, label }) {
  const clamp = Math.min(100, Math.max(0, percent));
  return (
    <div style={{ marginBottom: 6 }}>
      {label && (
        <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>
          {label}
        </div>
      )}
      <div
        style={{
          position: "relative",
          height: 18,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 12,
          overflow: "visible",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: `${clamp}%`,
            height: "100%",
            borderRadius: 12,
            background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
            transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
            boxShadow: `0 0 12px ${gradient[0]}55`,
          }}
        />
        {/* Thumb indicator */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${clamp}%`,
            transform: "translate(-50%, -50%)",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#1e293b",
            border: `2.5px solid ${gradient[1]}`,
            boxShadow: `0 0 8px ${gradient[1]}66`,
            display: clamp > 0 ? "block" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: gradient[1],
            }}
          />
        </div>
        {/* Percentage label */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 24,
            fontSize: 11,
            fontWeight: 600,
            color: gradient[1],
          }}
        >
          {Math.round(clamp)}%
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENT: Growing Knowledge Tree (SVG) ────────────────────────────────
function KnowledgeTree({ percent }) {
  // Tree grows based on overall completion
  const stage = percent < 10 ? 0 : percent < 30 ? 1 : percent < 50 ? 2 : percent < 75 ? 3 : percent < 100 ? 4 : 5;
  const trunkH = 20 + stage * 12;
  const leafCount = stage;
  const hasFlower = stage >= 4;
  const hasFruit = stage >= 5;

  const leafColors = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#a3e635"];
  const flowerColor = "#f472b6";

  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Ground */}
        <ellipse cx="60" cy="110" rx="40" ry="6" fill="#365314" opacity="0.5" />
        {/* Trunk */}
        <rect
          x="56"
          y={110 - trunkH}
          width="8"
          height={trunkH}
          rx="3"
          fill="#92400e"
        />
        {/* Branches and leaves */}
        {leafCount >= 1 && (
          <>
            <line x1="60" y1={110 - trunkH + 10} x2="40" y2={110 - trunkH - 5} stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <circle cx="36" cy={110 - trunkH - 10} r="10" fill={leafColors[0]} opacity="0.85" />
          </>
        )}
        {leafCount >= 2 && (
          <>
            <line x1="60" y1={110 - trunkH + 5} x2="82" y2={110 - trunkH - 8} stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <circle cx="86" cy={110 - trunkH - 12} r="11" fill={leafColors[1]} opacity="0.85" />
          </>
        )}
        {leafCount >= 3 && (
          <circle cx="60" cy={110 - trunkH - 16} r="14" fill={leafColors[2]} opacity="0.85" />
        )}
        {leafCount >= 4 && (
          <>
            <circle cx="46" cy={110 - trunkH - 22} r="9" fill={leafColors[3]} opacity="0.8" />
            <circle cx="74" cy={110 - trunkH - 20} r="10" fill={leafColors[4]} opacity="0.8" />
          </>
        )}
        {/* Flowers */}
        {hasFlower && (
          <>
            <circle cx="38" cy={110 - trunkH - 22} r="4" fill={flowerColor} />
            <circle cx="80" cy={110 - trunkH - 26} r="3.5" fill="#c084fc" />
          </>
        )}
        {/* Fruits (stars for achievements) */}
        {hasFruit && (
          <>
            <text x="52" y={110 - trunkH - 28} fontSize="12" textAnchor="middle">⭐</text>
            <text x="68" y={110 - trunkH - 30} fontSize="10" textAnchor="middle">🎓</text>
          </>
        )}
        {/* Seed / sprout for stage 0 */}
        {stage === 0 && (
          <>
            <circle cx="60" cy="105" r="4" fill="#92400e" />
            <line x1="60" y1="101" x2="60" y2="95" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <circle cx="57" cy="93" r="3" fill="#22c55e" opacity="0.7" />
          </>
        )}
      </svg>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
        {stage === 0 && "🌱 Just sprouted — keep going!"}
        {stage === 1 && "🌿 Growing nicely..."}
        {stage === 2 && "🌳 Branching out!"}
        {stage === 3 && "🌲 Strong and tall!"}
        {stage === 4 && "🌸 In full bloom!"}
        {stage === 5 && "🏆 Magnificent! All complete!"}
      </div>
    </div>
  );
}

// ─── COMPONENT: Streak & XP Header ──────────────────────────────────────────
function StatsHeader({ streakDays, xp, level }) {
  const xpNeeded = xpForLevel(level + 1);
  const xpPercent = (xp / xpNeeded) * 100;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20 }}>🔥</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fb923c" }}>
            {streakDays} day{streakDays !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20 }}>⚡</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#facc15" }}>
            {xp} XP
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20 }}>🎖️</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa" }}>
            Lvl {level}
          </div>
        </div>
      </div>
      <div style={{ width: 90 }}>
        <div style={{ fontSize: 9, color: "#64748b", textAlign: "right", marginBottom: 2 }}>
          {xp}/{xpNeeded} XP
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
          <div
            style={{
              width: `${Math.min(xpPercent, 100)}%`,
              height: "100%",
              borderRadius: 4,
              background: "linear-gradient(90deg, #facc15, #f97316)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENT: Achievement Badges ───────────────────────────────────────────
const BADGE_MAP = {
  first_task: { icon: "✅", label: "First Task" },
  streak_3: { icon: "🔥", label: "3-Day Streak" },
  streak_7: { icon: "💪", label: "7-Day Streak" },
  course_added: { icon: "📚", label: "Course Added" },
  level_5: { icon: "🏅", label: "Level 5" },
  all_done: { icon: "🏆", label: "All Complete" },
  ten_tasks: { icon: "🎯", label: "10 Tasks Done" },
};

function Badges({ achievements }) {
  if (!achievements || achievements.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "6px 0 10px" }}>
      {achievements.map((a) => {
        const badge = BADGE_MAP[a] || { icon: "⭐", label: a };
        return (
          <div
            key={a}
            title={badge.label}
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 8,
              padding: "3px 8px",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 4,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span>{badge.icon}</span>
            <span style={{ color: "#cbd5e1" }}>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── COMPONENT: Single Course Card ───────────────────────────────────────────
function CourseCard({ course, onToggle, onAddTask, onDeleteTask }) {
  const done = course.tasks.filter((t) => t.done).length;
  const total = course.tasks.length;
  const percent = total > 0 ? (done / total) * 100 : 0;

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Course header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 10,
          background: `linear-gradient(90deg, ${course.color[0]}, ${course.color[1]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {course.name}
      </div>

      {/* Progress bar */}
      <ProgressBar
        percent={percent}
        gradient={course.color}
        label={`${done} of ${total} tasks complete`}
      />

      {/* Task list */}
      <div style={{ marginTop: 20 }}>
        {course.tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              cursor: "pointer",
            }}
            onClick={() => onToggle(course.id, task.id)}
          >
            {/* Checkbox */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                border: task.done
                  ? "none"
                  : "2px solid rgba(255,255,255,0.2)",
                background: task.done
                  ? `linear-gradient(135deg, ${course.color[0]}, ${course.color[1]})`
                  : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              {task.done && (
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>
                  ✓
                </span>
              )}
            </div>
            {/* Task text */}
            <span
              style={{
                fontSize: 12.5,
                flex: 1,
                color: task.done ? "#64748b" : "#e2e8f0",
                textDecoration: task.done ? "line-through" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {task.text}
            </span>
            {/* Delete button */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(course.id, task.id);
              }}
              style={{
                fontSize: 13,
                color: "#475569",
                cursor: "pointer",
                padding: "0 4px",
                borderRadius: 4,
                opacity: 0.5,
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.opacity = 1)}
              onMouseOut={(e) => (e.target.style.opacity = 0.5)}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      {/* Add task */}
      <div
        onClick={() => onAddTask(course.id)}
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "#64748b",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 0",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = course.color[1])}
        onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
        Add task...
      </div>
    </div>
  );
}

// ─── MAIN RENDER ─────────────────────────────────────────────────────────────
export const render = ({ output, error }) => {
  let data;
  try {
    data = JSON.parse(output);
  } catch (e) {
    return (
      <div
        style={{
          background: "rgba(15,23,42,0.9)",
          borderRadius: 16,
          padding: 20,
          color: "#f87171",
          fontSize: 13,
        }}
      >
        ⚠️ Could not load data.json — check the file path.
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>
          {e.toString()}
        </div>
      </div>
    );
  }

  const courses = data.courses || [];
  const totalTasks = courses.reduce((s, c) => s + c.tasks.length, 0);
  const totalDone = courses.reduce(
    (s, c) => s + c.tasks.filter((t) => t.done).length,
    0
  );
  const overallPercent = totalTasks > 0 ? (totalDone / totalTasks) * 100 : 0;

  // ── Handlers (mutate data & save) ──
  function toggleTask(courseId, taskId) {
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) return;
    const task = course.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.done = !task.done;

    // XP: +20 for completing, -20 for unchecking
    if (task.done) {
      data.xp = (data.xp || 0) + 20;
      // Check level up
      while (data.xp >= xpForLevel((data.level || 1) + 1)) {
        data.level = (data.level || 1) + 1;
      }
      // Achievement: first task
      if (!data.achievements) data.achievements = [];
      if (!data.achievements.includes("first_task")) {
        data.achievements.push("first_task");
      }
      // Achievement: 10 tasks done
      const nowDone = data.courses.reduce(
        (s, c) => s + c.tasks.filter((t) => t.done).length, 0
      );
      if (nowDone >= 10 && !data.achievements.includes("ten_tasks")) {
        data.achievements.push("ten_tasks");
      }
      // Achievement: all tasks done
      const nowTotal = data.courses.reduce((s, c) => s + c.tasks.length, 0);
      if (nowDone === nowTotal && !data.achievements.includes("all_done")) {
        data.achievements.push("all_done");
      }
    } else {
      data.xp = Math.max(0, (data.xp || 0) - 20);
    }

    saveData(data);
    run(`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_DIR}-index-jsx"'`);
  }

  function addTask(courseId) {
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) return;
    const newId = "t" + Date.now();
    course.tasks.push({ id: newId, text: "New task — click to edit", done: false });
    saveData(data);
    run(`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_DIR}-index-jsx"'`);
  }

  function deleteTask(courseId, taskId) {
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) return;
    course.tasks = course.tasks.filter((t) => t.id !== taskId);
    saveData(data);
    run(`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "${WIDGET_DIR}-index-jsx"'`);
  }

  // ── Date display ──
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 2 }}>
              📖 Study Tracker
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{dateStr}</div>
          </div>
          <KnowledgeTree percent={overallPercent} />
        </div>

        <StatsHeader
          streakDays={data.streakDays || 0}
          xp={data.xp || 0}
          level={data.level || 1}
        />

        <Badges achievements={data.achievements || []} />

        {/* Overall progress */}
        <div style={{ marginTop: 4 }}>
          <ProgressBar
            percent={overallPercent}
            gradient={["#6366f1", "#ec4899"]}
            label={`Overall: ${totalDone} of ${totalTasks} tasks (all courses)`}
          />
        </div>
      </div>

      {/* Course Cards */}
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onToggle={toggleTask}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
        />
      ))}

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: 10,
          color: "#334155",
          padding: "8px 0 4px",
        }}
      >
        Click tasks to toggle • Edit data.json to customize courses
      </div>
    </div>
  );
};
