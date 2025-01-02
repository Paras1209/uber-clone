const captainModel = require("../models/captain.model");



module.exports.createCaptain = async ({username, email, password, vehicle}) => {
    const { color, plate, capacity, vehicleType } = vehicle;

    if (!username || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("please provide all the fields");
    }

    const captain = await captainModel.create({
        username,
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType,
        }
    })

    return captain;
}