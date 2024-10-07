const { Jimp } = require('jimp');
const Tesseract = require('tesseract.js');

class OcrProviderV1 {
  async recognize(imagePath) {
    let documentImage = await Jimp.read(imagePath);

    const maxAttempts = 3;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const rotationAngle = await this.detectOrientation(imagePath);

      if (rotationAngle && rotationAngle !== 0) {
        console.log(`A imagem está rotacionada em ${rotationAngle} graus. Corrigindo...`);
        documentImage = await this.rotateImage(documentImage, -rotationAngle);
      } else {
        console.log('A imagem já está na orientação correta ou não foi possível detectar a rotação.');
        break;
      }

      attempts++;
    }

    return documentImage;
  }

  async detectOrientation(imagePath) {
    const { data } = await Tesseract.recognize(imagePath, 'por', { tessedit_pageseg_mode: Tesseract.PSM.OSD_ONLY});
    return data.osd
  }

  async rotateImage(image, rotationAngle) {
    try {
      const rotatedImage = await image.rotate(rotationAngle);
      return rotatedImage;
    } catch (e) {
      console.error(`Erro ao rotacionar a imagem: ${e}`);
      return null;
    }
  }
}

module.exports = { OcrProviderV1 };