import React,{useContext, useState}from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import img from "./notes.png"
import NoteContext from '../context/notecontext';

const AddNote = () => {
    const context = useContext(NoteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const add=()=>{
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div className="flex justify-content-center">
        <div className='max-w-md w-full space-y-8 ' >
            <div className="container my-5 d-flex flex-column align-items-center rounded-md shadow-xl p-4 max-w-md w-full space-y-8 rounded-md shadow-xl p-4">
                <h3 className='text-3xl  font-bold	mb-4'>Add a Note</h3>
                {/* <form style={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "center" }}> */}
                <form className='mt-8 space-y-6 w-full flex flex-column'>
                    <div className="container">
                        <div className="mb-3 -space-y-px">
                            <TextField fullWidth name="title" label="Title" id="title" value={note.title}onChange={onChange} />
                        </div>
                        <div className="mb-3 ">
                            <TextField
                                fullWidth
                                name="description"
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                onChange={onChange}
                                value={note.description}
                            />
                        </div>
                        <div className="mb-3 ">
                            <TextField fullWidth name="tag" label="Tag" id="tag" value={note.tag} onChange={onChange} />
                        </div>
                    <Button fullWidth className="my-2" variant="contained" disabled={note.title<1 || note.description<1} onClick={add}>Add Note</Button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default AddNote
