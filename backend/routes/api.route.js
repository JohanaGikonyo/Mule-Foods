const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
prisma.$connect()
    .then(() => {
        console.log("Database Connected Successfully")
    })
    .catch((e) => {
        console.error("An error occurred connecting to the database", e);
    })
router.get('/', async (req, res, next) => {
    try {
        res.send({ message: "Api Successfully Created!" })
    } catch (error) {
        next({ status: 404, message: error.message || "Page Not Found!" })
    }

})
router.post('/signin', async (req, res, next) => {
    const { name, email, location, phone } = req.body;
    try {


        const check = await prisma.user.findUnique({ where: { phone: parseInt(phone) } })


        if (check) {
            // User with the given Phone already exists
            res.json("exists");
        } else {
            // User with the given email doesn't exist, create a new user
            const newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    location: location,
                    phone: parseInt(phone)
                }
            });
            const secretKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({ userId: newUser.id, userName: newUser.name, userLocation: newUser.location, userPhone: newUser.phone, userEmail: newUser.email }, secretKey, { expiresIn: '1y' });
            console.log(`secretkey is ${secretKey}`)
            // Return token to the client
            return res.json({ token });
        }
    } catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    const { phone } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { phone: parseInt(phone) } })
        if (user) {
            const { id, name, email, location } = user;
            const secretKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({ userId: id, userName: name, userPhone: phone, userEmail: email, userLocation: location }, secretKey, { expiresIn: '1y' });
            console.log(`secretkey is ${secretKey}`)
            // Return token to the client
            return res.json({ token });
        }
        else {
            res.json("does not exist")
        }
    } catch (error) {
        next(error)
    }
})


router.patch('/update/:phone', async (req, res, next) => {
    const phone = req.params.phone;
    const { location } = req.body;
    try {
        // Update the user's location
        await prisma.user.update({ data: { location: location }, where: { phone: parseInt(phone) } });

        // Fetch the updated user
        const updatedUser = await prisma.user.findUnique({ where: { phone: parseInt(phone) } });

        // Check if the user exists
        if (updatedUser) {
            const { id, name, email, location, phone } = updatedUser;
            const secretKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({ userId: id, userName: name, userLocation: location, userPhone: phone, userEmail: email }, secretKey, { expiresIn: '1y' });
            console.log(`secretkey is ${secretKey}`)
            // Return the new token to the client
            return res.json({ token });
        } else {
            res.json('not success')
        }
    } catch (error) {
        next(error);
    }
});






module.exports = router;