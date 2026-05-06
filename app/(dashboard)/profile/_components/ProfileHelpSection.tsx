export function ProfileHelpSection() {
  return (
    <section
      id="help"
      className="scroll-mt-24 rounded-2xl border border-[#e6dece] bg-white p-4 md:p-5"
    >
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
        Help &amp; support
      </h2>
      <p className="mb-4 text-sm text-[#706552]">
        Need help with lessons or your account? Reach out and we&apos;ll get back
        to you.
      </p>
      <a
        href="mailto:support@mazaalai.learn"
        className="inline-flex rounded-xl bg-[#1d2b55] px-4 py-2 text-sm font-semibold text-white hover:bg-[#152042]"
      >
        Email support
      </a>
    </section>
  );
}
