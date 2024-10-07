const { OcrProviderV1 } = require('./src/ocrProvider.js');
const path = require('path');

(async () => {
    try {
        const ocr = new OcrProviderV1();
        const images = [
            './images/input/image-1.png',
            './images/input/image-2.png',
            './images/input/image-3.png',
            './images/input/image-4.png',
            './images/input/image-5.png',
            './images/input/image-6.png',
            './images/input/image-7.png',
            './images/input/image-8.png',
        ];
        for (const image of images) {
            const outputDir = './images/output';
            const result = await ocr.recognize(image);
            if (result) {

                const { name, ext } = path.parse(image);
                const newImagePath = path.join(outputDir, `${name}_corrected${ext}`);
        
                await result.write(newImagePath);
                console.log(`Imagem corrigida salva em: ${newImagePath}`);
              } else {
                console.log(`Não foi possível processar a imagem: ${image}`);
            }
        }
    } catch (e) {
        console.error(e);
    }
})();