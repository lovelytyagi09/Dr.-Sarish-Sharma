const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (css, images, js)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'assets')));
// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Dr. Sarish Sharma' });
});
//About Page
app.get('/about/doctor', (req, res) => {
  res.render('About/doctor.ejs', { title: 'Dr. Sarish Sharma' });
});
app.get('/about/clinic', (req, res) => {
  res.render('About/clinic.ejs', { title: 'Dr. Sarish Sharma' });
});
app.get('/conference', (req, res) => {
  res.render('About/conference.ejs', { title: 'Dr. Sarish Sharma' });
});
//Contact Page
app.get('/contact', (req, res) => {
  res.render('contact.ejs', { title: 'Dr. Sarish Sharma' });
});
//Service Page
app.get('/services', (req, res) => {
  res.render('service.ejs', { title: 'Dr. Sarish Sharma' });
});
app.get('/patientcareservice/homephysiotheraphy', (req, res) => {
  res.render('Services/Patient Care Services/Home Physiotherapy Delhi.ejs', { title: 'Dr. Sarish Sharma' });
});
app.get('/patientcareservice/physiotheraphyrehab', (req, res) => {
  res.render('Services/Patient Care Services/Physiotherapy & Rehab at Home.ejs', { title: 'Dr. Sarish Sharma' });
});

//SERVICE PAGE WITH SUB FOLDERS 

app.get("/services/sports-injury-vitamin-balance", (req, res) => {
  res.render("services/sports-injury/index.ejs");
})
app.get('/services/joint-lubrication', (req, res) => {
  res.render('services/Joint lubrication/index.ejs');
});
app.get('/services/disc-treatment', (req, res) => {
  res.render('services/Disc Procedure/index.ejs');
});
app.get('/services/knee-hip-spine', (req, res) => {
  res.render('services/Knee Ligament Treatment/index.ejs');
});
app.get('/services/joint-trauma', (req, res) => {
  res.render('services/Joint Trauma/index.ejs');
});
app.get('/services/pain-management', (req, res) => {
  res.render('services/Pain Management/index.ejs');
});
app.get('/services/fracture-treatment', (req, res) => {
  res.render('services/Fracture Treatment/index.ejs');
});


// BLOGS 

app.get('/blogs', (req, res) => {
  res.render('blog/index.ejs');
});
//Submit Form 
app.post('/submit-appointment', (req, res) => {

  const {
    firstName, lastName,
    phone, email,
    date, time,
    service, concern
  } = req.body;

  // Format the message
  const message = `
*New Appointment Request*
----------------------------
*Name:* ${firstName} ${lastName}
*Phone:* ${phone}
*Email:* ${email}
*Date:* ${date}
*Time:* ${time}
*Service:* ${service}
*Concern:* ${concern || 'Not specified'}
  `.trim();

  // Encode for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);

  // Your WhatsApp number with country code — no + sign
  const whatsappNumber = '9259270578';

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Send URL back to frontend
  res.json({ url: whatsappURL });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});