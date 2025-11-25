import express from "express";
import {
  createRoom,
  updateProductById,
  deleteHotels,
  getAllhotels,
  getAllhotelbyID,
  countByCity,
  countByType,
  getHotelbyCity,
  getHotelRoom,
} from "../controllers/HotelController.js";
import { verifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();
router.route("/").post(verifyAdmin, createRoom).get(getAllhotels);
router.route("/q").get(getHotelbyCity);
router.route("/room/:id").get(getHotelRoom);
router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/room/:id").get(countByType);
router
  .route("/:id")
  .put(verifyAdmin, updateProductById)
  .delete(verifyAdmin, deleteHotels)
  .get(getAllhotelbyID);

export default router;
