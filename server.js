
// import awsIot from "aws-iot-device-sdk";

// // AWS IoT Core Device Configuration
// const device = awsIot.device({
//     keyPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/private.pem.key",
//     certPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/certificate.pem.crt",
//     caPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/AmazonRootCA1.pem",
//     clientId: "Backend_Listener_" + Math.random().toString(16).substr(2, 8),  // Unique Client ID for backend
//     host: "a6j4hc4ok392w-ats.iot.eu-central-1.amazonaws.com",
//     keepalive: 60,
//     clean: false,  // Keep session active for multiple subscribers
// });

// // Topics for Machine & Food Data
// const topics = ["newpol", "newpol1"];

// // Connect to AWS IoT Core
// device.on("connect", () => {
//     console.log("✅ Connected to AWS IoT Core");

//     // Subscribe to both topics
//     topics.forEach((topic) => {
//         device.subscribe(topic, { qos: 1 }, (err, granted) => {
//             if (err) {
//                 console.error(`❌ Subscription Error for ${topic}:`, err);
//             } else {
//                 console.log(`📡 Subscribed to topic: ${granted[0].topic}`);
//             }
//         });
//     });
// });

// // Debugging Event Listeners
// device.on("error", (error) => console.error("❌ Device Error:", error));
// device.on("close", () => console.warn("⚠ Connection closed"));
// device.on("reconnect", () => console.warn("🔄 Reconnecting..."));
// device.on("offline", () => console.warn("🚫 Device went offline"));

// // Event Listener for Receiving Messages
// device.on("message", (topic, payload) => {
//     console.log(`📥 Received message on topic '${topic}': ${payload.toString()}`);

//     try {
//         const data = JSON.parse(payload.toString());

//         if (topic === "newpol1") {
//             console.log("🏭 Machine Data Received:");
//             console.log(`🔹 Timestamp: ${data.timestamp}`);
//             console.log(`🔹 Temperature: ${data.temperature_celsius}°C`);
//             console.log(`🔹 Humidity: ${data.humidity_percent}%`);
//         } else if (topic === "newpol") {
//             console.log("🥗 Food Data Received:");
//             console.log(`🔹 Unique ID: ${data.unique_id}`);
//             console.log(`🔹 Food Name: ${data.food_name}`);
//             console.log(`🔹 Timestamp: ${data.timestamp}`);
//             console.log(`🔹 Gas Level: ${data.gas_level_ppm}`);
//             console.log(`🔹 Status: ${data.status}`);
//         }
//     } catch (error) {
//         console.error("❌ Error parsing received data:", error);
//     }
// });


// import awsIot from "aws-iot-device-sdk";
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import path from "path";
// import { fileURLToPath } from "url";

// // Resolve __dirname equivalent in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Initialize Express & Socket.io
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Middleware for Serving Static Files & Views
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// // AWS IoT Core Configuration
// const device = awsIot.device({
//     keyPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/private.pem.key",
//     certPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/certificate.pem.crt",
//     caPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/AmazonRootCA1.pem",
//     clientId: "Backend_Listener_" + Math.random().toString(16).substr(2, 8),
//     host: "a6j4hc4ok392w-ats.iot.eu-central-1.amazonaws.com",
//     keepalive: 60,
//     clean: false,
// });

// // Topics to Subscribe
// const topics = ["newpol", "newpol1"];

// device.on("connect", () => {
//     console.log("✅ Connected to AWS IoT Core");

//     topics.forEach((topic) => {
//         device.subscribe(topic, { qos: 1 }, (err, granted) => {
//             if (err) {
//                 console.error(`❌ Subscription Error for ${topic}:`, err);
//             } else {
//                 console.log(`📡 Subscribed to topic: ${granted[0].topic}`);
//             }
//         });
//     });
// });

// // Handle Errors & Reconnection
// device.on("error", (error) => console.error("❌ Device Error:", error));
// device.on("close", () => console.warn("⚠ Connection closed"));
// device.on("reconnect", () => console.warn("🔄 Reconnecting..."));
// device.on("offline", () => console.warn("🚫 Device went offline"));

// // Store Latest Data
// let latestMachineData = { temperature: "N/A", humidity: "N/A" };
// let foodSummary = {};

// // Handle Incoming IoT Messages
// device.on("message", (topic, payload) => {
//     console.log(`📥 Received message on topic '${topic}': ${payload.toString()}`);

//     try {
//         const data = JSON.parse(payload.toString());

//         if (topic === "newpol1") {
//             latestMachineData = {
//                 temperature: data.temperature_celsius,
//                 humidity: data.humidity_percent,
//             };
//             io.emit("machineDataUpdate", latestMachineData);
//         } else if (topic === "newpol") {
//             const foodName = data.food_name;
//             if (!foodSummary[foodName]) {
//                 foodSummary[foodName] = { fresh: 0, spoiled: 0 };
//             }
//             if (data.status === "fresh") {
//                 foodSummary[foodName].fresh++;
//             } else {
//                 foodSummary[foodName].spoiled++;
//             }
//             io.emit("foodDataUpdate", data);
//         }
//     } catch (error) {
//         console.error("❌ Error parsing received data:", error);
//     }
// });

// // Routes
// app.get("/", (req, res) => {
//     res.render("index", { latestMachineData, foodSummary });
// });

// app.get("/chart", (req, res) => {
//     res.sendFile(path.join(__dirname, "views/chart.html"));
// });

// app.get("/analytics", (req, res) => {
//     res.render("analytics");
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import awsIot from "aws-iot-device-sdk";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

const __dirname = path.resolve();

// 🔹 Store Food Data History (for Analytics)
let foodDataHistory = [];

// 🔹 Store Latest Machine Data (for index.ejs)
let latestMachineData = {
    temperature: "N/A",
    humidity: "N/A",
};

// 🔹 Store Food Summary (for index.ejs)
let foodSummary = {}; // { food_name: { fresh: 0, spoiled: 0 } }

// 🔹 Store Chart Data (for Persistence)
let chartData = {
    temperature: [],
    humidity: [],
    labels: [],
};

// ✅ AWS IoT Core Device Configuration
const device = awsIot.device({
    keyPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/private.pem.key",
    certPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/certificate.pem.crt",
    caPath: "C:/Users/gaura/OneDrive/Desktop/aws-final/AmazonRootCA1.pem",
    clientId: "Backend_Listener_" + Math.random().toString(16).substr(2, 8),
    host: "a6j4hc4ok392w-ats.iot.eu-central-1.amazonaws.com",
    keepalive: 60,
    clean: false,
});

// Subscribe to AWS IoT Topics
const topics = ["newpolFresh", "newpol1"];
device.on("connect", () => {
    console.log("✅ Connected to AWS IoT Core");
    topics.forEach((topic) => {
        device.subscribe(topic, { qos: 1 }, (err, granted) => {
            if (err) console.error(`❌ Subscription Error:`, err);
            else console.log(`📡 Subscribed to: ${granted[0].topic}`);
        });
    });
});


// ✅ Handle Incoming IoT Messages
device.on("message", (topic, payload) => {
    console.log(`📥 Received '${topic}': ${payload.toString()}`);
    try {
        const data = JSON.parse(payload.toString());

        if (topic === "newpolFresh") {
            // 🔹 Update Food History
            foodDataHistory.push({
                unique_id: data.unique_id,
                food_name: data.food_name,
                timestamp: data.timestamp,
                gas_level_ppm: data.gas_level_ppm,
                status: data.status,
            });

            // 🔹 Update Food Summary
            if (!foodSummary[data.food_name]) {
                foodSummary[data.food_name] = { fresh: 0, spoiled: 0 };
            }
            if (data.status.toLowerCase() === "fresh") {
                foodSummary[data.food_name].fresh++;
            } else {
                foodSummary[data.food_name].spoiled++;
            }

            // 🔹 Emit Food Updates
            io.emit("foodDataUpdate", data);
            io.emit("foodSummaryUpdate", foodSummary);
        }

        if (topic === "newpol1") {
            // ✅ Fix: Use Correct Property Names from IoT Data
            const temperature = parseFloat(data.temperature_celsius);
            const humidity = parseFloat(data.humidity_percent);

            if (isNaN(temperature) || isNaN(humidity)) {
                console.error("⚠️ Invalid temperature/humidity received:", data);
                return;
            }

            // 🔹 Update Machine Data
            latestMachineData = { temperature, humidity };

            // 🔹 Store Chart Data
            const timestamp = new Date().toLocaleTimeString();
            chartData.labels.push(timestamp);
            chartData.temperature.push(temperature);
            chartData.humidity.push(humidity);

            // Keep only last 10 data points
            if (chartData.labels.length > 10) {
                chartData.labels.shift();
                chartData.temperature.shift();
                chartData.humidity.shift();
            }

            // 🔹 Emit Updates
            io.emit("machineDataUpdate", latestMachineData);
            io.emit("chartDataUpdate", chartData);
        }
    } catch (error) {
        console.error("❌ Error parsing data:", error);
    }
});


/* 
==================================
  ✅ GET Routes for EJS & HTML Pages
==================================
*/

// 1️⃣ Route for **Dashboard (index.ejs)**
app.get("/", (req, res) => {
    res.render("index", { latestMachineData, foodSummary });
});

// 2️⃣ Route for **Chart Page (chart.html)**
app.get("/chart", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "chart.html"));
});

// 3️⃣ Route for **Analytics Page (analytics.ejs)**
app.get("/analytics", (req, res) => {
    res.render("analytics", { foodDataHistory });
});

// ✅ Start the Server
server.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
