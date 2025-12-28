import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/NotesContexts';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNotes } = context;

    const [note, setNotes]= useState({title:"", description:"", tags:""})

    const handleClick=(event)=>{
        event.preventDefault();
        addNotes(note.title, note.description, note.tags);
        setNotes({title:"", description:"", tags:""});
        props.showAlert("Note created successfully", "success")
    }

    const onchange=(e)=>{
        setNotes({...note,[e.target.name]:e.target.value})

    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add a note </h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title}  aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description}  onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tags" name='tags'  value={note.tags} onChange={onchange}/>
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>
        </div>
    )

}

export default AddNote

