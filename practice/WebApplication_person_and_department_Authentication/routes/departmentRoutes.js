const express = require("express");
const Department = require("../models/Department");
const router = express.Router();

// POST Department
router.post("/", async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
