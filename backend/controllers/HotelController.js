import Hotel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";

export const createRoom = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const updatedbyid = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedbyid);
  } catch (error) {
    next(error);
  }
};

export const deleteHotels = async (req, res, next) => {
  try {
    await Hotel.findByIdAndUpdate(req.params.id);
    res.status(201).json("Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllhotelbyID = async (req, res, next) => {
  try {
    const allHotels = await Hotel.findById(req.params.id);

    res.status(201).json(allHotels);
  } catch (error) {
    next(error);
  }
};

export const getHotelbyCity = async (req, res, next) => {
  const { city, min, max } = req.query;

  try {
    const hotels = await Hotel.find({
      city: { $regex: city, $options: "i" },
      cheapestPrice: {
        $gte: parseInt(min) || 0,
        $lte: parseInt(max) || 99999,
      },
    });

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const getAllhotels = async (req, res, next) => {
  const { min, max, limit, featured, ...others } = req.query;

  const filter = {
    ...others,
    cheapestPrice: {
      $gte: parseInt(min) || 1,
      $lte: parseInt(max) || 99999,
    },
  };

  if (featured !== undefined) {
    filter.featured = featured === "true";
  }

  try {
    const hotels = await Hotel.find(filter).limit(parseInt(limit));
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const cabinCount = await Hotel.countDocuments({ type: "cabins" });
    const villasCount = await Hotel.countDocuments({ type: "villas" });

    res.status(201).json([
      { type: "hotel", count: hotelCount },
      { type: "resort", count: resortCount },
      { type: "cabins", count: cabinCount },
      { type: "villas", count: villasCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );

    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};
