// // require("dotenv").config();
// // const express = require("express");
// // const app = express();
// // const path = require('path');
// // const cors = require("cors");
// // const connectDB = require("./config/db");
// // const { secret } = require("./config/secret");
// // const PORT = secret.port ;
// // const morgan = require('morgan')
// // // error handler
// // const globalErrorHandler = require("./middleware/global-error-handler");
// // // routes
// // const userRoutes = require("./routes/user.routes");
// // const categoryRoutes = require("./routes/category.routes");
// // const brandRoutes = require("./routes/brand.routes");
// // const userOrderRoutes = require("./routes/user.order.routes");
// // const productRoutes = require("./routes/product.routes");
// // const orderRoutes = require("./routes/order.routes");
// // const couponRoutes = require("./routes/coupon.routes");
// // const reviewRoutes = require("./routes/review.routes");
// // const adminRoutes = require("./routes/admin.routes");
// // // const uploadRouter = require('./routes/uploadFile.route');
// // const cloudinaryRoutes = require("./routes/cloudinary.routes");

// // // middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(morgan('dev'));
// // app.use(express.static(path.join(__dirname, 'public')));

// // // connect database
// // connectDB();

// // app.use("/api/user", userRoutes);
// // app.use("/api/category", categoryRoutes);
// // app.use("/api/brand", brandRoutes);
// // app.use("/api/product", productRoutes);
// // // app.use('/api/upload',uploadRouter);
// // app.use("/api/order", orderRoutes);
// // app.use("/api/coupon", couponRoutes);
// // app.use("/api/user-order", userOrderRoutes);
// // app.use("/api/review", reviewRoutes);
// // app.use("/api/cloudinary", cloudinaryRoutes);
// // app.use("/api/admin", adminRoutes);

// // // root route
// // app.get("/", (req, res) => res.send("Apps worked successfully"));

// // app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// // // global error handler
// // app.use(globalErrorHandler);
// // //* handle not found
// // app.use((req, res, next) => {
// //   res.status(404).json({
// //     success: false,
// //     message: 'Not Found',
// //     errorMessages: [
// //       {
// //         path: req.originalUrl,
// //         message: 'API Not Found',
// //       },
// //     ],
// //   });
// //   next();
// // });

// // module.exports = app;




// require("dotenv").config();
// const express = require("express");
// const app = express();
// const path = require('path');
// const cors = require("cors");
// const connectDB = require("./config/db");
// const { secret } = require("./config/secret");
// const PORT = secret.port;
// const morgan = require('morgan');

// // error handler
// const globalErrorHandler = require("./middleware/global-error-handler");

// // routes
// const userRoutes = require("./routes/user.routes");
// const categoryRoutes = require("./routes/category.routes");
// const brandRoutes = require("./routes/brand.routes");
// const userOrderRoutes = require("./routes/user.order.routes");
// const productRoutes = require("./routes/product.routes");
// const orderRoutes = require("./routes/order.routes");
// const couponRoutes = require("./routes/coupon.routes");
// const reviewRoutes = require("./routes/review.routes");
// const adminRoutes = require("./routes/admin.routes");
// // const uploadRouter = require('./routes/uploadFile.route');
// const cloudinaryRoutes = require("./routes/cloudinary.routes");
// const customDesignRoutes = require("./routes/customDesign.routes");

// const allowedOrigins = [
//   // "http://localhost:3002",
//   "http://localhost:3001",            
//   "http://localhost:3000",              
//   // "https://look-fame-f.vercel.app",
//   // "https://lookfame.in"
//   "https://look-f-7z4d.vercel.app/"
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// app.use(express.json());
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

// connectDB();

// // ROUTES

// app.use("/api/user", userRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/brand", brandRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/products", productRoutes);
// // app.use('/api/upload', uploadRouter);
// app.use("/api/order", orderRoutes);
// app.use("/api/coupon", couponRoutes);
// app.use("/api/user-order", userOrderRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/cloudinary", cloudinaryRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/custom-designs", customDesignRoutes);

// // root route
// app.get("/", (req, res) => res.send("Apps worked successfully"));


// app.use(globalErrorHandler);

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found',
//       },
//     ],
//   });
//   next();
// });


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;


require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

// routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const adminRoutes = require("./routes/admin.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");
const customDesignRoutes = require("./routes/customDesign.routes");

// error handler
const globalErrorHandler = require("./middleware/global-error-handler");

// ✅ FIXED: correct origins (NO trailing slash)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  // "https://look-f-7z4d.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

connectDB();

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/custom-designs", customDesignRoutes);

// root
app.get("/", (req, res) => {
  res.send("Apps worked successfully");
});

app.use(globalErrorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ✅ FIXED: Render-compatible PORT
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

