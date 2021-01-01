const express = require('express');
const router = express.Router();

const Tech = require('../models/Tech');

//@route    GET api/techs
//@desc     Get all technicians
//@access  	Public
router.get('/', async (req, res) => {
	try {
		const techs = await Tech.find({});

		res.json(techs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST api/techs
//@desc     Add technician
//@access  	Public
router.post('/', async (req, res) => {
	//pull tech contents from request
	const { firstName, lastName, techId } = req.body;
	//create new log based on schema and save it, returning it as json
	try {
		const newTech = new Tech({
			firstName,
			lastName,
			techId
		});

		const tech = await newTech.save();

		res.json(tech);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    PUT api/techs/:id
//@desc     Update technician
//@access  	Public
router.put('/:id', async (req, res) => {
	//pull tech contents from request
	const { firstName, lastName, techId } = req.body;

	//construct tech object to update with
	const techFields = {};
	if (firstName) techFields.firstName = firstName;
	if (lastName) techFields.lastName = lastName;
	if (techId) techFields.techId = techId;
	//find tech using id, update it, and return it as json
	try {
		let tech = await Tech.findById(req.params.id);

		if (!tech) {
			return res.status(404).json({ mg: 'Technician not found' });
		}

		tech = await Tech.findByIdAndUpdate(
			req.params.id,
			{
				$set: techFields
			},
			{ new: true }
		);

		res.json(tech);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    DELETE api/techs/:id
//@desc     Delete log
//@access  Public
router.delete('/:id', async (req, res) => {
	try {
		let tech = await Tech.findById(req.params.id);

		if (!tech) {
			return res.status(404).json({ mg: 'Technician not found' });
		}

		await Tech.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Technician deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
