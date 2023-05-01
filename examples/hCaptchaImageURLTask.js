// Import the hCaptchaAI module
const { NoCaptchaAI } = require('../dist/index.js');


const hCaptchaTask = async () => {
  // Create a new basic NoCaptchaAI client
  const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // or create a new NoCaptchaAI client with auto balance check before creating a task
  // const NoCaptchaAIClient = await NoCaptchaAI.init("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", true);
  
  // Get your current remaining balance from your NoCaptchaAI plan
  const accountBalance = await NoCaptchaAIClient.getBalance();
  // Check if you have enough funds to create a task
  if(accountBalance < 1) return console.log("You don't have enough funds to create a task.");
  const hCaptchaResult = await NoCaptchaAIClient.solveHCaptchaImages([
    'https://imgs.hcaptcha.com/Cdlb7/mZ65V7uRTBtFJ3tlUEZ73xbOQGgmES2EW0whdOzuEoWsyKPGcerXqx7BPV2ehVdUU2boCSFPzsIwpalwMtkdS1+xpwmI9zANpcD6Cy20KgrljOMQ2OiCUMNmgx+VgiykoVcQ/VhquE8Z9KMxoVvSf5EG+Uvry+Z1mRmhJiQNRBgVRtUFHoD9mYhdVyM/LvS3SnP+GT0tbpQC25E1IX/F6oMZ4vhHBgcImJfwNlYxomY/Z59/YiBvi+pf6FSdU=AyKhnpoYzjjgiV3g',
    'https://imgs.hcaptcha.com/Skxl4BTl5qlKadaHxZ9G28Fh9WsNeqBMaifkAtkvCV0MJFZ4+4VNFcUFr8FsgrVAY2pKYxTAJxswDeYGznTIbokN6LWIs9fm0WGUTsYMD+ojxbZoBr6kw3VWjWfT/CuufghPi4DJewNoY4SDAcrYVQZtmc1S1RXGintL+EBRX6Dz//yVCUxRBrsdZ9pB0xCeNWz+2jTCpo4OoMoi/GV58//NiFGNGhT/LfYfLZT80eS/smGsBjcWjCFZQrX0IoTIGyM=Clbo05L0FAN2gLbC',
    'https://imgs.hcaptcha.com/lU9V22rdvXsJcFaU+G59WzqWZF1Nh0utLwzjkwgTevf7P0XenZmA0dJG7/i9+59rc+PZPs1QAVb23/JKWESNFc/+0SZJTN/5/0KKEY/eP8mJ3W6ZQy0AyxrcSijz1VT+TLsH0IKy9zB77ZI5TRnuqCwpWpINUTbQINdx93VMeqKNCW8dU41SkZWhJM3DusAiO0pQUdz9qs5RGeXcR7zSRjnA5FcUHgA+dd3rzFai2XDeKZ1ZvTpqRWUMN7/oj+/ObvQ=+3N+pA/Hjfd1yRsi',
    'https://imgs.hcaptcha.com/ladJd4VUnH7fb8A3AwxoAk7njFjNT6Xnybd/xlpEg/pjhDCRqKAeJbRSO5oFbVqKAc0v9N2fhDulZgMbjOO+hJbazRU2jzEwmtQ8TjFLuuZju5nWS+KgfmEkDKfS2EhzIU9aUr6xSVSrjslScBKek+rUxjFI9afy53BmFlOHeReJpPAM44Bb4MFYZPxagBuS6gIF/XIcKCq0s/yGZeIjcyhxJRBJUE9qoRc/k7MU7bLXo8qtoNd7Ng==jzyjRF0/HQJeErA6',
    'https://imgs.hcaptcha.com/kzsZv7X6JOE0B9Syq9W3JMzK5omU2nOthr/rjKqGTXHrXDRKNmiw6wStYJVV9jkLxIaHrgp8ht7hChouLxCPyieJlrxRZjQD8xIBZhdZfHbtjAOL63SrhdEkfB7F5Q/RRXZUsEE72kUrGHV1FYHEhZ/BC0GyINrYOwnAO5+5NFx3xos3fR5XU4Ei9DDP63bho+lVjxAIgAuOwRJjhAQwCTkBWYJKJ/A4GPyimZiAYPS2X7DsxeJrQ+PV/hEj+LOl+1U=U8pRPoiEaf74DZ1U',
    'https://imgs.hcaptcha.com/xhbLfYpBX0iDuhpLuowyNSZ/Ilhkw4z0m0vH06ggT4DUbDhEcY6cfT0b5NsrUbZkmstA+gzXv0P99y+olsMX4VAs4HOppCMrGmH+kgMwBWgydsDhAqMdx6/k6g+RZGWCfLWvA8nFzPtPFWZUMZzekvc78dU8O6ZcXacUnvrgObXc5iHbXo8E84e29TXyYj2ATFWxX5WUzCrw5Elkz1PXhFA5nhB761Z9WH1ERF0di4TGn6UPcwxJ5ne/XRgKj0szLBk=FQIzQXqscX5kadFu',
    'https://imgs.hcaptcha.com/a/lZEuLo70DlDAJHdLSrZI9Bf80uA6KynCnG967YrmsVqlcff0EjfAS4ImGJqrOYdaUt+wrV0WXDWHepAcJ44niApm2byHK/JYwXn4sBm2qw3bckwGKk3mf8NrcfuJ5Xrn8Po/0hY7KCkLX05G82hgWzhc4k2dZMKDzZI/nuxECxH6A/ryjXBgw/KobltJwn8dpw5r+2vmnIFRDMbQ9O5A0fvicGgy0RJmoLKAs3ueZjC2K60ITXOg==WQEh0oB6xbGzZOOR',
    'https://imgs.hcaptcha.com/em7KXkMPa2RHpjdUVdHtz22b0irP20xegQwqX09YMWFlDJufXyj64tImbXI4kbFW8udDTH3C19UmP/8SzWGvwSoQ98Q74UzfA/FjxQwqvwRH+vQON0ZxX0uraqCCcqG4EH1wHZR7ACRvf54K/NTJuRFpX5RZWPh+KHIo1YXKnps6jdEXT3HcPiOMky4XhzXxdRmUWx9P6YDrp6rQTc+ShyZSen2tjHnvILgfw5hTEM+CDD2D4dVi7OyDKzwRdZb9150=MMQE+fcjVG6nFMNP',
    'https://imgs.hcaptcha.com/QpfIKlaPQmS07rlAjrq/7bFuCdlJPfjqJbN97g5Gq/bqut1PdXLOoWgEZUOIY4TrZvT3DXDTwgvqfxuX/Aw/x7qJ4DYoZKZfVbDf+Dozw/tse1PRj+yuoi+5mSaTdek6g+5QRKtgOAOQxPYRJ/Tk7uLvz9YXOKq3Ym3tDqmkKXZV7qmkFRE/aqMjZ+TRNlzliihHphv3tTAv+qT7YWpDRa5ix+i5OTanh/E27T+1H9dxokmZNjGtYQ==kqF9HSPGtNEEAIKA'
  ], "grid", "Please click each image containing a bee flying near a flower", "en")
  console.log(hCaptchaResult);
}
hCaptchaTask();