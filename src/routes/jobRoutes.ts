import { Router } from "express";
import { jobService } from "../services";
import { NotFoundError } from "../errors/NotFoundError";

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

router.get("/client/:id", async (req, res) => {
  const clientId = Number(req.params.id);
  const jobs = await jobService.getJobByClientId(clientId);
  return res.json(jobs);
});

router.post("/", async (req, res) => {
  try {
    const { clientId, description, amount, paidAmount } = req.body;

    const job = await jobService.createJob(
      clientId,
      description,
      amount,
      paidAmount,
    );
    return res.status(200).json(job);
  } catch (error) {
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

    const updatedJob = await jobService.updateJob(jobId, {
      clientId,
      description,
      amount,
      paidAmount,
    });
    res.json(updatedJob);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
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
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
