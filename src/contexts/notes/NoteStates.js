import { useState } from "react";
import noteContext from "./NotesContexts";

const NoteState = (props) => {
  const host = "http://localhost:5000"
 
  const noteInitial =[]
  const [notes, setNotes] = useState(noteInitial);


  //FETCH ALL NOTES
  const getNotes = async () => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkxYWZlNGU1OWRiZDAxYzVmYzRlODliIn0sImlhdCI6MTc2MzM3Njc0OX0.dl3iqnlAYA2qRm8Jwk-WGUWdccKwBPTyLX6GlxH-3B0"
      },
    });
    
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }



  //ADD A NOTES
  const addNotes = async (title, description, tags) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkxYWZlNGU1OWRiZDAxYzVmYzRlODliIn0sImlhdCI6MTc2MzM3Njc0OX0.dl3iqnlAYA2qRm8Jwk-WGUWdccKwBPTyLX6GlxH-3B0"
      },
      body: JSON.stringify({title, description, tags})
    });


    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //EDIT A NOTES
  const editNotes = async (id, title, description, tags) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkxYWZlNGU1OWRiZDAxYzVmYzRlODliIn0sImlhdCI6MTc2MzM3Njc0OX0.dl3iqnlAYA2qRm8Jwk-WGUWdccKwBPTyLX6GlxH-3B0"
      },
      body: JSON.stringify({title, description, tags})
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes))
    //LOGIN TO EDIT IN CLIENT
    for (let index = 0; index < newNotes.length; index++) {
      const element =newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;

        break;
      }

    }
    setNotes(newNotes);
  }


  //DELETE A NOTES
  const deleteNotes = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkxYWZlNGU1OWRiZDAxYzVmYzRlODliIn0sImlhdCI6MTc2MzM3Njc0OX0.dl3iqnlAYA2qRm8Jwk-WGUWdccKwBPTyLX6GlxH-3B0"
      }
    });
    const json = response.json();
    console.log(json);

    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }




  return (
    <noteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;