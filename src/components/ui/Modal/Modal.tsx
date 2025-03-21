import styles from './Modal.module.css'
import { tareaStore } from '../../../store/tareaStore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';
type IModal = {
    handleCloseModal: () => void,
}
const initialState: ITarea = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
}
export const Modal: React.FC<IModal> = ({handleCloseModal}) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);
    const { crearTarea, putTareaEditar } = useTareas();
    const [formValues, setFormValues] = useState<ITarea>(initialState);

    useEffect(() => {
        if(tareaActiva) setFormValues(tareaActiva);
    }, []);
    console.log(formValues);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({...prev, [`${name}`]: value}));
    }

    const handleSubmit =  (e: FormEvent) => {
        e.preventDefault();
        console.log(formValues);
        if(tareaActiva) {
            putTareaEditar(formValues);
        } else {
            crearTarea({...formValues, id: new Date().toDateString()});
        }
        setTareaActiva(null);
        handleCloseModal();
    }


    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div>
                    <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
                </div>
                <form className={styles.formContent} onSubmit={handleSubmit}>
                    <div>
                        <input type="text" required autoComplete='off' name='titulo' placeholder='Título' value={formValues.titulo} onChange={handleChange}     />
                        <textarea required autoComplete='off' name='descripcion' placeholder='Descripción' value={formValues.descripcion} onChange={handleChange}/>
                        <input type="date" required autoComplete='off' name='fechaLimite' placeholder='Fecha límite' value={formValues.fechaLimite} onChange={handleChange}/>
                    </div>
                    <div className={styles.buttonCard}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit">{tareaActiva ? "Editar tarea" : "Crear tarea"}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
