// File: api/send-email.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, data } = req.body;

  // Safe default for recipients if env vars are missing
  const contactEmail = process.env.PALMSURE_CONTACT_EMAIL || 'info@palmshore.co.za';
  const adminEmail = process.env.PALMSURE_ADMIN_EMAIL || 'roy@palmshore.co.za';
  const recipients = [contactEmail, adminEmail];

  let subject = '';
  let htmlContent = '';

  if (type === 'contact') {
    subject = `New Web Inquiry: ${data.fullName}`;
    htmlContent = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.contactNumber}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px;">
        ${data.message}
      </blockquote>
    `;
  } else if (type === 'quote') {
    subject = `New Quote Request (${data.type}) - ${data.personal.firstName} ${data.personal.lastName}`;
    const details = data.details || {};

    let specificDetailsHtml = '';
    if (data.type === 'property') {
      specificDetailsHtml = `<p><strong>Address:</strong> ${details.propertyAddress}</p><p><strong>Value:</strong> R${details.propertyValue}</p>`;
    } else if (data.type === 'vehicle') {
      specificDetailsHtml = `<p><strong>Vehicle:</strong> ${details.vehicleYear} ${details.vehicleMake} ${details.vehicleModel}</p>`;
    } else if (data.type === 'business') {
      specificDetailsHtml = `<p><strong>Business:</strong> ${details.businessName}</p><p><strong>Industry:</strong> ${details.industry}</p>`;
    }

    htmlContent = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.personal.firstName} ${data.personal.lastName}</p>
      <p><strong>Email:</strong> ${data.personal.email}</p>
      <p><strong>Phone:</strong> ${data.personal.phone}</p>
      <hr>
      ${specificDetailsHtml}
    `;
  }

  try {
    const emailResponse = await resend.emails.send({
      from: 'Palmsure Website <info@palmsure.co.za>',
      to: recipients,
      subject: subject,
      html: htmlContent,
      reply_to: type === 'contact' ? data.email : data.personal.email
    });

    return res.status(200).json(emailResponse);
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: error.message });
  }
};
