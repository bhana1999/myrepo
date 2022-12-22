if (files.length == 0)
  return res
    .status(400)
    .send({ status: false, message: "Please provide product image file!!" });

if (!v.isValidImg(files[0].mimetype))
  return res.status(400).send({
    status: false,
    message: "Please provide valid product image file!!",
  });
let uploadImage = await uploadFile(files[0]);



if (!v.isValidImg(files[0].mimetype))
  return res
    .status(400)
    .send({
      status: false,
      message: "Please provide valid product image file!!",
    });
