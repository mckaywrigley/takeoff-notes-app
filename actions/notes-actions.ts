"use server";

import { createNote, deleteNote, getNoteById, getNotesByUserId, updateNote } from "@/db/queries/notes-queries";
import { InsertNote } from "@/db/schema/notes-schema";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

export async function createNoteAction(data: InsertNote): Promise<ActionState> {
  try {
    const newNote = await createNote(data);
    revalidatePath("/notes");
    return { status: "success", message: "Note created successfully", data: newNote };
  } catch (error) {
    return { status: "error", message: "Error creating note" };
  }
}

export async function getNoteByIdAction(id: string): Promise<ActionState> {
  try {
    const note = await getNoteById(id);
    if (!note) {
      return { status: "error", message: "Note not found" };
    }
    return { status: "success", message: "Note retrieved successfully", data: note };
  } catch (error) {
    return { status: "error", message: "Failed to get note" };
  }
}

export async function getNotesByUserIdAction(userId: string): Promise<ActionState> {
  try {
    const notes = await getNotesByUserId(userId);
    return { status: "success", message: "Notes retrieved successfully", data: notes };
  } catch (error) {
    return { status: "error", message: "Failed to get notes" };
  }
}

export async function updateNoteAction(id: string, data: Partial<InsertNote>): Promise<ActionState> {
  try {
    const updatedNote = await updateNote(id, data);
    revalidatePath("/notes");
    return { status: "success", message: "Note updated successfully", data: updatedNote };
  } catch (error) {
    return { status: "error", message: "Failed to update note" };
  }
}

export async function deleteNoteAction(id: string): Promise<ActionState> {
  try {
    await deleteNote(id);
    revalidatePath("/notes");
    return { status: "success", message: "Note deleted successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to delete note" };
  }
}
