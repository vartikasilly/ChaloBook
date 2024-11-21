import express from "express";
import Hotel from '../models/Hotel.js'
import { createHotel, updateHotel,deleteHotel,getHotel,getHotels, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/",verifyAdmin,createHotel);

// Update
router.put("/:id",verifyAdmin,updateHotel)

// Delete
router.delete("/:id",verifyAdmin,deleteHotel)

// GET
router.get("/find/:id",getHotel)
// GET ALL
router.get("/",getHotels)
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
export default router;