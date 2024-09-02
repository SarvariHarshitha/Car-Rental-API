import prisma from "../db.js";

export const createCar = async (req, res) => {
    console.log(req.user.id);
    const user = await prisma.user.findUnique({
        where : {
            id : req.user.id
        }
    });
    if(user.role !== 'admin'){
        res.status(401).json({
            "status": "You are not authorised to create a car",
            "status_code": 401
        });
        return;
    }
    const car = await prisma.car.create({
        data: {
            category : req.body.category,
            model : req.body.model,
            numberPlate : req.body.number_plate,
            currentCity: req.body.current_city,
            rentPerHour : req.body.rent_per_hr
        }
    });

    res.status(200).json({
        "status": "Car added successfully",
        "car_id": car.id,
        "status_code": 200
    });
}

export const getRides = async (req, res) => {
    const rides = await prisma.car.findMany({
        where: {
            currentCity: req.query.origin,
            category: req.query.cat
        },
        include:{
            RentHistory : true
        }
    });

    if(!rides){
        res.status(400).json({
            "status" : "No cars available"
        });
    }

    rides.map(ride => {
        ride.total_payable_amt = ride.rentPerHour * Number(req.query.rh);
    });

    res.status(200).json(rides);
    
}

export const getACar = async (req,res) => {
    const car = await prisma.car.findUnique({
        where:{
            id : req.body.car_id,
            currentCity : req.body.origin
        }
    });

    if(!car || car.Available === "NO"){
        res.status(400).json({
            "status" : "No car is available at the moment",
            "status_code" : 400        
        });
    }
    const rentCar = await prisma.rent.create({
        data : {
            carId : req.body.car_id,
            origin : req.body.origin,
            destination : req.body.destination,
            totalAmount : Number(req.body.hours_requirement) * Number(car.rentPerHour),
            hours : req.body.hours_requirement
        }
    
    });

    const carUpdate = await prisma.car.update({
        where:{
            id : req.body.car_id
        },
        data: {
            Available : "NO"
        }
    });

    res.status(200).json({
        "status" : "Car rented successfully",
        "status_code" : 200,
        "rent_id" : rentCar.id,
        "total_payable_amt" : rentCar.totalAmount
    });
}

export const updateRent = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        if (user.role !== 'admin') {
            return res.status(401).json({
                status: "You are not authorised to create a car",
                status_code: 401
            });
        }

        const car = await prisma.car.findUnique({
            where: {
                id: req.body.car_id,
            }
        });

        if (!car) {
            return res.status(404).json({
                status: "Car not found",
                status_code: 404
            });
            return;
        }


        const rentDetails = await prisma.rentHistory.create({
            data: {
                totalAmount: Number(req.body.ride_details.hours_requirement) * Number(car.rentPerHour),
                origin: req.body.ride_details.origin,
                destination: req.body.ride_details.destination,
                doneOn: {
                    connect: { id: req.body.car_id }
                }
            }
        });

        const carUpdate = await prisma.car.update({
            where: {
                id: req.body.car_id
            },
            data: {
                Available: "YES"
            }
        });

        res.status(200).json({
            status: "Car's rent history updated successfully",
            status_code: 200
        });
    } catch (error) {
        console.error("Error updating rent history:", error);
        res.status(500).json({ error: error.message });
    }
}
