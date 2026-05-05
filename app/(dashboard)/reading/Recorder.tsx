"use client";

import { useRef, useState, useCallback } from "react";

interface TranscribeResponse {
  data: string;
}

export const AudioRecorder = () => {
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAudio = useCallback(async (audioBlob: Blob) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append(
      "audio",
      new File([audioBlob], "recording.wav", { type: "audio/wav" }),
    );

    try {
      const response = await fetch("/api", { method: "POST", body: formData });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const result = (await response.json()) as TranscribeResponse;
      setTranscription(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartCapture = useCallback(async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        void uploadAudio(audioBlob);
      };

      mediaRecorder.ondataavailable = ({ data }: BlobEvent) => {
        if (data.size > 0) audioChunksRef.current.push(data);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microphone access denied");
    }
  }, [uploadAudio]);

  const handleStopCapture = useCallback(() => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
    setIsRecording(false);
  }, []);

  return (
    <div>
      <button
        onClick={isRecording ? handleStopCapture : handleStartCapture}
        disabled={isLoading}
      >
        {isRecording ? "⏹ Stop" : "🎙 Press to Record"}
      </button>

      {isLoading && <p>Transcribing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transcription && <p>{transcription}</p>}
    </div>
  );
};
