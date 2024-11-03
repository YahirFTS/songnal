import express from "express";
import{
    getNote,
    shareNote,
    deleteNote,
    getNotesByID,
    createNote,
    toggleCompleted,
    getUserByEmail,
    getUserByID,
    getSharedNotesByID,
}  from "./database.js";

const app = express();
app.use(express.json());

app.get("/notes/:id", async (req, res) => {
    const notes = await getNotesByID(req.params.id);
    res.status(200).send(notes);
})

app.listen(8080, () => {
    console.log("server running on port 8080");
});