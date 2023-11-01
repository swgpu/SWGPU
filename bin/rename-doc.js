import fs from 'fs';
import path from 'path';

const docFolder = './docs/classes';

fs.readdir(docFolder, (err, files) => {
  if (err) {
    console.error('Error reading ' + docFolder + ' :', err);
    return;
  }

  files.forEach(filename => {
    const oldPath = path.join(docFolder, filename);
    const splitFilename = filename.split('$');
    const newFilename = splitFilename.at(-1);
    const newPath = path.join(docFolder, newFilename);

    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error(`Erreur lors du renommage de ${filename} :`, err);
      } else {
        console.log(`Fichier ${filename} renommé en ${newFilename}`);
      }
    });
  });
});