import HelpRequest from "../../database/models/HelpRequest.js";
import Disaster from "../../database/models/Disaster.js";
import User from "../../database/models/User.js";

export const createHelpRequest = async (req, res) => {
  try {
    const {
      disasterId,
      location,
      helpType,
      description,
      peopleCount,
      phone,
    } = req.body;

    if (!disasterId || !location?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Disaster, location and description are required",
      });
    }

    const disaster = await Disaster.findOne({
      $or: [
        { disasterId },
        ...( /^[0-9a-fA-F]{24}$/.test(disasterId) ? [{ _id: disasterId }] : [] ),
      ],
    });

    if (!disaster || disaster.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This disaster is not active",
      });
    }

    const request = await HelpRequest.create({
      disaster: disaster._id,
      requester: req.user._id,
      requesterName: req.user.name,
      phone: phone?.trim() || req.user.phone || "",
      location: location.trim(),
      helpType: Array.isArray(helpType) && helpType.length ? helpType : ["Food"],
      description: description.trim(),
      peopleCount: Math.max(1, Number(peopleCount) || 1),
    });

    const populated = await request.populate([
      { path: "disaster", select: "disasterId title location urgency" },
      { path: "requester", select: "name email phone" },
    ]);

    res.status(201).json({
      success: true,
      message: "Help request sent successfully",
      request: populated,
    });
  } catch (error) {
    console.error("Create Help Request Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unable to create help request",
    });
  }
};

export const getPendingHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({
      status: "Pending",
    })
      .populate("disaster", "disasterId title location urgency")
      .populate("requester", "name email phone")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch help requests",
    });
  }
};

export const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({})
      .populate("disaster", "disasterId title location urgency")
      .populate("requester", "name email phone")
      .populate("assignedVolunteer", "name email phone")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch help requests",
    });
  }
};

export const acceptHelpRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Help request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `This request is already ${request.status.toLowerCase()}`,
      });
    }

    request.status = "Assigned";
    request.assignedVolunteer = req.user._id;
    request.assignedAt = new Date();
    await request.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { karmaPoints: 50 },
    });

    const populated = await request.populate([
      { path: "disaster", select: "disasterId title location urgency" },
      { path: "requester", select: "name email phone" },
      { path: "assignedVolunteer", select: "name email phone" },
    ]);

    res.json({
      success: true,
      message: "Help request accepted",
      request: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to accept help request",
    });
  }
};

export const completeHelpRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Help request not found",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isAssignedVolunteer =
      request.assignedVolunteer?.toString() === req.user._id.toString();

    if (!isAdmin && !isAssignedVolunteer) {
      return res.status(403).json({
        success: false,
        message: "Only the assigned volunteer or admin can complete this request",
      });
    }

    request.status = "Completed";
    request.completedAt = new Date();
    await request.save();

    if (isAssignedVolunteer) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { peopleHelped: request.peopleCount, karmaPoints: 50 },
      });
    }

    res.json({
      success: true,
      message: "Help request marked completed",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to complete help request",
    });
  }
};
