"use client";

import { createNoteAction, getNoteByIdAction, updateNoteAction } from "@/actions/notes-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoteEditor({ noteId, userId }: { noteId?: string; userId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!noteId);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (noteId || params.id) {
      getNoteByIdAction(noteId || (params.id as string)).then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      });
    }
  }, [noteId, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (noteId) {
        console.log("Updating existing note");
        const result = await updateNoteAction(noteId, { title, content });
        console.log("Update result:", result);
        toast({ title: "Note updated successfully" });
      } else {
        console.log("Creating new note");
        const result = await createNoteAction({ userId, title, content });
        console.log("Create result:", result);
        if (result.status === "success" && result.data) {
          toast({ title: result.message });
          // Clear form on successful creation
          setTitle("");
          setContent("");
          // Optionally, redirect to the newly created note
          router.push(`/notes/${result.data.id}`);
        } else {
          throw new Error(result.message || "Failed to create note");
        }
      }
      console.log("Refreshing router");
      router.refresh();
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error saving note",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      console.log("Form submission completed");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{noteId ? "View Note" : "Create New Note"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                required
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content"
                required
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="whitespace-pre-wrap">{content}</p>
            </>
          )}
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : noteId ? "Update" : "Create"} Note
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Note</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
