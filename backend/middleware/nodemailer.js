const nodemailer = require('nodemailer')

exports.sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:"ajstyles060@gmail.com",
            pass:"jatin1152"
        }
    })

    const mailOptions = {
    from:"ajstyles060@gmail.com",
    to:options.email,
    subject:options.subject,
    text:options.message
    }
    await transporter.sendMail(mailOptions);
}