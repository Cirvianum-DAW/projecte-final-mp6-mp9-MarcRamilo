const sharp = require('sharp');
const fs = require('fs');


const imagesToOptimize = [
    {
      input: './src/images/animals.jpg',
      output: './src/images/animals.webp',
    },
    {
      input: './src/images/basel.jpg',
      output: './src/images/basel.webp',
    },
    {
      input: './src/images/bisonte.jpg',
      output: './src/images/bisonte.webp',
    },
    {
      input: './src/images/caballs_desextingits.jpg',
      output: './src/images/converted/caballs_desextingits.webp',
    },
    {
      input: './src/images/camera-settings.jpg',
      output: './src/images/camera-settings.webp',
    },
    {
      input: './src/images/cazorla.jpeg',
      output: './src/images/cazorla.webp',
    },
    {
      input: './src/images/cities.jpg',
      output: './src/images/cities.webp',
    },
    {
      input: './src/images/flor1.jpg',
      output: './src/images/flor1.webp',
    },
    {
      input: './src/images/flor10.jpg',
      output: './src/images/flor10.webp',
    },
    {
      input: './src/images/flor11.jpg',
      output: './src/images/flor11.webp',
    },
    {
      input: './src/images/flor2.jpg',
      output: './src/images/flor2.webp',
    },
    {
      input: './src/images/flor3.jpg',
      output: './src/images/flor3.webp',
    },
    {
      input: './src/images/flor4.jpg',
      output: './src/images/flor4.webp',
    },
    {
      input: './src/images/flor5.jpg',
      output: './src/images/flor5.webp',
    },
    {
      input: './src/images/flor6.jpg',
      output: './src/images/flor6.webp',
    },
    {
      input: './src/images/flor7.jpg',
      output: './src/images/flor7.webp',
    },
    {
      input: './src/images/flor8.jpg',
      output: './src/images/flor8.webp',
    },
    {
      input: './src/images/flor_vall_nuria.jpg',
      output: './src/images/flor_vall_nuria.webp',
    },
    {
      input: './src/images/flowers.jpg',
      output: './src/images/flowers.webp',
    },
    {
      input: './src/images/girona.jpg',
      output: './src/images/girona.webp',
    },
    {
      input: './src/images/home.jpg',
      output: './src/images/home.webp',
    },
    {
      input: './src/images/landscape.jpg',
      output: './src/images/landscape.webp',
    },
    {
      input: './src/images/lente.png',
      output: './src/images/lente.webp',
    },
    {
      input: './src/images/light-and-shadows.jpg',
      output: './src/images/light-and-shadows.webp',
    },
    {
      input: './src/images/logo.png',
      output: './src/images/logo.webp',
    },
    {
      input: './src/images/logo_bg_white.png',
      output: './src/images/logo_bg_white.webp',
    },
    {
      input: './src/images/malta.jpg',
      output: './src/images/malta.webp',
    },
    {
      input: './src/images/ocell.jpg',
      output: './src/images/ocell.webp',
    },
    {
      input: './src/images/ocell_volant.jpg',
      output: './src/images/ocell_volant.webp',
    },
    // {
    //   input: './src/images/photo marc_LOGO_TRANS.png',
    //   output: './src/images/photo marc_LOGO_TRANS.webp',
    // },
    {
      input: './src/images/profile.jpg',
      output: './src/images/profile.webp',
    },
    {
      input: './src/images/scultures.jpg',
      output: './src/images/scultures.webp',
    },
    {
      input: './src/images/steet_art1.jpg',
      output: './src/images/steet_art1.webp',
    },
    {
      input: './src/images/steet_art2.jpg',
      output: './src/images/steet_art2.webp',
    },
    {
      input: './src/images/steet_art3.jpg',
      output: './src/images/steet_art3.webp',
    },
    {
      input: './src/images/steet_art4.jpg',
      output: './src/images/steet_art4.webp',
    },
    {
      input: './src/images/valencia.jpg',
      output: './src/images/valencia.webp',
    },
    {
      input: './src/images/valencia_2.jpg',
      output: './src/images/valencia_2.webp',
    },
  ];

const optimizeImage = ({ input, output }) => {
    sharp(input)
      .resize({ width: 800 }) 
      .webp({ quality: 60 }) 
      .toBuffer()
      .then(data => {
          fs.writeFileSync(output, data);
          console.log(`Imagen optimizada y guardada correctamente: ${output}`);
          console.log(`Tamaño del archivo optimizado: ${data.length} bytes`);
      })
      .catch(err => {
          console.error(`Error al optimizar la imagen ${input}:`, err);
      });
};

imagesToOptimize.forEach(optimizeImage);
