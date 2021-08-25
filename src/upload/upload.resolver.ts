import { Resolver, Args, Mutation } from '@nestjs/graphql';

// import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Upload } from './interfaces/upload.interface';

@Resolver()
export class UploadResolver {
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: Upload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(
            `/Users/boatprakit/Desktop/Dev/projects/int222-be-nest/public/images/${filename}`,
          ),
        )
        .on('finish', () => resolve(true))
        .on('error', (err) => {
          reject(false);
        }),
    );
  }
}
