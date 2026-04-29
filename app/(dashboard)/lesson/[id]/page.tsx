import { LessonPageClient } from "../_components/lesson-page-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  return <LessonPageClient lessonId={id} userId="dev-user" />;
}
