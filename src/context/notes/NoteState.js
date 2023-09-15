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
        },
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
          "_id": "64f7495f146160a43350883a",
          "user": "64f2ddc32521832a6953beba",
          "title": "note",
          "description": "WElcome to my note",
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        },
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
          "_id": "64f7495f146160a43350883a",
          "user": "64f2ddc32521832a6953beba",
          "title": "note",
          "description": "WElcome to my note",
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        },
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
          "_id": "64f7495f146160a43350883a",
          "user": "64f2ddc32521832a6953beba",
          "title": "note",
          "description": "WElcome to my note",
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        },
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
          "_id": "64f7495f146160a43350883a",
          "user": "64f2ddc32521832a6953beba",
          "title": "note",
          "description": "WElcome to my note",
          "tag": "you",
          "date": "2023-09-05T15:29:35.404Z",
          "__v": 0
        },
      ]
      const [notes, setNotes] = useState(noteInitial)
    return(
        <NoteContext.Provider value ={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;