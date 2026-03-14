const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");

const Certificate = require("../models/Certificate");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/*
----------------------------------------------------
1️⃣ GET ALL CERTIFICATES (Admin Dashboard)
----------------------------------------------------
*/

router.get("/all", async (req, res) => {

  try {

    const certificates = await Certificate.find();

    res.json(certificates);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching certificates"
    });

  }

});


/*
----------------------------------------------------
2️⃣ UPLOAD EXCEL FILE (ADMIN ONLY)
----------------------------------------------------
*/

router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  async (req, res) => {

    try {

      if (req.user.role !== "Admin") {
        return res.status(403).json({
          message: "Only Admin can upload certificates"
        });
      }

      const workbook = XLSX.readFile(req.file.path);

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet);

      await Certificate.insertMany(data);

      res.json({
        message: "Certificates uploaded successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: "Upload failed"
      });

    }

  }
);


/*
----------------------------------------------------
3️⃣ SEARCH CERTIFICATE BY ID
----------------------------------------------------
*/

router.get("/:id", async (req, res) => {

  try {

    const cert = await Certificate.findOne({
      certificateId: req.params.id
    });

    if (!cert) {
      return res.json({
        found: false
      });
    }

    res.json({
      found: true,
      cert
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching certificate"
    });

  }

});


module.exports = router;