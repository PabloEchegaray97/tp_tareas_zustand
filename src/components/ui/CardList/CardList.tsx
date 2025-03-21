import styles from './CardList.module.css'
import { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas';
type ICardList = {
    tarea: ITarea,
    handleOpenModalEdit: (tarea: ITarea) => void,
}

export const CardList: React.FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
    const { eliminarUnaTarea } = useTareas();
    const eliminarTarea = () => {
        if(tarea.id) eliminarUnaTarea(tarea.id);
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }
    return (
        <div className={styles.containerCard}>
            <div className={styles.containerInfo}>
                <h3>Título: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>Fecha límite: <b>{tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.actionCard}>
                <button onClick={editarTarea}>Editar</button>
                <button onClick={eliminarTarea}>Eliminar</button>
            </div>
        </div>
    )
}
