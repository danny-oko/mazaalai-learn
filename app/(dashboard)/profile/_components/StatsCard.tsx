import type { ReactNode } from "react";

type StatsCardProps = {
  value: ReactNode;
  label: string;
};

export default function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="flex-1 bg-[#EDE8E0] rounded-2xl py-3 px-2 text-center">
      <p className="text-[#E8920A] font-bold text-xl leading-tight">{value}</p>
      <p className="text-[#A0917C] text-xs font-semibold tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}
