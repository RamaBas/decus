const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM academics ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un académico
exports.createAcademic = async (req, res) => {
  const { name, type, decus_activities, publications } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO academics (name, type, decus_activities, publications) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, decus_activities, publications]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar académico
exports.updateAcademic = async (req, res) => {
  const { id } = req.params;
  const { name, type, decus_activities, publications } = req.body;
  try {
    const result = await db.query(
      'UPDATE academics SET name=$1, type=$2, decus_activities=$3, publications=$4 WHERE id=$5 RETURNING *',
      [name, type, decus_activities, publications, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM academics WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
