import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    
    const [note, setNote] = useState({title:"", description: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="form-group my-3">
                        <label htmlFor="Title">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' placeholder="Enter Title" onChange={onChange} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name='description' placeholder="descriptions" onChange={onChange}/>
                    </div>
                    <div className="form-check my-3">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}