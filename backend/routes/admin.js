const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());
prisma.$connect()
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((e) => {
        console.error("An error occurred connecting to the database", e);
    });
// Define routes after successful database connection
router.get('/', async (req, res, next) => {
    try {
        res.send({ message: "Admin Api Successfully Created!" });
        console.log("Admin api successfully created")
    } catch (error) {
        next({ status: 404, message: error.message || "Page Not Found!" });
    }
});

// async function createAdmin() {
//     const email = '';
//     const plainPassword = '';

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(plainPassword, 10);

//     // Create the admin user
//     try {
//         const admin = await prisma.admin.create({
//             data: {
//                 email: email,
//                 password: hashedPassword,
//             },
//         });
//         console.log('Admin user created:', admin);
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// createAdmin();




// Route to handle login
router.post('/login', async (req, res, next) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user by email
        const admin = await prisma.admin.findUnique({ where: { email: email } });

        if (admin) {
            // Compare provided password with stored hashed password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (passwordMatch) {
                return res.json("authorized");
            } else {
                return res.status(401).json("unauthorized");
            }
        } else {
            return res.status(401).json("unauthorized");
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;