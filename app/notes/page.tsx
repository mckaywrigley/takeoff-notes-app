import { getProfileByUserIdAction } from "@/actions/profiles-actions";
import Sidebar from "@/components/layout/Sidebar";
import NoteEditor from "@/components/notes/NoteEditor";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) return redirect("/login");

  const { data: profile } = await getProfileByUserIdAction(userId);

  if (!profile) return redirect("/signup");
  if (profile.membership === "free") return redirect("/pricing");

  return (
    <div className="flex h-screen">
      <Sidebar userId={userId} />
      <main className="flex-grow p-4 overflow-auto">
        <NoteEditor userId={userId} />
      </main>
    </div>
  );
}
