const Feedback = require("../Models/feedbackModel");

const createFeedback = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        // const bookingId = uuidv4();
        const feedback = new Feedback({fullName, email, message})
        await feedback.save()
        res.status(200).json(feedback);
    } catch (error) {
        console.log(err);
        res.status(400).json({ message: "Fail to create Feedback", error: err.message });
    }
}

const allFeedback = async (req, res) => {
    try {
        const data = await Feedback.find();
        console.log(data);
        return res.status(200).json({ data });
    } catch (error) {
        console.log("error from server")
    }
}
const deletefeedback = async (req, res) => {
    try {
        const orders = await Feedback.findByIdAndDelete(req.params.fid);
        res.status(200).json({ success: true, message: "Feedback Successfully Deleted", orders });
    } catch (error) {
        console, log(error);
        res.status(400).json({ success: false, message: "Feedback Not Deleted", error: error.message });
    }
};


module.exports = { allFeedback,  createFeedback, deletefeedback}