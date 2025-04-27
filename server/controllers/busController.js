const Bus = require('../models/Bus');

exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate('route');
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addBus = async (req, res) => {
    try {
        const bus = await Bus.create(req.body);
        res.status(201).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBusLocation = async (req, res) => {
    try {
        const { busId } = req.params;
        const { lat, lng } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            {
                currentLocation: { lat, lng },
                lastUpdated: Date.now()
            },
            { new: true }
        );

        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 