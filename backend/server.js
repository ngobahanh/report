const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

// Import routes
const personnelRoutes = require('./routes/personnel');
const unitsRoutes = require('./routes/units');
const trainingReportsRoutes = require('./routes/trainingReports');
const workshopReportsRoutes = require('./routes/workshopReports');
const taskReportsRoutes = require('./routes/taskReports');
const deviceReportsRoutes = require('./routes/deviceReports');
const dashboardRoutes = require('./routes/dashboard');
const exportRoutes = require('./routes/export');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

// Routes
app.use('/api/personnel', personnelRoutes);
app.use('/api/units', unitsRoutes);
app.use('/api/training-reports', trainingReportsRoutes);
app.use('/api/workshop-reports', workshopReportsRoutes);
app.use('/api/task-reports', taskReportsRoutes);
app.use('/api/device-reports', deviceReportsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/export', exportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
