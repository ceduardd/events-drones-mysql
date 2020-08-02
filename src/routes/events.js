const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// events
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const events = await pool.query('SELECT * FROM events WHERE user_id = ?', [
      req.user.id,
    ]);
    res.render('events/list', { events });
  } catch (err) {
    console.log(err);
  }
});

// add
router.get('/add', isLoggedIn, (req, res) => {
  res.render('events/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const newEvent = {
      name_event: name,
      place_details: description,
      dateStart: date,
      user_id: req.user.id,
    };
    await pool.query('INSERT INTO events set ?', [newEvent]);
    req.flash('success', 'Event created successfully');
  } catch (err) {
    console.log(err);
  }

  res.redirect('/events');
});

// edit
router.get('/edit/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    const event = rows[0];
    res.render('events/edit', { event });
  } catch (err) {
    console.log(err);
  }
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const {
    name: name_event,
    date: dateStart,
    description: place_details,
  } = req.body;
  const newEvent = {
    name_event,
    dateStart,
    place_details,
  };
  console.log(newEvent);

  await pool.query('UPDATE events set ? WHERE id = ?', [newEvent, id]);
  req.flash('success', 'Event edited successfully');
  res.redirect('/events');
});

// delete
router.get('/delete/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await pool.query('DELETE FROM events WHERE id = ?', [id]);
    req.flash('success', 'Event deleted successfully');
    res.redirect('/events');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
