import LiveMission from "../../database/models/LiveMission.js";

// @desc    Get all active live tracking missions
// @route   GET /api/tracking/missions
// @access  Public
export const getLiveMissions = async (req, res) => {
  try {
    let missions = await LiveMission.find({}).sort({ updatedAt: -1 });


    res.json({
      success: true,
      count: missions.length,
      missions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch live tracking missions",
    });
  }
};

// @desc    Get single tracking mission by missionId
// @route   GET /api/tracking/mission/:id
// @access  Public
export const getMissionById = async (req, res) => {
  try {
    const { id } = req.params;

    let mission = await LiveMission.findOne({
      $or: [{ missionId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Live mission not found",
      });
    }

    res.json({
      success: true,
      mission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update mission telemetry (Real-time GPS coordinates, speed, ETA)
// @route   PATCH /api/tracking/mission/:id/telemetry
// @access  Public / Private
export const updateMissionTelemetry = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng, heading, speed, etaMinutes, distanceRemainingKm, temperatureCelsius, status } = req.body;

    let mission = await LiveMission.findOne({
      $or: [{ missionId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found to update telemetry",
      });
    }

    if (lat && lng) {
      mission.currentLocation.lat = lat;
      mission.currentLocation.lng = lng;
      mission.currentLocation.lastUpdated = new Date();
    }

    if (heading !== undefined) mission.currentLocation.heading = heading;
    if (speed !== undefined) mission.driver.currentSpeed = speed;
    if (etaMinutes !== undefined) mission.telemetry.etaMinutes = etaMinutes;
    if (distanceRemainingKm !== undefined) mission.telemetry.distanceRemainingKm = distanceRemainingKm;
    if (temperatureCelsius !== undefined) mission.telemetry.temperatureCelsius = temperatureCelsius;
    if (status) mission.status = status;

    await mission.save();

    res.json({
      success: true,
      message: "Telemetry updated in real time",
      mission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Dispatch / create new live tracking mission
// @route   POST /api/tracking/mission
// @access  Private
export const createLiveMission = async (req, res) => {
  try {
    const missionData = req.body;

    const mission = await LiveMission.create({
      ...missionData,
      missionId: missionData.missionId || "RK-" + Math.floor(810 + Math.random() * 90),
    });

    res.status(201).json({
      success: true,
      message: "New rescue fleet mission dispatched to live tracking radar.",
      mission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
