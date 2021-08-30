import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { Upload } from './interfaces/upload.interface';
import { parse } from 'path';
import { SUBFOLDER } from './enum/SUBFOLDER';
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  async singleUpload(
    { createReadStream, filename }: Upload,
    subfolderName: SUBFOLDER,
  ): Promise<string> {
    const { ext } = parse(filename);
    const newFileName = (await this.generateRandomNameFile(10)) + ext;
    const pathImage = this.configService.get('IMAGE_PATH') || '/images';
    const fullPath = `${pathImage}/${subfolderName}`;
    if (!existsSync(pathImage) || !existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`${fullPath}/${newFileName}`))
        .on('finish', () => resolve(newFileName))
        .on('error', (err) => {
          reject(err);
        });
    });
  }
  async multipleUpload(
    files: Upload[],
    subfolder: SUBFOLDER,
  ): Promise<string[]> {
    const values = await Promise.all(files);
    const allNewFiles = values.map(async (file) => {
      const newFileName = await this.singleUpload(file, subfolder);
      return newFileName;
    });
    const filesname = await Promise.all(allNewFiles);
    return filesname;
  }
  async deleteFiles(files: string[], subfolder: SUBFOLDER) {
    const path = this.configService.get('IMAGE_PATH') || '/images';
    for (const fileName of files) {
      const pathToDelete = `${path}/${subfolder}/${fileName}`;
      unlinkSync(pathToDelete);
    }
  }
  generateRandomNameFile(length: number): Promise<string> {
    let result = '';
    const character =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
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
