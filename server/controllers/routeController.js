const Route = require('../models/Route');

exports.getRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);
        res.status(201).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 