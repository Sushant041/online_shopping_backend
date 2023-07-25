const nodemailer = require("nodemailer");

const hello = () =>{
    console.log("hello");
}
module.exports = async (email, subject, text) =>{
    try {
        const transport = nodemailer.createTransport({
            host: HOST,
            service: SERVIC,
            port: PORT,
            secure:SECURE,
            auth:{
                user:USER,
                pass:PASS
            }
        });

        console.log("hello");

        const mailOptions = {
            from: {
              email: "email",
              name: "name",
            },
            to: email,
            subject: subject,
            text: text,
          };
          
          transport.sendMail(mailOptions).then((res) => {
            console.log("Email sent successfully");
          }, (err) => {
            console.log("Error sending email");
            console.log(err);
          });
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}
