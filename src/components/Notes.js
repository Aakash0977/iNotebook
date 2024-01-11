import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { Noteitem } from './Noteitem'
import { AddNote } from './AddNote'
export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose =useRef(null);
    const [note, setNote] = useState({id:"",etitle:"", edescription: "", etag: ""})

    const updateNote = (currentNote ) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote />
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className='container my-3'>
                                    <h2>Add a Note</h2>
                                    <form className='my-3'>
                                        <div className="form-group my-3">
                                            <label htmlFor="Title">Title</label>
                                            <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' value={note.etitle} onChange={onChange} />
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="description">Description</label>
                                            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                        </div>
                                        <div className="form-group my-3">
                                            <label htmlFor="tag">Tag</label>
                                            <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>

    )
}
