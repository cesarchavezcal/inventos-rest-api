// Database Model
const Test = require("../models/test.model");

const getTests = async (req, res) => {
    try {
        const tests = await Test.find();
        const count = await Test.countDocuments();
        return res.json({
            tests,
            count,
            message: 'Tests obtained',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.status(400).json({
            message: '⚠️ Something happened!',
        });
    };
};

const getTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        
        if (!test) {
            return res.status(404).json({
                message: `Test with ID:${req.params.id} not found`
            })
        }

        return res.json({
            test,
            message: `Test with ID:${req.params.id} obtained`,
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.status(400).json({
            message: '⚠️ Something happened!',
        });
    }
}

const createTest = async (req, res) => {
    try {
        const test = new Test(req.body);
        test.save().then(() => {
            res.json({
                test,
                message: 'Test created!'
            });
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    };
};

const updateTest = async (req, res) => {
    try {
        const { test } = req.body;
        const newTest = {};

        let testObj = await Test.findById(req.params.id);

        if (!testObj) {
            return res.status(404).json({
                message: `Test with ID:${req.params.id} did not found`
            });
        } else {
            newTest.test = test;
        };

        testObj = await Test.findByIdAndUpdate({ _id: req.params.id }, { $set: newTest }, { new: true });

        return res.json({
            test,
            message: `Test with ID:${req.params.id} updated`
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
};

const deleteTest = async (req, res) => {
    try {
        let test = await Test.findById(req.params.id);

        if (!test) {
            return res.status(404).json({
                message: `Test with ID:${req.params.id} not found`
            })
        }

        await Test.findByIdAndRemove({_id: req.params.id});
        return res.json( {
            message: `Test with ID:${req.params.id} deleted`
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}

module.exports = {
    getTests,
    getTest,
    createTest,
    updateTest,
    deleteTest
};