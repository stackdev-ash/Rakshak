import Disaster from "../../database/models/Disaster.js";
import User from "../../database/models/User.js";

const findDisaster = async (id) => {
  const byObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    ? { _id: id }
    : { disasterId: id };

  return Disaster.findOne(byObjectId);
};

// @desc Create disaster alert
// @route POST /api/disasters
// @access Private/Admin
export const createDisaster = async (req, res) => {
  try {
    const {
      title,
      type,
      location,
      city,
      peopleAffected,
      volunteersNeeded,
      description,
      requirements,
      contact,
      urgency,
      lat,
      lng,
    } = req.body;

    if (!title?.trim() || !location?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title, location and description are required",
      });
    }

    const newDisaster = await Disaster.create({
      title: title.trim(),
      type: type || "Emergency Relief",
      location: location.trim(),
      city: city?.trim() || "",
      coordinates: {
        lat: Number.isFinite(Number(lat)) ? Number(lat) : undefined,
        lng: Number.isFinite(Number(lng)) ? Number(lng) : undefined,
      },
      urgency: urgency || "High",
      peopleAffected: peopleAffected || "0",
      volunteersNeeded: Math.max(1, Number(volunteersNeeded) || 1),
      description: description.trim(),
      requirements: Array.isArray(requirements)
        ? requirements.filter(Boolean)
        : [],
      contact: contact?.trim() || req.user?.phone || "",
      createdBy: req.user._id,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message: "Disaster alert created successfully",
      disaster: newDisaster,
    });
  } catch (error) {
    console.error("Create Disaster Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unable to create disaster",
    });
  }
};

// @desc Get active disaster alerts
// @route GET /api/disasters
// @access Public
export const getActiveDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find({ status: "Active" })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: disasters.length,
      disasters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch active disasters",
    });
  }
};

// @desc Get one disaster
// @route GET /api/disasters/:id
// @access Public
export const getDisasterById = async (req, res) => {
  try {
    const disaster = await findDisaster(req.params.id);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster mission not found",
      });
    }

    await disaster.populate("assignedVolunteers", "name phone email role");

    res.json({ success: true, disaster });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch disaster",
    });
  }
};

// @desc Volunteer joins disaster
// @route POST /api/disasters/:id/join
// @access Private/Volunteer
export const joinDisaster = async (req, res) => {
  try {
    const disaster = await findDisaster(req.params.id);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster mission not found",
      });
    }

    if (disaster.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This disaster mission is no longer active",
      });
    }

    const alreadyJoined = disaster.assignedVolunteers.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.json({
        success: true,
        message: "You have already joined this mission",
        disaster,
      });
    }

    if (disaster.volunteersJoined >= disaster.volunteersNeeded) {
      return res.status(400).json({
        success: false,
        message: "This mission already has enough volunteers",
      });
    }

    disaster.assignedVolunteers.push(req.user._id);
    disaster.volunteersJoined += 1;
    await disaster.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        karmaPoints: 100,
        missionsCompleted: 1,
      },
    });

    res.json({
      success: true,
      message: "You have successfully joined this relief mission",
      disaster,
    });
  } catch (error) {
    console.error("Join Disaster Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unable to join disaster mission",
    });
  }
};

// @desc Resolve/close a disaster
// @route PATCH /api/disasters/:id/close
// @access Private/Admin
export const closeDisaster = async (req, res) => {
  try {
    const disaster = await findDisaster(req.params.id);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster mission not found",
      });
    }

    disaster.status = "Resolved";
    await disaster.save();

    res.json({
      success: true,
      message: "Disaster alert closed",
      disaster,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to close disaster",
    });
  }
};
