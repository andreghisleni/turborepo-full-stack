import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { EnvService } from '../env/env.service';

@Injectable()
export class CloudflareR2Service {
  private r2: S3Client;
  private endpoint: string;

  constructor(private envService: EnvService) {
    this.endpoint = `https://${envService.get('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`;
    this.r2 = new S3Client({
      region: 'auto',
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.envService.get('CLOUDFLARE_ACCESS_KEY'),
        secretAccessKey: this.envService.get('CLOUDFLARE_SECRET_KEY'),
      },
    });
  }

  buildStorageUrl(file: string, isPrivate?: boolean): string {
    const bucket = this.envService.get('CLOUDFLARE_BUCKET_NAME');
    const url = new URL(`${bucket}/${isPrivate ? '' : 'public/'}${file}`, this.endpoint);

    return url.toString();
  }

  async getFileUrl(file: string): Promise<string> {
    const url = await getSignedUrl(
      this.r2,
      new GetObjectCommand({
        Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
        Key: `${file}`,
      }),
      { expiresIn: 60 * 60 /* 1 hour */ },
    );

    return url;
  }

  async getPutFileUrl(file: string): Promise<string> {
    const url = await getSignedUrl(
      this.r2,
      new PutObjectCommand({
        Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
        Key: `${file}`,
      }),
      { expiresIn: 60 * 60 /* 1 hour */ },
    );

    return url;
  }

  async getDeleteFileUrl(file: string): Promise<string> {
    const url = await getSignedUrl(
      this.r2,
      new DeleteObjectCommand({
        Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
        Key: `${file}`,
      }),
      { expiresIn: 60 * 60 /* 1 hour */ },
    );

    return url;
  }

  async moveFile(from: string, to: string): Promise<void> {
    // await this.r2.send(
    //   new PutObjectCommand({
    //     Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
    //     Key: `${to}`,
    //     CopySource: `${this.envService.get('CLOUDFLARE_BUCKET_NAME')}/${from}`,
    //   }),
    // );

    try {
      await this.r2.send(
        new CopyObjectCommand({
          Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
          Key: `${to}`,
          CopySource: `${this.envService.get('CLOUDFLARE_BUCKET_NAME')}/${from}`,
        }),
      );

      await this.r2.send(
        new DeleteObjectCommand({
          Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
          Key: `${from}`,
        }),
      );
    } catch (error) {
      throw new Error(`Error moving file, from: ${from}, to: ${to}, all error: ${error}`);
    }
  }

  async deleteFile(file: string): Promise<void> {
    await this.r2.send(
      new DeleteObjectCommand({
        Bucket: this.envService.get('CLOUDFLARE_BUCKET_NAME'),
        Key: `${file}`,
      }),
    );
  }
}
