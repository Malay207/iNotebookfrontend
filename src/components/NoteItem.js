import React, { useContext } from 'react'
import noteContext from '../context/notes/Notescontext'
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updatenote } = props
    const onclick = (id) => {
        deleteNote(id);
        props.alert("success", "Note Deleted Successfully")

    }

    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { onclick(note._id) }}></i>
                        <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={() => { updatenote(note) }}></i>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NoteItem