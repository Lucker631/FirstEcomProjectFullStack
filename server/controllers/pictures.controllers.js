const Pictures = require("../schemas/pictures.models");
const cloudinary = require("cloudinary");
// remember to add your credentials to .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = async (req, res) => {
  const { files } = req.body;
  let pictures = files.map((pic) => {
    return {
      public_id: pic.uploadInfo.public_id,
      photo_url: pic.uploadInfo.secure_url,
    };
  });

  try {
    const created = await Pictures.create(pictures);
    console.log(created);
    res.json({ ok: true, created });
  } catch (error) {
    res.json({ ok: false });
  }
};

const get_all = async (req, res) => {
  try {
    const pictures = await Pictures.find({});
    res.json({ ok: true, pictures });
  } catch (error) {
    res.json({ ok: false });
  }
};

const remove = async (req, res) => {
  const { _id } = req.params;
  try {
    const deleted = await Pictures.findByIdAndRemove({ _id: _id });
    if (deleted.public_id) {
      await cloudinary.v2.api.delete_resources([deleted.public_id]);
      res.json({ ok: true, deleted });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    res.json({ ok: false });
  }
};

module.exports = {
  upload,
  get_all,
  remove,
};
