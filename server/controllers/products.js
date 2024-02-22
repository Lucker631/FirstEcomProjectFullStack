const Categories = require("../schemas/categories");
const Products = require("../schemas/products");
// const Users = require("../schemas/users");
// const Description = require("../schemas/description");

// const Pictures = require("../schemas/pictures.models");
const cloudinary = require("cloudinary");
// remember to add your credentials to .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const upload = async (req, res) => {
//   const { files } = req.body;
//   let pictures = files.map((pic) => {
//     return {
//       public_id: pic.uploadInfo.public_id,
//       photo_url: pic.uploadInfo.secure_url,
//     };
//   });

//   try {
//     const created = await Pictures.create(pictures);
//     console.log(created);
//     res.json({ ok: true, created });
//   } catch (error) {
//     res.json({ ok: false });
//   }
// };

const product_add = async (req, res) => {
  const { category, name, price, color, description, image } = req.body;
  try {
    const foundCat = await Categories.findOne({
      category: category,
    });
    if (foundCat) {
      const foundProduct = await Products.findOne({
        name: name,
      });
      if (foundProduct) {
        res.send(`Product ${name} already exists`);
      } else {
        await Products.create({
          name: name,
          price: price,
          color: color,
          description: description,
          category_id: foundCat._id,
          image: image,
        });
        res.send(`I added your beautiful product ${name}`);
      }
    } else {
      res.send(`Category ${category} doesn't exist`);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const product_delete = async (req, res) => {
  const { category, name } = req.body;
  try {
    const foundCat = await Categories.findOne({
      category: category,
    });
    if (foundCat) {
      const foundProduct = await Products.findOne({
        name: name,
      });
      if (foundProduct) {
        await Products.deleteOne({
          name: name,
        });
        res.send(`I deleted your beautiful product ${name}`);
      } else {
        res.send(`No such product exists`);
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const product_update = async (req, res) => {
  const { category, old_name, new_name } = req.body;
  try {
    const foundCat = await Categories.findOne({
      category: category,
    });
    if (foundCat) {
      const found = await Products.findOne({ name: old_name });
      if (found) {
        await Products.updateOne(
          {
            name: old_name,
          },
          { name: new_name }
        );
        res.send({
          ok: true,
          data: `Product name ${old_name} updated sucessfully`,
        });
      }
    }
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
const product_show = async (req, res) => {
  try {
    const { category } = req.body;
    try {
      const foundCat = await Categories.findOne({
        category: category,
      });
      if (foundCat) {
        const foundProduct = await Products.find({});
        res.send({
          ok: true,
          data: foundProduct,
        });
      } else {
        res.status(404).send({ ok: false, message: "Category not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ ok: false, message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ ok: false, message: "Bad request" });
  }
};
module.exports = {
  product_add,
  product_delete,
  product_show,
  product_update,
};
