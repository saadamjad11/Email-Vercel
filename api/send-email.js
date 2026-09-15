// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, projectType, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Form <onboarding@resend.dev>',
      to: 'hkhanservices@gmail.com', // Your actual email address
      subject: `💼 New Project Brief from ${name}`,
      html: `
        <h3>New Project Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Project Brief:</strong></p>
        <p style="white-space: pre-line; background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
