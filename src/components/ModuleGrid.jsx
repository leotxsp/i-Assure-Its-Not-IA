
import React from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import TodoList from "@/components/TodoList";
import StreakWidget from "@/components/StreakWidget";

function ModuleGrid({ modules, draggedItem }) {
  return (
    <SortableContext items={modules} strategy={rectSortingStrategy}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6 max-w-7xl mx-auto">
        {modules.map((moduleId) => (
          <div 
            key={moduleId} 
            className="relative group"
          >
            {moduleId.includes("streak") && (
              <StreakWidget 
                id={moduleId} 
                name={moduleId.split("-")[1]} 
              />
            )}
            {moduleId === "todo" && <TodoList id={moduleId} />}
            {draggedItem && (
              <div className="absolute inset-0 border-2 border-dashed border-[#fe6807] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        ))}
      </div>
    </SortableContext>
  );
}

export default ModuleGrid;
