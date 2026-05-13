"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const jobs = await services_1.jobService.getAllJobs();
    res.json(jobs);
});
router.get("/:id", async (req, res) => {
    const jobId = Number(req.params.id);
    const job = await services_1.jobService.getJobById(jobId);
    if (!job) {
        res.status(404).json({ message: "Job could not be found!" });
    }
    return res.json(job);
});
exports.default = router;
