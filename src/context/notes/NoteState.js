import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const noteInitial = [
        {
          "_id": "64f7495f146160a43350883a",
          "user": "64f2ddc32521832a6953beba",
          "title": "note",
          "description": "WElcome to my note",
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        },
        {
          "_id": "65031605829e8e2d67861c5d",
          "user": "64f2ddc32521832a6953beba",
          "title": "note 2",
          "description": "WElcome to my note 2",
          "tag": "you2",
          "date": "2023-09-14T14:17:41.445Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(noteInitial)

      //Add a note
      const addNote = (title, description, tag)=>{
        console.log("Note add")
        const note=  {
          "_id": "64f7495f146160a433500883a",
          "user": "64f2ddc32521832a6953beba",
          "title": title,
          "description": description,
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }
      //Delete a note
      const deleteNote = () =>{

      }
      //Edit note
      const editNote = () =>{

      }

    return(
        <NoteContext.Provider value ={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;