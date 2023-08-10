require('dotenv').config();
const nodemailer = require("nodemailer");


const sendMail = async (email, subject, text) =>{
    
    let body ={
        from: process.env.USER,
        to: email,
        html: `<p>${subject} using the following link <p>
            ${text}</p>
            </p> `
         }

    try {
        //connect to smtp 
        const transporter = nodemailer.createTransport({

            host: process.env.HOST,
            service: "gmail",
            port: process.env.PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });


        transporter.verify(function(error, success) {
            if (error) {
            console.log(error);
            } else {
            console.log("Server is ready to take our messages");
            }
        });

        const info = await transporter.sendMail(body);
          

          console.log("Email sent successfully", info.response);

    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}

module.exports = sendMail;
