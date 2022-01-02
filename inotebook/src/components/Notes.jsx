import React ,{useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notecontext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Notes = () => {
    //updateNotes
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const context = useContext(NoteContext)
    
    //Add notes
    const {notes, fetchNote, editNote} = context;
    useEffect(() => {
        fetchNote();
    }, [])
    const ref = useRef(null);
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle: currentNote.title, edescription:currentNote.description, etag: currentNote.tag});
        // setNote(currentNote);
    }
    const handleUpdate = ()=>{
        console.log("Updated note",note );
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setOpen(false);
    }


    return (
        <div>
            <AddNote/>
            <div>
            <Button variant="outlined" sx={{ display: 'none' }} ref={ref} onClick={handleClickOpen}>
                Open responsive dialog
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                fullWidth
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit Note"}
                </DialogTitle>
                <form style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
                    <div className="container">
                        <div className="mb-3 ">
                            <TextField fullWidth name="etitle" label="Title" id="title" value={note.etitle} onChange={onChange}/>
                        </div>
                        <div className="mb-3 ">
                            <TextField
                                fullWidth
                                name="edescription"
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                onChange={onChange}
                                value={note.edescription} 
                            />
                        </div>
                        <div className="mb-3 ">
                            <TextField fullWidth name="etag" label="Tag" id="tag" onChange={onChange} value={note.etag} />
                        </div>
                    </div>
                    {/* <Button variant="contained" >Add Note</Button> */}
                </form>
                <DialogActions sx={{marginBottom:3, marginRight:3}}>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etitle<1 || note.edescription<1} variant="contained" autoFocus onClick={handleUpdate}>
                        Update Note
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

            {/* <UpdateNotes ref={ref}/> */}

            <div className="row my-5 d-flex justify-content-center align-center">
                <h3 className='text-center text-3xl  font-bold	mb-4'>Your Notes</h3>
                {notes.length===0 && 'No notes to be Display'}
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} notes={notes} currentNote={note} updateNote={updateNote}/>
                })}
            </div>
        </div>
    )
}

export default Notes
