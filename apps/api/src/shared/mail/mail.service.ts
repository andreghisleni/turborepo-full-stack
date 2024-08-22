import { constants } from '@/constants';
import { SesService } from '@agsolutions/nestjs-ses';
import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import { convert } from 'html-to-text';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { MailTemplate, ISendEmail } from './mail.interface';
import { baseHtml } from './templates/templateBase';

@Injectable()
export class MailService {
  constructor(private sesService: SesService) { } // eslint-disable-line

  async sendMail<T extends MailTemplate>({ template, to, subject }: ISendEmail<T>) {
    const templatePath = join(__dirname, 'templates', template.name);

    // console.log(templatePath);

    const t = await readFile(templatePath, 'utf-8');

    const html = baseHtml(t);

    const parsedHtml = handlebars.compile(html)({
      app_name: constants.APP_NAME,
      email_title: subject,
      ...template.data,
    });

    const plainText = convert(parsedHtml, {
      wordwrap: 130,
    });

    const { from } = constants.mail;

    await this.sesService.sendEmail({
      from: `${from?.name} <${from?.email}>`,
      to: `${to.name} <${to.email}>`,
      subject,
      html: parsedHtml,
      text: plainText,
    });

    return `Email enviado para ${to.email}`;
  }
}
