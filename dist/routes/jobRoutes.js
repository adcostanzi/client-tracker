"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const NotFoundError_1 = require("../errors/NotFoundError");
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
router.get("/client/:id", async (req, res) => {
    const clientId = Number(req.params.id);
    const jobs = await services_1.jobService.getJobsByClientId(clientId);
    return res.json(jobs);
});
router.get("/client/:id/balance", async (req, res) => {
    try {
        const clientId = Number(req.params.id);
        const totalOwed = await services_1.jobService.calculateClientOwes(clientId);
        return res.status(200).json({
            clientId: `${clientId}`,
            totalOwed: `${totalOwed}`,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { clientId, description, amount, paidAmount } = req.body;
        const job = await services_1.jobService.createJob(clientId, description, amount, paidAmount);
        return res.status(200).json(job);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { clientId, description, amount, paidAmount } = req.body;
        const jobId = Number(req.params.id);
        const updatedJob = await services_1.jobService.updateJob(jobId, {
            clientId,
            description,
            amount,
            paidAmount,
        });
        res.json(updatedJob);
    }
    catch (error) {
        if (error instanceof NotFoundError_1.NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.delete("/:id", async (req, res) => {
    const jobId = Number(req.params.id);
    try {
        const result = await services_1.jobService.deleteJob(jobId);
        if (result) {
            return res.status(200).json({ message: "Job Successfully deleted!" });
        }
        else {
            return res
                .status(404)
                .json({ message: "Job does not exist! Unable to delete it" });
        }
    }
    catch (error) {
        if (error instanceof NotFoundError_1.NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = router;
