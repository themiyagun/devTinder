const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userid",
  userAuth,
  async (req, res) => {
    try {
      const touser = req.params.userid;
      const status = req.params.status;
      const fromuser = req.user._id;

      const allowedStatus = ["ignored", "interested"];

      const isValidStatus = allowedStatus.includes(status);

      if (!isValidStatus) {
        return res
          .json({
            message:
              "Invalid status. Allowed values are 'ignored' and 'interested'.",
          })
          .status(400);
      }
      //check if the user is trying to send a connection request to themselves
      if (fromuser == touser) {
        return res
          .json({
            message: "You cannot send a connection request to yourself.",
          })
          .status(400);
      }

      // Check if a connection request already exists between the users

      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: fromuser, toUserId: touser },
          { fromUserId: touser, toUserId: fromuser },
        ],
      });

      if (existingRequest) {
        return res
          .json({
            message: "A connection request already exists between these users.",
          })
          .status(400);
      }

      ////
      const connectionRequest = new ConnectionRequestModel({
        fromUserId: fromuser,
        toUserId: touser,
        status: status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${status} Successfully`,
        data,
      });
    } catch (error) {
      res
        .status(400)
        .send("Error while sending connection request " + error.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const { status, requestId } = req.params;
      //allowed status

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid status. Allowed values are 'accepted' and 'rejected'.",
        });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found or already reviewed.",
        });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: `Connection request ${status} successfully`,
        data,
      });

      //   //
    } catch (error) {
      res.status(400).send("Error " + error.message);
    }
  },
);
module.exports = requestRouter;
