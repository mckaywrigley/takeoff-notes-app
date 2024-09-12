import { getNoteByIdAction } from "@/actions/notes-actions";
import NoteEditor from "@/components/notes/NoteEditor";
import { auth } from "@clerk/nextjs/server";

export default async function NotePage({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please log in to view this note.</div>;
  }

  const { data: note } = await getNoteByIdAction(params.id);

  if (!note) {
    return <div>Note not found.</div>;
  }

  return (
    <NoteEditor
      noteId={params.id}
      userId={userId}
    />
  );
}
