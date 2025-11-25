import Hotel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";
import Room from "../models/RoomModel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomById = async (req, res, next) => {
  try {
    const updatedbyid = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedbyid);
  } catch (error) {
    next(error);
  }
};

export const chechAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(201).json("Rooms status has been updated successfully ");
  } catch (error) {
    next(error);
  }
};

export const deleteRooms = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    await Room.findByIdAndUpdate(req.params.id);
    res.status(201).json("Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllRoombyID = async (req, res, next) => {
  try {
    const allRoomsbyId = await Room.findById(req.params.id);

    res.status(201).json(allRoomsbyId);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();

    res.status(201).json(allRooms);
  } catch (error) {
    next(error);
  }
};
