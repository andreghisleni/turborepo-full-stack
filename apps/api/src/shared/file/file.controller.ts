import { Controller, Req, Get, Redirect } from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';

import { CloudflareR2Service } from '../cloud-flare-r2/cloud-flare-r2.service';

@Controller('files')
export class FileController {
  constructor(private cloudFlareR2Service: CloudflareR2Service) { } // eslint-disable-line


  @Get('?')
  // @Header('Cross-Origin-Resource-Policy', 'cross-origin')
  @Redirect(undefined, 301)
  async getLinkedTicket(@Req() req: Request) {
    const { file } = z
      .object({
        file: z.string(),
      })
      .parse(req.query);

    const url = await this.cloudFlareR2Service.getFileUrl(file);

    return {
      url,
    };
  }
}
