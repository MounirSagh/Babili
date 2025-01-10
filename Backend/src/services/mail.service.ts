import { createTransport, TransportOptions, getTestMessageUrl, SentMessageInfo } from "nodemailer";
require('dotenv').config();

const transporter = createTransport({
  service: 'Outlook',
  port: 587,
  auth: {
      user: process.env.BABILY_EMAIL,
      pass: process.env.BABILY_PASSWORD 
  }
} as TransportOptions);

export async function sendApprovalEmailService(toEmail: string) {
  console.log(toEmail)
  transporter.sendMail({
    from: "m.saghfary@aui.ma",
    to: toEmail,
    subject: "Your Order Has Been Approved ⭐",
    html: `
      <!DOCTYPE html>
      <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Approval</title>
            <style>
                body {
                    font-family: 'Times New Roman', Times, serif;
                    line-height: 1.6;
                    color: #333;
                    font-size: 16px;
                    margin: 20px;
                }

                h2 {
                    color: #007bff;
                }
            </style>
        </head>

        <body>

            <h2>🌟 Thank You for Trusting Bably!</h2>

            <p>Dear Friend,</p>

            <p>This is to let you know that your order has been well approved!</p>

            <p>Please Reply to this email by your full name and address to confirm your oder</p>

            <p>Best wishes!</p>

        </body>

    </html>
    `,
  }, (err: any, info: SentMessageInfo) => {
    if (err) {
      console.error(err, "Error sending email");
      return;
    }

    console.info(`Preview URL: ${getTestMessageUrl(info)}`)
  });
}


export async function sendConfirmationEmailService(toEmail: string) {
  console.log(toEmail)
  transporter.sendMail({
    from: "m.saghfary@aui.ma",
    to: toEmail,
    subject: "Your Order Has Been Place ⭐",
    html: `
      <!DOCTYPE html>
      <html lang="en">

              <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Rquest Confirmation</title>
            <style>
                body {
                    font-family: 'Times New Roman', Times, serif;
                    line-height: 1.6;
                    color: #333;
                    font-size: 16px;
                    margin: 20px;
                }

                h2 {
                    color: #007bff;
                }
            </style>
        </head>

        <body>

            <h2>🌟 Thank You for Trustng Babily!</h2>

            <p>Dear Friend,</p>

            <p>This is to let you know that your request for an order has been well processed!</p>

            <p>Your inquiry is forwarded to those in charge, who will follow-up with you accordingly</p>

            <p>Best wishes!</p>
            
        </body>

    </html>
    `,
  }, (err: any, info: SentMessageInfo) => {
    if (err) {
      console.error(err, "Error sending email");
      return;
    }

    console.info(`Preview URL: ${getTestMessageUrl(info)}`)
  });
}
