import { LessonPageClient } from "../_components/lesson-page-client";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;

  return <LessonPageClient lessonId={id} />;
}
