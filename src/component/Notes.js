import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/NotesContexts';
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNotes } = context;
    let navigate = useNavigate();
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etags: "" })


    const RefClose = useRef(null)
    const ref = useRef(null)


    useEffect(() => {
        if(localStorage.getItem('token') != null){
            getNotes();
        }
        else{
            navigate('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags })

    }

    const onchange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })

    }

    const handleClick = (e) => {
        console.log("updatting the note", note)
        editNotes(note.id, note.etitle, note.edescription, note.etags );
        RefClose.current.click();
        props.showAlert("Note Updated successfully", "success")

    }




    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container my-3'>
                                <h2>add a note </h2>
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etags" name='etags' value={note.etags} onChange={onchange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={RefClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5 } className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2> Your Notes</h2>
                <div className='container mx-2'>
                {notes.length===0 &&'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>

    )
}

export default Notes