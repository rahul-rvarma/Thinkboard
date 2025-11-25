import Note from '../models/models.js';

export async function get_all_notes(req,res){
    try{
        const notes =  (await Note.find().sort({createdAt:-1}));
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function get_specific_note(req,res){
    try{
        const note = await Note.findById(req.params.id);    
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function create_note(req,res){
    try{
        const { title, content } = req.body;
        const note = new Note({
            title,
            content
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function update_note(req,res){
    try{

        const{title,content} = req.body;
        await Note.findByIdAndUpdate(req.params.id,{
            title,
            content
        });
        res.status(200).send("Note updated successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });   
    }
}

export async function delete_note(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).send("Note deleted successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });   
    }
}
