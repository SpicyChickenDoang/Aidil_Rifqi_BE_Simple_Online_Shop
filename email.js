const nodemailer = require('nodemailer');
require('dotenv').config();


exports.send = async (to, subject, items) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const body = `
    <h2>Order Summary</h2>
    <ul>
      ${items.map(item => `
        <li>
          <strong>${item.title}</strong>: ${item.qty}
        </li>
      `).join('')}
    </ul>
  `;

  const mailOptions = {
    from: '"Aidil" aidil.arm@gmail.com',
    to,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

exports.hello = async () => {
  console.log("BERHASIL LOG");
}