import React, { FC } from 'react';

interface NoteProps {
    id: number;
    content: string;
    onDelete: (id: number) => void;
}

const Note: FC<NoteProps> = ({ id, content, onDelete }) => {
    return (
        <div className="note">
            <p>{content}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default Note;