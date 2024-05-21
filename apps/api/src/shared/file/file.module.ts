import { Module } from '@nestjs/common';

import { CloudFlareModule } from '../cloud-flare-r2/cloud-flare-r2.module';
import { FileController } from './file.controller';

@Module({
  imports: [CloudFlareModule],

  controllers: [FileController],
})
export class FileModule {}
