const Referral = require("../models/referral");
const emailService = require("../services/emailService");

const createReferral = async (req, res) => {
  console.log("req.body => ", req.body);
  const {
    referrer,
    referrerEmail,
    referrerMessage,
    referee,
    refereeEmail,
    refereeContact,
    refereeAddress,
    field,
    course,
  } = req.body;

  if (!referrer || !referrerEmail || !referee || !refereeEmail) {
    return res.status(400).json({
      error:
        "Referrer, referrerEmail, referee, and refereeEmail are required fields.",
    });
  }

  try {
    console.log("Referral => ", Referral);
    const referral = await Referral.create({
      data: {
        referrer,
        referrerEmail,
        referrerMessage,
        referee,
        refereeEmail,
        refereeContact,
        refereeAddress,
        field,
        course,
      },
    });

    // Send referral email
    await emailService.sendReferralEmail({
      referrer,
      referrerEmail,
      referrerMessage,
      referee,
      refereeEmail,
      course,
      field,
    });

    res.status(201).json(referral);
  } catch (error) {
    console.error("Error creating referral:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error at referralController" });
  }
};

module.exports = {
  createReferral,
};
