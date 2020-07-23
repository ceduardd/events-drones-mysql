const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
  try {
    const events = await pool.query('SELECT * FROM events');
    res.render('events/list', { events });
  } catch (err) {
    console.log(err);
  }
});

router.get('/add', (req, res) => {
  res.render('events/add');
});

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await pool.query('DELETE FROM events WHERE id = ?', [id]);
    res.redirect('/events');
  } catch (err) {
    console.log(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const newEvent = {
      name_event: name,
      place_details: description,
      dateStart: date,
    };
    await pool.query('INSERT INTO events set ?', [newEvent]);
  } catch (err) {
    console.log(err);
  }

  res.redirect('/events');
});

module.exports = router;
