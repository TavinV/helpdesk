import nodemailer from "nodemailer";
import { SendEmailError } from "../errors/errors.js";

/*
Envia e-mails para um endereço de e-mail.
@param {String} to - O endereço de e-mail do destinatário.
@param {String} subject - O assunto do e-mail.
@param {String} html - O conteúdo HTML do e-mail.
*/
async function sendMail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NOREPLY_EMAIL_USER,
            pass: process.env.NOREPLY_EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.NOREPLY_EMAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw new SendEmailError("Não foi possível enviar o email");
    }
}

export default sendMail;