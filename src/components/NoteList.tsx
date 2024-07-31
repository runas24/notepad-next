import React, { FC } from 'react';
import Note from './Note';
import useNotes from '../hooks/useNotes';

const NoteList: FC = () => {
    const { notes, addNote, deleteNote } = useNotes();

    const handleAddNote = () => {
        const content = prompt('Enter note content:');
        if (content) {
            addNote(content);
        }
    };

    return (
        <div>
            <button onClick={handleAddNote}>Add Note</button>
            {notes.map(note => (
                <Note key={note.id} id={note.id} content={note.content} onDelete={deleteNote} />
            ))}
        </div>
    );
};

export default NoteList;