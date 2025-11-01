// src/state/useFileSystem.ts
import { create } from "zustand";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  content?: string;
  dateCreated: string;
  dateModified: string;
}

export interface Folder {
  id: string;
  name: string;
  items: FileItem[];
  position: { x: number; y: number };
}

interface FileSystemState {
  folders: Folder[];
  trashItems: FileItem[];
  createFolder: (name: string, position: { x: number; y: number }) => void;
  deleteFolder: (id: string) => void;
  renameFolder: (id: string, newName: string) => void;
  addItemToFolder: (folderId: string, item: FileItem) => void;
  moveToTrash: (item: FileItem) => void;
  emptyTrash: () => void;
  restoreFromTrash: (id: string) => void;
}

export const useFileSystem = create<FileSystemState>((set) => ({
  folders: [
   
    {
      id: "documents",
      name: "Documents",
      items: [{
        id: "1",
        name: "Cybersecurity_Practical_Report.pdf",
        type: "file",
        dateCreated: "2024-09-15",
        dateModified: "2024-10-22",
      },
      {
        id: "2",
        name: "ML_Lab_Notebook.docx",
        type: "file",
        dateCreated: "2024-08-10",
        dateModified: "2024-09-18",
      },
      {
        id: "3",
        name: "Network_Security_Assignment.pdf",
        type: "file",
        dateCreated: "2024-07-20",
        dateModified: "2024-08-30",
      },],
      position: { x: 50, y: 180 },
    },
  ],
  
  trashItems: [
    
    {
      id: "1",
      name: "Cybersecurity_Practical_Report.pdf",
      type: "file",
      dateCreated: "2024-09-15",
      dateModified: "2024-10-22",
    },
    {
      id: "2",
      name: "ML_Lab_Notebook.docx",
      type: "file",
      dateCreated: "2024-08-10",
      dateModified: "2024-09-18",
    },
    {
      id: "3",
      name: "Network_Security_Assignment.pdf",
      type: "file",
      dateCreated: "2024-07-20",
      dateModified: "2024-08-30",
    },
    {
      id: "4",
      name: "Degree_Certificate.pdf",
      type: "file",
      dateCreated: "2024-09-15",
      dateModified: "2024-10-22",
    },
    
    {
      id: "6",
      name: "profile.png",
      type: "file",
      dateCreated: "2024-09-15",
      dateModified: "2024-10-22",
    },
  ],

  createFolder: (name, position) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          id: `folder-${Date.now()}`,
          name,
          items: [],
          position,
        },
      ],
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
    })),

  renameFolder: (id, newName) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === id ? { ...f, name: newName } : f
      ),
    })),

  addItemToFolder: (folderId, item) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === folderId ? { ...f, items: [...f.items, item] } : f
      ),
    })),

  moveToTrash: (item) =>
    set((state) => ({
      trashItems: [...state.trashItems, item],
    })),

  emptyTrash: () => set({ trashItems: [] }),

  restoreFromTrash: (id) =>
    set((state) => ({
      trashItems: state.trashItems.filter((item) => item.id !== id),
    })),
}));