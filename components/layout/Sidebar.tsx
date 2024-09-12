import { getNotesByUserIdAction } from "@/actions/notes-actions";
import NotesList from "@/components/notes/NotesList";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Sidebar({ userId }: { userId: string }) {
  const { data: notes } = await getNotesByUserIdAction(userId);

  return (
    <ScrollArea className="w-64 bg-secondary h-screen">
      <aside className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Notes</h2>
        <NotesList notes={notes} />
      </aside>
    </ScrollArea>
  );
}
