const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1 :- Get all the notes: GET "/api/notes/fetchallnote". No Login Required
router.get('/fetchallnotes', fetchuser, 
    async(req,res)=>{
        try {
            const notes = await Notes.find({user: req.user.id});
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal Server error occured");
        }
})

//Route 2 :- Add a new note: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, 
    async(req,res)=>{
        try {
            const {title, description, tag} = req.body;
            const note = new Notes({
                title,description,tag, user: req.user.id
            })
            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal Server error occured");
        }
        
})



//Route 3 :- Update a note: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id',fetchuser, 
        async(req,res)=>{
            try {
                const {title, description, tag} = req.body;
                //Create a newNote Object
                const newNote = {};
                if(title){newNote.title = title;}
                if(description){newNote.description = description;}
                if(tag){newNote.tag = tag;}

                //Find  the Note to be updated and update it

                let note = await Notes.findById(req.params.id);
                if(!note){
                    res.status(404).send("Not Found");
                }
                if(note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }
                note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
                res.json(note);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Internal Server error occured");
            }

})
//Route 4 :- Delete a note: DELETE "/api/notes/updatenote". Login Required
router.delete('/deletenote/:id',fetchuser, 
        async(req,res)=>{
            try{
                //Find the note to be delete
                let note = await Notes.findById(req.params.id);
                if(!note){
                    res.status(404).send("Not Found");
                }
                //Allow deletion only if user owns this note
                if(note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }
                note = await Notes.findByIdAndDelete( req.params.id)
                res.json({"Success":"Note has been deleted", note:note});
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Internal Server error occured");
            }
            //Find the note to be delete
         
})          
module.exports = router;