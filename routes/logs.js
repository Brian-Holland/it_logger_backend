const express = require('express');
const router = express.Router();

const Log = require('../models/Log');

//@route    GET api/logs
//@desc     Get all logs
//@access  Public
router.get('/', async (req, res) => {
	try {
		const logs = await Log.find({}).sort({
			date: -1
		});

		res.json(logs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST api/logs
//@desc     Add log
//@access  Public
router.post('/', async (req, res) => {
	//pull log contents from request
	const { message, attention, tech, date } = req.body;
	//create new log based on schema and save it, returning it as json
	try {
		const newLog = new Log({
			message,
			attention,
			tech
		});

		const log = await newLog.save();

		res.json(log);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    PUT api/logs/:id
//@desc     Update log
//@access  	Public
router.put('/:id', async (req, res) => {
	//pull contents from request
	const { message, attention, tech, date } = req.body;

	//construct log object to update with
	const logFields = {};
	if (message) logFields.message = message;
	if (attention === true) logFields.attention = attention;
	if (attention === false) logFields.attention = attention;
	if (tech) logFields.tech = tech;
	if (date) logFields.date = date;

	//find log using id, update it, and return it as json
	try {
		let log = await Log.findById(req.params.id);

		if (!log) {
			return res.status(404).json({ mg: 'Log not found' });
		}

		log = await Log.findByIdAndUpdate(
			req.params.id,
			{
				$set: logFields
			},
			{ new: true }
		);

		res.json(log);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    DELETE api/logs/:id
//@desc     Delete log
//@access  Public
router.delete('/:id', async (req, res) => {
	try {
		let log = await Log.findById(req.params.id);

		if (!log) {
			return res.status(404).json({ mg: 'Log not found' });
		}

		await Log.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Log deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
