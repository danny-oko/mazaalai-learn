import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type NameSignUpProps = {
  fullName: string;
  username: string;
  email: string;
  onChangeFullName: (value: string) => void;
  onChangeUsername: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onGoogle?: () => void;
};

export function NameSignUp({
  fullName,
  username,
  email,
  onChangeFullName,
  onChangeUsername,
  onChangeEmail,
  onGoogle,
}: NameSignUpProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl">What&apos;s your name?</h1>
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={onGoogle}
          className="h-10 w-full max-w-xs rounded-2xl bg-[#E8920A] text-sm text-white hover:bg-[#cf7d09] sm:h-11"
        >
          Continue with Google
        </Button>
      </div>
      <Field>
        <FieldLabel htmlFor="name" className="text-sm font-semibold tracking-wide text-[#E8920A]">
          Full Name
        </FieldLabel>
        <Input
          id="name"
          value={fullName}
          onChange={(e) => onChangeFullName(e.target.value)}
          className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="username" className="text-sm font-semibold tracking-wide text-[#E8920A]">
          User Name
        </FieldLabel>
        <Input
          id="username"
          value={username}
          onChange={(e) => onChangeUsername(e.target.value)}
          className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="email" className="text-sm font-semibold tracking-wide text-[#E8920A]">
          Email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base"
        />
      </Field>
    </div>
  );
}
