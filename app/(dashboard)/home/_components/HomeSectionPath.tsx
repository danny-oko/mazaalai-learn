import { Lock, BookOpen, PenLine, Check } from "lucide-react";
import { LessonCards } from "./LessonCards";

const lessons = [
  { id: 1, icon: Check, title: "Introduction", status: "done" },
  { id: 2, icon: BookOpen, title: "Vowels", status: "done" },
  { id: 3, icon: PenLine, title: "Consonants 1", status: "active" },
  { id: 4, icon: Lock, title: "Consonants 2", status: "locked" },
  { id: 5, icon: BookOpen, title: "Grammar", status: "locked" },
  { id: 6, icon: PenLine, title: "Writing", status: "locked" },
  { id: 7, icon: BookOpen, title: "Final Test", status: "locked" },
];

const X = [47, 78, 47, 18, 47, 78, 47];
const ROW = 160;
const SW = 340;

export const HomePath = () => {
  const totalH = lessons.length * ROW + 80;

  const pts = X.map((x, i) => ({ x: (x / 100) * SW, y: i * ROW + 74 }));

  let fullPath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i];
    const my = (a.y + b.y) / 2;
    fullPath += ` C ${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }

  let donePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i <= 2; i++) {
    const a = pts[i - 1],
      b = pts[i];
    const my = (a.y + b.y) / 2;
    donePath += ` C ${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }

  return (
    <div className="relative w-85" style={{ height: totalH }}>
      {/* Road */}
      <svg
        viewBox={`0 0 ${SW} ${totalH}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full pointer-events-none"
        style={{ height: totalH }}
      >
        <path
          d={fullPath}
          stroke="#BFC9C1"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 8"
        />
        <path
          d={donePath}
          stroke="#0F5238"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 8"
        />
      </svg>

      <LessonCards />
    </div>
  );
};
