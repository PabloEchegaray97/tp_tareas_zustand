import { getAllTareas } from "../../http/tarea";
import { useEffect } from "react";
import { Header } from "../ui/Header/Header";
import { ListTareas } from "../ui/ListTareas/ListTareas";
export const TareasScreen = () => {
    const getTareas = async () => {
        const result = await getAllTareas();
        console.log(result);
    }

    useEffect(() => {
        getTareas();
    }, []);

  return (
    <div>
        <Header />
        <ListTareas />
    </div>
  )
}
