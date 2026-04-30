type ClerkErrorLike = {
  errors?: Array<{ longMessage?: string; message?: string }>;
};

export function getClerkErrorMessage(
  err: unknown,
  fallback: string,
): string {
  const firstError = (err as ClerkErrorLike)?.errors?.[0];
  return firstError?.longMessage ?? firstError?.message ?? fallback;
}
