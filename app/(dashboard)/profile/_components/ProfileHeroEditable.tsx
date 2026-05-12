"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil } from "lucide-react";

import { mnLabels } from "@/lib/i18n/mn-copy";
import { mnProfile } from "@/lib/i18n/mn-profile";
import { mnUi } from "@/lib/i18n/mn-ui";

type ProfileHeroEditableProps = {
  name: string;
  username: string;
  memberSince: string;
  avatarUrl: string | null;
  avatarInitial: string;
  rankTitle: string;
  language: string;
  initialName: string;
  initialUserName: string;
  initialAvatarUrl: string;
};

export default function ProfileHeroEditable({
  name,
  username,
  memberSince,
  avatarUrl,
  avatarInitial,
  rankTitle,
  language,
  initialName,
  initialUserName,
  initialAvatarUrl,
}: ProfileHeroEditableProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState(initialName);
  const [formUserName, setFormUserName] = useState(initialUserName);
  const [formAvatarUrl, setFormAvatarUrl] = useState(initialAvatarUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/profile/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          userName: formUserName.trim(),
          avatarUrl: formAvatarUrl.trim() || null,
        }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? mnProfile.saveChangesFailed);
        return;
      }
      setIsEditing(false);
      router.refresh();
    } catch {
      setError(mnProfile.networkErrorRetry);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#ead9bb] bg-gradient-to-br from-white via-[#fffdf8] to-[#fff4e4] shadow-sm">
      <button
        type="button"
        onClick={() => setIsEditing((prev) => !prev)}
        className="absolute right-5 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8deea] bg-white text-[#1C2B4A] shadow-sm transition-colors hover:border-[#E8920A]/40 hover:bg-[#fffefb] md:top-6"
        aria-label={isEditing ? mnUi.closeEditProfile : mnUi.editProfile}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <div className="relative px-5 pb-5 pr-16 md:px-8 md:pr-20">
        <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-start md:justify-between md:pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#fde9c4] bg-gradient-to-br from-[#f0a31a] to-[#d9780a] text-3xl font-bold text-white ring-2 ring-white/90 md:h-22 md:w-22">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                  unoptimized
                />
              ) : (
                avatarInitial
              )}
            </div>
            <div className="pt-2">
              <h1 className="text-2xl font-extrabold leading-tight text-[#1f1c18] md:text-3xl">
                {name}
              </h1>
              <p className="text-sm text-[#706552]">
                {mnProfile.heroAt(username, memberSince)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold md:hidden">
                <span className="-rotate-1 rounded-full border border-[#e7dbc2] bg-[#fff9ed] px-3 py-1 text-[#8a6a2d] shadow-sm">
                  {rankTitle}
                </span>
                <span className="rotate-1 rounded-full border border-[#d3def3] bg-[#ebf2ff] px-3 py-1 text-[#1C2B4A] shadow-sm">
                  {language}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden flex-wrap gap-2 pt-2 text-xs font-semibold md:flex">
            <span className="-rotate-1 rounded-full border border-[#e7dbc2] bg-[#fff9ed] px-3 py-1 text-[#8a6a2d] shadow-sm">
              {rankTitle}
            </span>
            <span className="rotate-1 rounded-full border border-[#d3def3] bg-[#ebf2ff] px-3 py-1 text-[#1C2B4A] shadow-sm">
              {language}
            </span>
          </div>
        </div>
        {isEditing ? (
          <form
            onSubmit={onSave}
            className="mt-5 grid gap-3 rounded-2xl border border-dashed border-[#e5d7c4] bg-[#fffefb]/95 p-4 shadow-inner md:grid-cols-3"
          >
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-[#6f6658]">
                {mnProfile.displayName}
              </span>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 outline-none focus:border-[#E8920A]"
                disabled={busy}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-[#6f6658]">
                {mnLabels.username}
              </span>
              <input
                value={formUserName}
                onChange={(e) => setFormUserName(e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 outline-none focus:border-[#E8920A]"
                disabled={busy}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-[#6f6658]">
                {mnProfile.avatarUrl}
              </span>
              <input
                value={formAvatarUrl}
                onChange={(e) => setFormAvatarUrl(e.target.value)}
                placeholder={mnProfile.urlPlaceholder}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 outline-none focus:border-[#E8920A]"
                disabled={busy}
              />
            </label>
            <div className="md:col-span-3 flex items-center justify-between gap-3">
              <p className="text-sm text-[#D63F3F]">{error}</p>
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-[#E8920A] px-4 py-2 text-sm font-bold text-white hover:bg-[#cf7d09] disabled:opacity-60"
              >
                {busy ? mnUi.saving : mnUi.saveProfile}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
