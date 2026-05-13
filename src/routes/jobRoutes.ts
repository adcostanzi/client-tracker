import { Router } from "express";
import { jobService } from "../services";
import { Job } from "../models/Job";

const router = Router();

router.get("/", async (req, res) => {
  const jobs = await jobService.getAllJobs();
  res.json(jobs);
});

router.get("/:id", async (req, res) => {
  const jobId = Number(req.params.id);
  const job = await jobService.getJobById(jobId);

  if (!job) {
    res.status(404).json({ message: "Job could not be found!" });
  }

  return res.json(job);
});

router.get("client/:id", async (req, res) => {
  const clientId = Number(req.params.id);
  const job = await jobService.getJobByClientId(clientId);
  return res.json(job);
});

router.post("/", async (req, res) => {
  const { clientId, description, amount, paidAmount } = req.body;

  try {
    const job = await jobService.createJob(
      clientId,
      description,
      amount,
      paidAmount,
    );
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  const { clientId, description, amount, paidAmount } = req.body;
  const jobId = Number(req.params.id);

  try {
    const updatedJob = await jobService.updateJob(jobId, {
      clientId,
      description,
      amount,
      paidAmount,
    });
    if (!updatedJob) {
      return res
        .status(404)
        .json({ message: "Missing Job. Unable to update job" });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  const jobId = Number(req.params.id);

  try {
    const result = await jobService.deleteJob(jobId);

    if (result) {
      return res.status(200).json({ message: "Job Successfully deleted!" });
    } else {
      return res
        .status(404)
        .json({ message: "Job does not exist! Unable to delete it" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;
