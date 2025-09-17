import { useState } from "react";
import type { Task, Column as ColumnType } from "./types"
import { Column } from "./Column";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'to do'},
  { id: 'IN_PROGRESS', title: 'In Progress'},
  { id: 'DONE', title: 'Done'},
]

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    status: 'TODO',
    title: 'research project',
    description: 'Gather requirements and create initial documentation',
  },
  {
    id: '2',
    status: 'TODO',
    title: 'Design System',
    description: 'Create component library and design tokens',
  },
  {
    id: '3',
    status: 'IN_PROGRESS',
    title: 'API Integration',
    description: 'Implement REST API endpoints',
  },
  {
    id: '4',
    status: 'DONE',
    title: 'Testing',
    description: 'Write unit tests for core functionality',
  },
]

function App() {

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent){
    const { active, over } = event;

    if(!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status']

    setTasks(() => tasks.map((task) => task.id === taskId ? {...task, status : newStatus} : task))
  }


  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map(column =>(
              <Column key={column.id} column={column} tasks={tasks.filter(task => task.status === column.id)} />
            ))}
        </DndContext>
      </div>
    </div>
  )
}

export default App
