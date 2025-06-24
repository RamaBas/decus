const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM academics ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { name, type, cv_url, decus_activities, photo_url } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO academics (name, type, cv_url, decus_activities, photo_url) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, type, cv_url, decus_activities, photo_url]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, type, cv_url, decus_activities, photo_url } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE academics 
       SET name=$1, type=$2, cv_url=$3, decus_activities=$4, photo_url=$5, updated_at=now() 
       WHERE id=$6 RETURNING *`,
      [name, type, cv_url, decus_activities, photo_url, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
