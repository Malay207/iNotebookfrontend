import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'

import noteContext from '../context/notes/Notescontext'
const Note = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { first, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else {
            props.alert("danger", "Please Login First")
            navigate('/login');

        }


    }, [])
    const [Add, setAdd] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const updatenote = (note) => {
        ref.current.click();
        setAdd({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
    }
    const ref = useRef(null)
    const onChange = (e) => {
        setAdd({ ...Add, [e.target.name]: e.target.value })
    }
    const onClick = (e) => {
        editNote(Add.id, Add.etitle, Add.edescription, Add.etag);
        props.alert("success", "Note Update Successfully")


    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Note Title</label>
                                    <input type="text" className="form-control" id="title" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={Add.etitle} required minLength={5} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Note Description</label>
                                    <input type="text" className="form-control" id="description" name='edescription' onChange={onChange} value={Add.edescription} required minLength={5} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={Add.etitle.length < 3 || Add.edescription.length < 5} className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { onClick(); }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="  row my-3">
                <h2>Your Note</h2>
                <div className="container">
                    {
                        first.length === 0 && 'No Notes to display'
                    }
                </div>
                {first.map((note) => {
                    return <NoteItem key={note._id} alert={props.alert} updatenote={updatenote} note={note} />
                }
                )}
            </div>
        </>
    )
}

export default Note