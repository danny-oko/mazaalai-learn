import { AudioRecorder } from "./Recorder";

export default function Page() {
  return (
    <section className="w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Минутын уншлага</h1>
        <div className="p-5 mt-5">
          <AudioRecorder />
        </div>
      </div>
    </section>
  );
}
