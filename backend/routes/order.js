const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const WebSocket = require('ws');
router.use(express.json());
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

prisma.$connect()
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((e) => {
        console.error("An error occurred connecting to the database", e);
    });
// Broadcast to all connected clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

router.post('/order', async (req, res, next) => {
    const { location, name, products, totalQuantity, totalCost } = req.body;

    // Serialize the products array to a JSON string
    const serializedProducts = JSON.stringify(products);
    try {
        const newOrder = await prisma.order.create({
            data: {
                location: location,
                name: name,
                products: serializedProducts,
                totalQuantity: parseInt(totalQuantity),
                totalCost: parseInt(totalCost)
            }
        });
        wss.broadcast(JSON.stringify({ type: 'new_order', order: newOrder }));
        res.json("Order successful");
        console.log(newOrder);
    } catch (error) {
        next({ status: 500, message: "Error Found: " + error.message });
        console.error(error)
    }
});

router.get('/getorders', async (req, res, next) => {
    try {
        const allOrders = await prisma.order.findMany();
        res.json(allOrders);
    } catch (error) {
        next(error);
        console.log("An error Occurred", error)
    }
})
router.put('/updateorderstatus/:id', async (req, res, next) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status: status }
        });
        wss.broadcast(JSON.stringify({ type: 'update_order', order: updatedOrder }));
        res.json(updatedOrder);
    } catch (error) {
        next({ status: 500, message: "Error updating order status: " + error.message });
        console.error(error);
    }
});

module.exports = router;
