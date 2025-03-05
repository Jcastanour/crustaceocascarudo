const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../fronted/images"));
  },
  filename: (req, file, cb) => {
    const productName = req.body.name
      ? req.body.name.replace(/\s+/g, "_")
      : "producto"; //Organizar sin espacio
    // Obtiene la extensión del archivo original
    const extension = path.extname(file.originalname);
    const filename = productName + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
