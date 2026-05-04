import { redirect } from "next/navigation";

/** Everyone hits `/sign-in` first; middleware sends signed-in users to `/home`. */
export default function EntryPage() {
  redirect("/sign-in");
}
