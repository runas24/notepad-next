import { useState } from 'react';

interface Note {
    id: number;
    content: string;
}

const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (content: string) => {
        setNotes([...notes, { id: Date.now(), content }]);
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return { notes, addNote, deleteNote };
};

export default useNotes;