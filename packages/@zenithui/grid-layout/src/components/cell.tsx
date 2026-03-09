import { cn } from "@zenithui/utils";
import { useState } from "react";
import type { GridCell } from "../types";

/**
 * Props for the GridItem component.
 * @template T - The type of the data contained within the cell.
 */
export interface GridItemProps<T> {
  cell: GridCell<T>;
  parentRowId: string;
  isDragging?: boolean;
  isResizing?: boolean;
  isDragTarget?: boolean;
  dragTargetPosition?: "left" | "right" | "swap" | null;
  className?: string;

  // Custom renders
  renderItem: (cell: GridCell<T>) => React.ReactNode;
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>;
  }) => React.ReactNode;

  // Handlers
  onDragStart: (cellId: string, parentRowId: string) => void;
  onDragOver: (
    e: React.DragEvent,
    cellId: string,
    position: "left" | "right" | "swap",
  ) => void;
  onDrop: (
    e: React.DragEvent,
    cellId: string,
    position: "left" | "right" | "swap",
  ) => void;
  onDragEnd: () => void;
  onDragLeave: () => void;
}

/**
 * Internal component representing a single cell in the grid layout.
 * Manages cell-level drag and drop interactions and rendering of the cell content.
 *
 * @template T - The type of the data contained within the cell.
 * @param props - The component props.
 */
export function GridItem<T>({
  cell,
  parentRowId,
  isDragging,
  isResizing,
  isDragTarget,
  dragTargetPosition,
  className,
  renderItem,
  renderDragHandle,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onDragLeave,
}: GridItemProps<T>) {
  const [internalDropPos, setInternalDropPos] = useState<
    "left" | "right" | "swap" | null
  >(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/grid-cell",
      JSON.stringify({ cellId: cell.id, parentRowId }),
    );
    onDragStart(cell.id, parentRowId);
  };

  const handleDragOverLocal = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;

    const threshold = rect.width * 0.25;
    let position: "left" | "right" | "swap" = "swap";

    if (x < threshold) position = "left";
    else if (x > rect.width - threshold) position = "right";

    setInternalDropPos(position);
    onDragOver(e, cell.id, position);
  };

  const handleDragLeaveLocal = () => {
    setInternalDropPos(null);
    onDragLeave();
  };

  const handleDropLocal = (e: React.DragEvent) => {
    e.preventDefault();
    if (internalDropPos) {
      onDrop(e, cell.id, internalDropPos);
    } else {
      onDrop(e, cell.id, "swap");
    }
    setInternalDropPos(null);
  };

  const activeDropPos = isDragTarget
    ? dragTargetPosition || internalDropPos
    : null;

  return (
    <div
      className={cn(
        "group/cell relative h-full",
        "transition-[flex] duration-300 ease-in-out",
        isDragging && "opacity-40",
        isResizing && "pointer-events-none transition-none select-none",
        cell.className,
        className,
      )}
      style={{
        flex: cell.width ?? 1,
        minWidth: 0,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOverLocal}
      onDragLeave={handleDragLeaveLocal}
      onDrop={handleDropLocal}
      onDragEnd={onDragEnd}
      data-grid-type="cell"
    >
      {/* Drop Zone Highlights */}
      {activeDropPos === "left" && (
        <div className="absolute inset-y-0 left-0 z-20 w-1 animate-pulse bg-blue-500/80" />
      )}
      {activeDropPos === "right" && (
        <div className="absolute inset-y-0 right-0 z-20 w-1 animate-pulse bg-blue-500/80" />
      )}
      {activeDropPos === "swap" && (
        <div className="absolute inset-0 z-20 animate-pulse bg-blue-500/10 ring-2 ring-blue-500" />
      )}

      {/* Internal Content */}
      <div className="relative h-full w-full">{renderItem(cell)}</div>

      {/* Custom or default drag handle */}
      <div className="absolute top-2 left-2 z-10 cursor-grab opacity-0 transition-opacity group-hover/cell:opacity-100 active:cursor-grabbing">
        {renderDragHandle ? (
          renderDragHandle({
            dragHandleProps: { "aria-label": "Drag to reorder" },
          })
        ) : (
          <div className="rounded border border-neutral-200 bg-white/50 p-1 shadow-sm backdrop-blur-sm">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-500"
              aria-hidden="true"
            >
              <path
                d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM5.5 14C4.67157 14 4 13.3284 4 12.5C4 11.6716 4.67157 11 5.5 11C6.32843 11 7 11.6716 7 12.5C7 13.3284 6.32843 14 5.5 14ZM9.5 6C10.3284 6 11 5.32843 11 4.5C11 3.67157 10.3284 3 9.5 3C8.67157 3 8 3.67157 8 4.5C8 5.32843 8.67157 6 9.5 6ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM5.5 10C4.67157 10 4 9.32843 4 8.5C4 7.67157 4.67157 7 5.5 7C6.32843 7 7 7.67157 7 8.5C7 9.32843 6.32843 10 5.5 10ZM9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
