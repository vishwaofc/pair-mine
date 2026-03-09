import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mega = require('megajs');

//import * as mega from 'megajs';

const credentials = {
  email: "tharuandayoutu723@gmail.com",
  password: "Tharuweb21##",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36"
};


const upload = (fileStream, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      const storage = new mega.Storage(credentials, (err) => {
        if (err) return reject(err);

        const uploadOptions = { 
          name: fileName, 
          allowUploadBuffering: true 
        };

        const up = storage.upload(uploadOptions);
        fileStream.pipe(up);
        up.on('complete', (file) => {
          file.link((err, link) => {
            if (err) return reject(err);
            resolve(link);
          });
        });

        up.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { upload };
