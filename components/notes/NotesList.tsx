"use client";

import { deleteNoteAction } from "@/actions/notes-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectNote } from "@/db/schema/notes-schema";
import { useRouter } from "next/navigation";

export default function NotesList({ notes }: { notes: SelectNote[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await deleteNoteAction(id);
    router.refresh();
  };

  const handleEdit = (id: string) => {
    router.push(`/notes/${id}`);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{note.content.substring(0, 50)}...</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleEdit(note.id)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
