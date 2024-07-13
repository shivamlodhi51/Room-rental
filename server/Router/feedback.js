const router = require("express").Router();
const { createFeedback, allFeedback, deletefeedback } = require("../Controller/feedbackController");

router.post("/feedback", createFeedback);
router.get("/Allfeedback", allFeedback);
router.delete("/delete/:fid", deletefeedback);

module.exports = router;