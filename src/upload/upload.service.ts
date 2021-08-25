import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import path from 'path';
import { Upload } from './interfaces/upload.interface';
@Injectable()
export class UploadService {
  async saveImage(file: Upload): Promise<string> {
    return new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `public/image/${file.filename}`),
          ),
        )
        .on('finish', () => resolve(file.filename))
        .on('error', () => reject('not complete'));
    });
  }
}
