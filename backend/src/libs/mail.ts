/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

import mailConfig from '../config/mail';

const { host, port, secure, auth } = mailConfig;

class MailLib {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  sendEmail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  private configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new MailLib();
