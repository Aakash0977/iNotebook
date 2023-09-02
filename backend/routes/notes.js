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

module.exports = router;