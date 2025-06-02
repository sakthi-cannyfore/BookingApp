import express from "express";
import {
  deleteRooms,
  getAllRoombyID,
  getAllRooms,
  updateRoomById,
  createRoom,
  chechAvailability,
} from "../controllers/RoomController.js";
import { verifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();

router.route("/:hotelId").post(verifyAdmin, createRoom);
router.route("/").get(getAllRooms);
router.route("/:id").put(verifyAdmin, updateRoomById).get(getAllRoombyID);
router.route("/availability/:id").put(chechAvailability);
router.route("/:id/:hotelId").delete(verifyAdmin, deleteRooms);

export default router;
