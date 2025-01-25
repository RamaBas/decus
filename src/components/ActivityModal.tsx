import React, { useState } from 'react';
import { useActivities } from '../hooks/useActivities';

export const ActivityModal = ({ onClose }) => {
  const { createActivity } = useActivities();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegurándote de no enviar el 'id' porque es generado automáticamente por el backend
    const newActivity = {
      title,
      description,
      type,
      date,
    };

    await createActivity(newActivity);
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
