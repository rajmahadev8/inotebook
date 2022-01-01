import React, { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const UpdateNotes = (props, ref) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const {currentNote} = props;
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
        console.log(currentNote)
        setNote(currentNote);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const add=()=>{
        // addNote(note.title,note.description,note.tag)
        
    }

    return (
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
                            <TextField fullWidth name="etitle" label="Title" id="title" onChange={onChange} />
                        </div>
                        <div className="mb-3 ">
                            <TextField
                                fullWidth
                                name="edescription"
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3 ">
                            <TextField fullWidth name="etag" label="Tag" id="tag" onChange={onChange} />
                        </div>
                    </div>
                    {/* <Button variant="contained" >Add Note</Button> */}
                </form>
                <DialogActions sx={{marginBottom:3, marginRight:3}}>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" autoFocus onClick={handleClose}>
                        Update Note
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default forwardRef(UpdateNotes)