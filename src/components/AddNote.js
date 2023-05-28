// import React from 'react'
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/Notescontext'
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [Add, setAdd] = useState({ title: "", description: "", tag: "default" });
    const onChange = (e) => {
        setAdd({ ...Add, [e.target.name]: e.target.value })
    }
    const onClick = (e) => {
        e.preventDefault();
        addNote(Add.title, Add.description, Add.tag);
        setAdd({ title: "", description: "", tag: "default" })
        props.alert("success", "Note Added Successfully")


    }
    return (
        <div className="container  my-3">
            <h2>Add a Note</h2>
            <form onSubmit={onClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={Add.title} required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Note Description</label>
                    <textarea className="form-control" id="description" name="description" rows="5" onChange={onChange} value={Add.description} required minLength={5}></textarea>
                </div>
                <button disabled={Add.title.length < 3 || Add.description.length < 5} type="submit" className="btn btn-primary">Add Note</button>
            </form>

        </div>
    )
}

export default AddNote