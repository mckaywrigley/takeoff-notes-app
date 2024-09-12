import { getProfileByUserIdAction } from "@/actions/profiles-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/login");
  }

  const { data } = await getProfileByUserIdAction(userId);

  if (!data) {
    return redirect("/signup");
  }

  if (data.membership === "free") {
    return redirect("/pricing");
  }

  return <div>notes</div>;
}
