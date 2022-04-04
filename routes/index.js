const router = require('express').Router();
const { Location, Traveller, Trip } = require('../models');

router.get('/api/travellers', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({});
    res.json({ travellerData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/travellers', async (req, res) => {
  try {
    const travellerData = await Traveller.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/travellers/:id', async (req, res) => {
  const travellerData = await Traveller.findByPk(
    req.params.id,
    {
      include: [{ 
        model: Location, 
        through: {
          attributes: []
        }
      }]
    }
  );
 
  res.json(travellerData);
});

router.delete('/api/travellers/:id', async (req, res) => {
  try {
    const deletedTraveller = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTraveller);
  } catch {
    res.status(500).json(err);
  }
});

router.get('/api/locations', async (req, res) => {
  try {
    const locationData = await Location.findAll({});
    res.json({ locationData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/locations', async (req, res) => {
  try {
    const locationData = await Location.create({
      location_name: req.body.location_name,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/locations/:id', async (req, res) => {
  const locationData = await Location.findByPk(
    req.params.id,
    {
      include: [{ 
        model: Traveller, 
        through: {
          attributes: []
        }
      }]
    }
  );
 
  res.json(locationData);
});

router.delete('/api/locations/:id', async (req, res) => {
  try {
    const deletedLocation = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedLocation);
  } catch {
    res.status(500).json(err);
  }
});


router.get('/api/trips', async (req, res) => {
  try {
    const tripsData = await Trip.findAll({});
    res.json({ tripsData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/trips', async (req, res) => {
  try {
    const tripsData = await Trip.create({
      trips_budget: req.body.trips_budget,
      traveller_amount: req.body.traveller_amount,
      traveller_id: req.body.traveller_id,
      location_id: req.body.location_id,
    });
    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/api/trips/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTrip);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
