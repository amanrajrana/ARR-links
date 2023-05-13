const qrcode = require('qrcode');

const generateQR = (data) => {
    const date = new Date()
    const qrImageName = `static/generated-qr-images/${date.getTime()}.png`;
    

    qrcode.toFile(qrImageName, data, (error) => {
        if(error) return error;
    })
    return qrImageName;
}


const handelGenerateQrCode = async (req, res) => {

    const body = req.body;
    if(!body.url) {
        res.status(401).send({ 
            success: false, 
            message: 'body can not be empty',
        })
    }
    

    // call generateQR function to generate QR code
    const qrCodeUrl = await generateQR(body.url)

    res.status(200).send( {
        message: 'QR code generated',
        url: body.url,
        imageUrl: qrCodeUrl
    })
   
}

module.exports = {
   handelGenerateQrCode
}
