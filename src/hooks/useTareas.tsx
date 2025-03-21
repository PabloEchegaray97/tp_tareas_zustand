import { useShallow } from "zustand/react/shallow"
import { tareaStore } from "../store/tareaStore"
import { getAllTareas, postNuevaTarea, editarTarea as editarTareaHttp, eliminarTareaPorID } from "../http/tarea"
import { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"

export const useTareas = () => {
    const { tareas, setArrayTareas, agregarNuevaTarea, eliminarTarea, editarTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarTarea: state.eliminarTarea,
        editarTarea: state.editarTarea,
    })))
    const getTareas = async () => {
        const response = await getAllTareas();
        if (response) {
            setArrayTareas(response);
        }
    }
    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea);
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire({
                title: 'Tarea creada correctamente',
                icon: 'success'
            });
        } catch (error) {
            eliminarTarea(nuevaTarea.id!);
            console.error(error);
        }
    }
    const putTareaEditar = async (tareaEditada: ITarea) => {

        const estadoPrevio = tareas.find((el) => el.id == tareaEditada.id);
        editarTarea(tareaEditada);
        try {
            await editarTareaHttp(tareaEditada);
            Swal.fire({
                title: 'Tarea editada correctamente',
                icon: 'success'
            });
        } catch (error) {
            if (estadoPrevio) {
                editarTarea(estadoPrevio);
            }
            console.error(error);
        }
    }
    const eliminarUnaTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id == idTarea);
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });
        if (confirm.isConfirmed) {
            eliminarTarea(idTarea);
            try {
                await eliminarTareaPorID(idTarea);
            Swal.fire({
                title: 'Tarea eliminada correctamente',
                icon: 'success'
            });
        } catch (error) {
            if (estadoPrevio) {
                agregarNuevaTarea(estadoPrevio);
                }
                console.error(error);
            }
        }
    }
    return {
        getTareas, crearTarea, putTareaEditar, eliminarUnaTarea, tareas
    }
}
