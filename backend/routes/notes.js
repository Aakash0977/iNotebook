const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')

// Route: 1 - Fetch aal the notes of logged in user: GET  "api/notes/fetchallnotes". No login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurs")
    }
});

// Route: 2 - Add notes of logged in user: POST  "api/notes/addnote". No login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter any decription').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

       //If there is error return bad request and error message
     const result = validationResult(req);
     if (!result.isEmpty()) {
         return res.status(400).json({ result: result.array() });
     }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote)

    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurs")
    }

});

// Route: 2 - Add notes of logged in user: PUT  "api/notes/updatenote/:id". No login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    //create a new note object 
    const newNote = {};
    if (title){newNote.title = title}
    if (description){newNote.description = description}
    if (tag){newNote.tag = tag}

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not found") }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate (req.params.id, {$set: newNote}, {new:true})
    res.json({note});

});

module.exports = router;