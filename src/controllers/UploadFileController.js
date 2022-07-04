export const UploadFileController = async (req, res, next) => {
    console.log('views .............', req.file)
    // 'profile_pic' is the name of our file input field in the HTML form

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // else if (req.file.size > 500000) {
        //     return res.send('file too largesss');
        // }

        // Display uploaded image for user validation
        res.json({image: `image/${req.file.filename}`})
        // res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
}