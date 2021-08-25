import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import { Upload } from './interfaces/upload.interface';
import { parse } from 'path';
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  async saveImage(
    { createReadStream, filename }: Upload,
    subfolderName: string,
  ): Promise<string> {
    const { ext } = parse(filename);
    const newFileName = (await this.generateRandomNameFile(10)) + ext;
    const pathToSaveImage = this.configService.get('IMAGE_PATH') || '~/images';
    const fullPath = `${pathToSaveImage}${
      subfolderName ? '/' + subfolderName : ''
    }/${newFileName}`;
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(fullPath))
        .on('finish', () => resolve(newFileName))
        .on('error', (err) => {
          reject('not complete');
        });
    });
  }
  generateRandomNameFile(length: number): Promise<string> {
    let result = '';
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ1234567890';
    const characterLength = character.length;
    const promise: Promise<string> = new Promise((resolve) => {
      for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * characterLength);
        result += character[randomNumber];
      }
      resolve(result);
    });
    return promise;
  }
}
