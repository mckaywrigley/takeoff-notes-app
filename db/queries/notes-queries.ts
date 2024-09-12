import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertNote, notesTable, SelectNote } from "../schema/notes-schema";

export const createNote = async (data: InsertNote) => {
  try {
    const [newNote] = await db.insert(notesTable).values(data).returning();
    return newNote;
  } catch (error) {
    console.error("Error creating note: ", error);
    throw new Error("Failed to create note");
  }
};

export const getNoteById = async (id: string) => {
  try {
    const note = await db.query.notes.findFirst({
      where: eq(notesTable.id, id)
    });
    return note;
  } catch (error) {
    console.error("Error getting note by ID:", error);
    throw new Error("Failed to get note");
  }
};

export const getNotesByUserId = async (userId: string): Promise<SelectNote[]> => {
  try {
    const notes = await db.query.notes.findMany({
      where: eq(notesTable.userId, userId)
    });
    return notes;
  } catch (error) {
    console.error("Error getting notes by user ID:", error);
    throw new Error("Failed to get notes");
  }
};

export const updateNote = async (id: string, data: Partial<InsertNote>) => {
  try {
    const [updatedNote] = await db.update(notesTable).set(data).where(eq(notesTable.id, id)).returning();
    return updatedNote;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note");
  }
};

export const deleteNote = async (id: string) => {
  try {
    await db.delete(notesTable).where(eq(notesTable.id, id));
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
};
