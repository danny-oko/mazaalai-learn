"use client";

import { useMemo, useState } from "react";
import { Character, Form } from "./CharacterCard";
import StrokeAnimation from "./StrokeAnimation";

const FORM_LABELS: Record<string, string> = {
  INITIAL: "Initial",
  MEDIAL: "Medial",
  FINAL: "Final",
};

const FORM_DESCRIPTIONS: Record<string, string> = {
  INITIAL: "Used at word start",
  MEDIAL: "Used within words",
  FINAL: "Used at word end",
};

const FORM_ORDER = ["INITIAL", "MEDIAL", "FINAL"];

export const CharacterDetail = ({
  character,
  compact = false,
}: {
  character: Character;
  compact?: boolean;
}) => {
  // FORM-уудыг зөв дарааллаар авах
  const forms = useMemo(() => {
    return FORM_ORDER.map((type) =>
      character.forms.find((form) => form.type === type),
    ).filter(Boolean) as Form[];
  }, [character]);

  // Аль form идэвхтэй вэ
  const [selectedFormType, setSelectedFormType] = useState("MEDIAL");

  const selectedForm =
    forms.find((form) => form.type === selectedFormType) ??
    forms[1] ??
    forms[0];

  // 🔥 Stroke animation state
  const [play, setPlay] = useState(false);

  return (
    <div
      className={[
        "rounded-[32px] bg-white shadow-[0_20px_60px_rgba(35,31,25,0.08)]",
        compact ? "h-full p-5" : "p-6 md:p-8",
      ].join(" ")}
    >
      {/* Header */}
      <div
        className={
          compact
            ? "mb-5 flex items-start justify-between"
            : "mb-9 flex items-start justify-between"
        }
      >
        <div>
          <h2
            className={[
              "font-black text-[#003D27]",
              compact ? "text-3xl" : "text-4xl",
            ].join(" ")}
          >
            {character.name}
          </h2>

          <p className="mt-1 text-sm text-[#6F746F]">
            /{character.latinForm}/ phoneme
          </p>
        </div>

        {/* Play button */}
        <button
          onClick={() => {
            setPlay(false);
            setTimeout(() => setPlay(true), 10); // restart animation
          }}
          className="rounded-full bg-[#00865A] px-5 py-2 text-sm font-bold text-white shadow"
        >
          ⊙ Play
        </button>
      </div>

      {/* Forms */}
      <section className={compact ? "mb-5" : "mb-8"}>
        <h3 className="mb-4 text-xs font-bold uppercase text-[#777C77]">
          Forms Visualization
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {forms.map((form) => {
            const active = selectedForm?.type === form.type;

            return (
              <button
                key={form.type}
                onClick={() => setSelectedFormType(form.type)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={[
                    "flex items-center justify-center rounded-full border-2",
                    compact ? "h-16 w-16" : "h-20 w-20",
                    active
                      ? "bg-[#DDF9EA] border-[#A9E5CB]"
                      : "bg-[#F7F5F1] border-[#EEEAE3]",
                  ].join(" ")}
                >
                  <span className="[writing-mode:vertical-lr] text-2xl text-[#003D27]">
                    {form.glyph}
                  </span>
                </div>

                <span className={active ? "text-[#00865A]" : "text-[#8A8E8A]"}>
                  {FORM_LABELS[form.type]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 🔥 Stroke Animation хэсэг */}
      <section
        className={[
          "rounded-[26px] border border-[#EEEAE3] bg-[#F7F5F1]",
          compact ? "mb-5 p-4" : "mb-8 p-6",
        ].join(" ")}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold">Stroke Order</h3>
        </div>

        <div
          className={[
            "flex items-center justify-center rounded-[20px] bg-white",
            compact ? "h-32" : "h-48",
          ].join(" ")}
        >
          {/* 🔥 Dynamic SVG animation */}
          {character.forms[0]?.strokePath ? (
            <StrokeAnimation path={character.forms[0].strokePath} play={play} />
          ) : (
            <span className="text-gray-400 text-sm">No stroke data</span>
          )}
        </div>
      </section>

      {/* Form descriptions */}
      <section className="space-y-2">
        {forms.map((form) => (
          <div
            key={form.type}
            className="flex items-center justify-between rounded-xl border p-3"
          >
            <div>
              <h4 className="font-bold">{FORM_LABELS[form.type]} Form</h4>
              <p className="text-sm text-gray-500">
                {FORM_DESCRIPTIONS[form.type]}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
