
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import debounce from 'lodash/debounce';

const Notepad: React.FC = () => {
  const [text, setText] = useState('');
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        if (data) {
          setText(data.content ?? '');
          localStorage.setItem('notepadContent', data.content ?? '');
        }
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editor);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const newText = event.target.innerHTML;
    setText(newText);
    localStorage.setItem('notepadContent', newText);
    saveNoteDebounced();
  };

  const saveNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .upsert([
        { id: 1, title: 'My Note', content: text }
      ]);

    if (error) {
      console.error('Error saving note:', error);
    } else {
      console.log('Note saved:', data);
    }
  };

  const saveNoteDebounced = debounce(() => {
    saveNote();
  }, 500);

  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        contentEditable
        ref={editorRef}
        className="textarea border rounded-lg p-4"
        dangerouslySetInnerHTML={{ __html: text }}
        onInput={handleChange}
        onBlur={() => {
          saveNoteDebounced();
        }}
      />
    </motion.div>
  );
};

export default Notepad;
