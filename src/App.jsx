
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import ModuleGrid from "@/components/ModuleGrid";
import DateSelector from "@/components/DateSelector";
import { format } from "date-fns";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem("moduleLayout");
    return saved ? JSON.parse(saved) : ["todo"];
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [newStreakName, setNewStreakName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("moduleLayout", JSON.stringify(modules));
    loadStreaks();
  }, [modules]);

  useEffect(() => {
    document.body.className = isDark ? "dark" : "";
  }, [isDark]);

  async function loadStreaks() {
    try {
      const data = await api.getStreak();
      setStreaks(data);
    } catch (error) {
      console.error("Failed to load streaks:", error);
    }
  }

  function handleDragStart(event) {
    setDraggedItem(event.active.id);
  }

  function handleDragEnd(event) {
    setDraggedItem(null);
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          toast({
            title: "Module moved",
            description: "The module position has been updated",
          });
          return items;
        }
        return items;
      });
    }
  }

  const addNewStreak = () => {
    if (newStreakName.trim()) {
      const newStreakId = `streak-${newStreakName.trim()}-${Date.now()}`;
      setModules(prev => [...prev, newStreakId]);
      setNewStreakName("");
      setDialogOpen(false);
      toast({
        title: "Streak added",
        description: `New streak "${newStreakName}" has been created`,
      });
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Layout>
        <div className={`relative min-h-screen ${isDark ? "bg-transparent" : "bg-[#FDFFFC]/95"} p-4 md:p-8 flex flex-col`}>
          <Header 
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
            onAddStreak={() => setDialogOpen(true)}
          />
          
          <DateSelector
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDays={selectedDays}
            onDayToggle={(date) => {
              const dateStr = format(date, "yyyy-MM-dd");
              setSelectedDays(prev =>
                prev.includes(dateStr)
                  ? prev.filter(d => d !== dateStr)
                  : [...prev, dateStr]
              );
            }}
          />

          <DndContext 
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <ModuleGrid 
              modules={modules}
              draggedItem={draggedItem}
            />
          </DndContext>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className={`${isDark ? "bg-[#09080d]" : "bg-[#FDFFFC]"} border border-[#fe6807]/20`}>
              <DialogHeader>
                <DialogTitle className={isDark ? "text-[#FDFFFC]" : "text-[#09080d]"}>
                  Create New Streak
                </DialogTitle>
                <DialogDescription className={`${isDark ? "text-[#FDFFFC]" : "text-[#09080d]"}/70`}>
                  Give your new streak a name to help you track it.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={newStreakName}
                onChange={(e) => setNewStreakName(e.target.value)}
                placeholder="Enter streak name..."
                className={`${isDark ? "bg-[#09080d]" : "bg-[#FDFFFC]"} border-[#fe6807]/20`}
              />
              <DialogFooter>
                <Button onClick={addNewStreak} className="bg-[#fe6807] hover:bg-[#fe6807]/80">
                  Create Streak
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Toaster />
        </div>
      </Layout>
    </>
  );
}

export default App;
