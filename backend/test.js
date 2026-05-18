const fs = require("fs");

const firebaseService =
  require("./services/firebaseService");

const testUpload = async () => {

  try {

    const fileBuffer = fs.readFileSync(
      "./hero.png"
    );

    const fakeFile = {
      originalname: "hero.png",
      buffer: fileBuffer,
    };

    const result =
      await firebaseService.uploadPaymentProof(
        fakeFile,
        1,
        1
      );

    console.log(result);

  } catch (error) {

    console.log(error);

  }

};

testUpload();