import nodemailer, { Transporter } from "nodemailer";



export interface SendEmailOption{
    to : string | string[],
    subject :  string,
    htmlBody :  string,
    attachments?: Attachment[],
};

interface Attachment{
    filname : string;
    path :  string;
};

export class EmailService {
    private transporter : Transporter;

    constructor(
        mailerService : string,
        mailerEmail :string,
        senderEmailPassword : string,
        private readonly postToProvider: boolean,

    ){
        this.transporter =  nodemailer.createTransport({
            service : mailerService, 
            auth : {
                user : mailerEmail, 
                pass :  senderEmailPassword
            }
        });
    };

    async sendEmail(options : SendEmailOption){
        const  {htmlBody, subject, to, attachments=[]} = options;

        if(!this.postToProvider) return true;

        await this.transporter.sendMail({
            to,
            subject,
            html : htmlBody,
            attachments
         })
            .then(() => { 
                return true
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
};