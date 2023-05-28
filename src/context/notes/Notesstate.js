import NoteContext from "./Notescontext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "https://inotebookserver-3mx1.onrender.com"
    const notes = [];
    const [first, setfirst] = useState(notes);
    //get all note
    const getNote = async () => {
        //API call
        const response = await fetch(`${host}/api/note/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setfirst(json);

    }
    //add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setfirst(first.concat(note));

    }

    //delete note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);
        //API call
        const newnote = first.filter((note) => {
            return note._id !== id;
        })
        setfirst(newnote);
    }
    //edit note
    const editNote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        let newnotes = JSON.parse(JSON.stringify(first))

        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }

        }
        setfirst(newnotes);
    }

    return (
        <NoteContext.Provider value={{ first, setfirst, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;