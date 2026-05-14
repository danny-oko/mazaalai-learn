import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120;

const CHIMEGE_TRANSCRIBE_URL = "https://api.chimege.com/v1.2/transcribe";
const CHIMEGE_TIMEOUT_MS = 115_000;
const MAX_AUDIO_SIZE_BYTES = 50 * 1024 * 1024;

const getErrorMessage = (error: unknown) => {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "Transcription timeout. Chimege did not respond in time.";
  }

  return error instanceof Error ? error.message : "Transcription failed";
};

const getErrorStatus = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError" ? 504 : 500;

const trimForLog = (value: string) =>
  value.length > 500 ? `${value.slice(0, 500)}...` : value;

export const POST = async (req: NextRequest) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, CHIMEGE_TIMEOUT_MS);

  try {
    const data = await req.formData();
    const file = data.get("audio");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Audio file is required." },
        { status: 400 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "Uploaded audio file is empty." },
        { status: 400 },
      );
    }

    if (file.size > MAX_AUDIO_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Uploaded audio file is too large." },
        { status: 413 },
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Chimege upload:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }

    const response = await fetch(CHIMEGE_TRANSCRIBE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        Punctuate: "true",
        Token: "86d6ceb9ca4d406247fbb4f14d5c2b443e27d8686ab8a776583ab83867e928ad",
      },
      body: file,
      signal: controller.signal,
    });

    const audioToText = await response.text();

    if (process.env.NODE_ENV === "development") {
      console.log("Chimege response:", {
        status: response.status,
        transcriptLength: audioToText.length,
      });
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Chimege API returned ${response.status}: ${trimForLog(
            audioToText,
          )}`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      data: audioToText,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Chimege transcription failed:", message);

    return NextResponse.json(
      { error: message },
      { status: getErrorStatus(error) },
    );
  } finally {
    clearTimeout(timeoutId);
  }
};
