// src/components/Folder.tsx
"use client";

import { FileText, Folder as FolderIcon, Trash2 } from "lucide-react";
import { useFileSystem } from "@/state/useFileSystem";

interface FolderProps {
  folderId: string;
}

export default function Folder({ folderId }: FolderProps) {
  const { folders, moveToTrash } = useFileSystem();
  const folder = folders.find((f) => f.id === folderId);

  if (!folder) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Folder not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-kali-text flex items-center gap-2">
          <FolderIcon className="w-6 h-6 text-kali-accent" />
          {folder.name}
        </h2>
        <span className="text-sm text-gray-400">
          {folder.items.length} items
        </span>
      </div>

      {folder.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FolderIcon className="w-16 h-16 mb-4 opacity-50" />
          <p>This folder is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {folder.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-kali-accent/10 cursor-pointer group"
            >
              <div className="relative">
                <FileText className="w-12 h-12 text-kali-accent mb-2" />
                <button
                  onClick={() => moveToTrash(item)}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1 transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
              </div>
              <span className="text-xs text-kali-text text-center break-words w-full">
                {item.name}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {item.dateModified}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}