const User = require('../models/user');

const createUser = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            message: "Empty Body"
        });
    }

    console.log(body);

    try {
        const user = new User(body);
        if (!user) {
            return res.status(400).json({success: false, error: "User not created"});
        }

        const response = await user.save();
        if (!response) {
            return res.status(400).json({success: false, error: "User not saved"});
        } else {
            return res.status(201).json({success: true, data: response});
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


const updateUser = async (req, res) => {
    const userId = req?.body?.userId;

    console.log(req.body);

    if (!userId) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a userId in the body'
        })
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        user.isPaymentMade = true;
        const referrer = user?.referredUser;

        if (referrer) {
            const referrerUser = await User.findOne({name: referrer});
            if (referrerUser) {
                referrerUser.totalEarnings += 10;
                await referrerUser.save();
            }
        }

        await user.save();

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    createUser,
    updateUser
}