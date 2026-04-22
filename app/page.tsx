import { AudioRecorder } from "./_components/Recorder";

const Home = () => {
  return (
    <div>
      <div>Hello this is main home</div>
      <p>hi</p>
      <p>Text here and title</p>
      <div className="p-2 border-amber-300">
        <h1 className="font-bold">
          Hello this is Minute-based reading feature
        </h1>
        <AudioRecorder />
      </div>
    </div>
  );
};

export default Home;
