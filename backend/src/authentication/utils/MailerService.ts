import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailerService{
    private transporter=nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    async sendResetPasswordEmail(to:string,token:string):Promise<void>{
        const resetLink=`http://localhost:5173/reset-password?token=${token}`;
        await this.transporter.sendMail({
            from: '"merobihe" <sujanbhattarai699@gmail.com>',
            to,
            subject: 'Reset Password Request',
            html: `<p>Click the link to reset your password:<a href="${resetLink}">${resetLink}</a></p>`,
        });
    }
}