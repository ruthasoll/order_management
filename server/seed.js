const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserModel = require("./models/users");
const ProductModel = require("./models/products");
const OrderModel = require("./models/order");
const bcrypt = require("bcryptjs");

dotenv.config();

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("adminpassword", 10), // Password is hashed
    role: "admin",
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: bcrypt.hashSync("userpassword", 10), // Password is hashed
    role: "user",
  },
];

const seedProducts = [
  {
    name: "Product 1",
    price: 100,
    productImage: "image1.jpg",
    description: "Description for product 1",
    avaliableQnty: 10,
  },
  {
    name: "Product 2",
    price: 200,
    productImage: "image2.jpg",
    description: "Description for product 2",
    avaliableQnty: 20,
  },
];

const seedOrders = [
  {
    user: null, // This will be set after creating users
    items: [
      {
        product: null, // This will be set after creating products
        quantity: 2,
      },
    ],
    status: "pending",
    deliveryDate: new Date(),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("MongoDB Connected");
    await OrderModel.collection.drop();
    await ProductModel.collection.drop();
    await UserModel.collection.drop();
    //
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});

    const createdUsers = await UserModel.insertMany(seedUsers);
    const createdProducts = await ProductModel.insertMany(seedProducts);

    seedOrders[0].user = createdUsers[1]._id;
    seedOrders[0].items[0].product = createdProducts[0]._id;

    await OrderModel.insertMany(seedOrders);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database", error);
    process.exit(1);
  }
};

seedDatabase();
