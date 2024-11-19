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
import cors from 'cors';

const corsOption = {
    origin: "http://127:0.0.1:5173",
    methods: ["POST", "GET"],
    credentials: true,
};


const app = express();
app.use(express.json());
app.use(cors(corsOption));

app.get("/notes/:id", async (req, res) => {
    const notes = await getNotesByID(req.params.id);
    res.status(200).send(notes);
})

app.get("/notes/shared_notes/:id", async (req, res) => {
    const note = await getSharedNotesByID(req.params.id);
    const author = await getUserByID(note.user_id);
    const shared_with = await getUserByID(note.shared_with_id);
    res.status(200).send({author, shared_with});

});

app.get("/users/:id", async(req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
});

app.put("/notes/:id", async(req, res) => {
    const { value } = req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(200).send(note);

});

app.delete("/notes/:id", async (req, res) => {
    await deleteNote(req.params.id);
    res.send({message: "Note deleted succesfully"});
});

app.post("/notes/shared_notes", async (req, res) =>{
    const { note_id, user_id, email } = req.body;
    const userToShare = await getUserByEmail(email);
    const sharedNote = await shareNote(note_id, user_id, userToShare.id);
    res.status(201).send(sharedNote);

});

app.post("/notes", async (req, res) => {
    const { user_id, title } = req.body;
    const note = await createNote(user_id, title);
    res.status(201).send(note);

}); 



app.listen(8080, () => {
    console.log("server running on port 8080");
});

