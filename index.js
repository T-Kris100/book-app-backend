const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();
// passwordDB: IOSRXILUrEz4nHN0

// middleware
app.use(express.json());
app.use(
   cors({
      origin: [
         'http://localhost:5173',
         'https://book-app-frontend-psi-blond.vercel.app',
      ],
      credentials: true,
   })
);

const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/user/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
   res.send('Book App API is up and running!');
});

async function main() {
   await mongoose.connect(process.env.DB_URL);
   app.use('/', (req, res) => {
      res.send('Wellcome to Book Store API server');
   });
}

main()
   .then(() => console.log('MongoDB connect successful!'))
   .catch(err => console.log(err));

// app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
