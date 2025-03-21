import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore {
    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayTareas: (arrayTareas: ITarea[]) => void;
    agregarNuevaTarea: (nuevaTarea: ITarea) => void;
    editarTarea: (tareaActualizada: ITarea) => void;
    eliminarTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
    tareas: [],
    tareaActiva: null,
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn })),
    setArrayTareas: (arrayTareas) => set(() => ({ tareas: arrayTareas })),
    agregarNuevaTarea: (nuevaTarea) => set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),
    editarTarea: (tareaEditada) => set((state) => ({ tareas: state.tareas.map(tarea => tarea.id === tareaEditada.id ? tareaEditada : tarea) })),
    eliminarTarea: (idTarea) => set((state) => ({ tareas: state.tareas.filter(tarea => tarea.id !== idTarea) })),
}));
