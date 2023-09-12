import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const s1 = {
        "name": "Aakash",
        "class": "10"
    }
    const [state, setstate] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
           setstate({
            "name": "sky",
            "class": "1b"
           }) 
        }, 1000);
    }

    return(
        <NoteContext.Provider value ={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;