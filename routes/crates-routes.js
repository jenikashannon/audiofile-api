const express = require("express");
const multer = require("multer");

const pathToPublic = "./public/images/";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, pathToPublic);
	},

	filename: function (req, file, cb) {
		const fileName = req.params.crate_id;
		const fileExt = file.mimetype.split("/")[1];

		cb(null, `${fileName}.${fileExt}`);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router.route("/").get(cratesController.findAll).post(cratesController.create);

router
	.route("/:crate_id")
	.get(cratesController.findOne)
	.delete(cratesController.remove)
	.post(cratesController.addAlbum)
	.patch(cratesController.update)
	.put(cratesController.togglePinned);

router
	.route("/:crate_id/photo")
	.post(upload.single("photo"), cratesController.addPhoto)
	.delete(cratesController.removePhoto);

router.route("/:crate_id/:album_id").delete(cratesController.removeAlbum);

module.exports = router;
