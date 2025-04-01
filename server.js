const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse form data
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Configure nodemailer to send emails
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail as the email provider
        auth: {
            user: 'fredrickkansis95@gmail.com', // Your Gmail address
            pass: 'bretwum@20'    // Your Gmail app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'fredrickkansis95@gmail.com', // Your Gmail address to receive messages
        subject: `Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending message. Please try again later.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});