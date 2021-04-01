const AuthObj = require('../models/auth-obj.model');

const getAuthObjs = async (req, res) => {
    try {
        const authObjs = await AuthObj.find({ creator: req.user.id });

        const count = await AuthObj.countDocuments();

        return res.json({
            authObjs,
            count,
            msg: 'AuthObjects obtained',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: '⚠️ Something happened!',
        });
    }
};

const getAuthObj = async (req, res) => {
    try {
        const authObj = await AuthObj.findById(req.params.id);

        if (!authObj) {
            return res.status(404).json({
                msg: `ObjAuth with ID:${req.params.id} not found`
            });
        };

        return res.json({
            authObj,
            msg: `ObjAuth with ID:${req.params.id} obtained`,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.status(400).json({
            msg: '⚠️ Something happened!',
        });
    };
};

const createAuthObj = async (req, res) => {
    try {
        const authObj = new AuthObj(req.body);

        authObj.creator = req.user.id;

        authObj.save().then(() => {
            AuthObj.populate(authObj, { path: 'creator', select: 'email' }).then(authObj => {
                res.json({
                    authObj,
                    msg: 'AuthObjects created',
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
};

const updateAuthObj = async (req, res) => {
    try {
        const { objName } = req.body;
        const newAuthObj = {};

        let authObj = await AuthObj.findById(req.params.id);

        if (!authObj) {
            return res.status(404).json({
                message: `AuthObj with ID:${req.params.id} did not found`
            });
        } else {
            newAuthObj.objName = objName;
        };

        authObj = await AuthObj.findByIdAndUpdate({ _id: req.params.id }, { $set: newAuthObj }, { new: true }).then(() => {
            AuthObj.populate(authObj, { path: 'creator', select: 'email' }).then(authObj => {
                return res.json({
                    authObj,
                    message: `AuthObj with ID:${req.params.id} updated`
                })
            })
        });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
};

const deleteAuthObj = async (req, res) => {
    try {
        let authObj = await AuthObj.findById(req.params.id);

        if (!authObj) {
            return res.status(404).json({
                message: `AuthObj with ID:${req.params.id} not found`
            })
        }

        await AuthObj.findByIdAndRemove({_id: req.params.id});
        return res.json( {
            message: `AuthObj with ID:${req.params.id} deleted`
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}

module.exports = {
    getAuthObjs,
    getAuthObj,
    createAuthObj,
    updateAuthObj,
    deleteAuthObj
};