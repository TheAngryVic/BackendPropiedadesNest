 

 export const fileFilter = (req: Express.Request, file:Express.Multer.File, cb: Function)=>{

    if (!file) return cb(new Error('No ha subido imagen'), false)
    const fileExtension = file.mimetype.split('/')[1]
    console.log(file);
    
    const validExtensions = ['jpg', 'png', 'jpeg']

    if (!validExtensions.includes(fileExtension)) {
        return cb(new Error('Archivo no permitido'), false)
    }
    cb(null, true)


 }