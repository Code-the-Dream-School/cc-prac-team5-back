const nodemailer = require('nodemailer');;

// sendGridMail.setApiKey(process.env.SENDGRID_USERNAME);

// const sendEmail = async (to, subject, text) => {
//     const message = {
//         from: 'Calcifer App <calcifer-app@testmail.com>',
//         to,
//         subject,
//         text
//     }
    
//   try {
//     await sendGridMail.send(message);
//     console.log('Email sent successfully')
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = sendEmail;




//1) create a transporter
const transporter = nodemailer.createTransport({
    service: 'sendGrid',
    secure: false,
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
    }
    
})

//send email
const sendEmail = async (to, subject, text) => {
    let message = {
        from: 'Calcifer App <yoneypun@me.com>',
        to,
        subject,
        text
    }
    
    //3) send email
    try {
        const sentMessage = await transporter.sendMail(message);
        console.log('Message', sentMessage.messageId);
        console.log(message)
    } catch (error) {
        console.error('Error sending email', error);
    }
   
};

module.exports = sendEmail;