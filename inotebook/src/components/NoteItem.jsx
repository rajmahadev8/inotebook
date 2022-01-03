import React,{useContext} from 'react'
import NoteContext from '../context/notecontext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import img from './notes.png'
// import UpdateNotes from './UpdateNotes';

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;
    const { notes, updateNote } = props;
    return (
        // <div className="col-md-3">
        //     <div className="card my-3 bg-success bg-gradient" style={{"--bs-bg-opacity": ".5"}}>
        //         <div className="card-body">
        //             <div className="d-flex justify-content-between">
        //                 <h5 className="card-title">{note.title}</h5>
        //                 <div className="icons">
        //                     <i className="far fa-trash-alt mx-2"></i>
        //                     <i className="far fa-edit mx-2"></i>
        //                 </div>
        //             </div>
        //             <p className="card-text">{note.description}</p>
        //         </div>
        //     </div>
        // <Card variant="outlined">{note.title}</Card>

        // </div>
        <Card sx={{ width: 250, m: 3}} >
            <img src={img} alt="note" className='absolute' style={{width: "120px", marginLeft: "180px"}}/>
            <CardContent>
                <Typography sx={{ fontSize: 21 }} color="text.secondary" gutterBottom>
                    {notes.title}
                </Typography>
                <Typography variant="body1">
                    {notes.description}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" size="large" onClick={() => {deleteNote(notes._id)}}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Edit" onClick={()=>{updateNote(notes)}}>
                    <EditIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default NoteItem
