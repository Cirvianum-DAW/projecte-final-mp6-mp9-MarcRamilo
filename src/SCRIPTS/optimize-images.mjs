import imagemin from 'imagemin';
import webp from 'imagemin-webp';

(async () => {
  try {
    // Optimiza la imagen landscape.jpg
    await imagemin(['landscape.jpg'], {
      destination: 'dist/images/',
      plugins: [
        webp({ quality: 75 }) 
      ]
    });

    console.log('La imagen landscape.jpg se ha optimizado a WebP con éxito!');

    // Optimiza la imagen animals.jpg
    await imagemin(['animals.jpg'], {
      destination: 'dist/images/',
      plugins: [
        webp({ quality: 75 }) 
      ]
    });

    console.log('La imagen animals.jpg se ha optimizado a WebP con éxito!');
  } catch (error) {
    console.error('No se ha podido optimizar la imagen:', error);
  }
})();
