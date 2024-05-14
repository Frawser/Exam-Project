const User = require('../models/User'); 

exports.updateProfilePicture = async (req, res) => {
    try {
        const { userId, image } = req.body;
        const user = await User.findByIdAndUpdate(userId, { image }, { new: true });
        res.json({ user });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ error: 'Error updating profile picture' });
    }
};
