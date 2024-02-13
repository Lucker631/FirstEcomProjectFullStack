const Categories = require("../schemas/categories");
const Users = require("../schemas/users");

const category_add = async (req, res) => {
  const { category } = req.body;
  try {
    const found = await Categories.findOne({ category: category });
    if (found) {
      res.send({
        ok: true,
        data: `Category ${category} already exists`,
      });
    } else {
      await Categories.create({
        category: category,
      });
      res.send({ ok: true, data: `Category ${category} added sucessfully` });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

const category_delete = async (req, res) => {
  const { category } = req.body;
  try {
    const found = await Categories.findOne({ category: category });
    if (found) {
      await Categories.deleteOne({
        category: category,
      });
      res.send({ ok: true, data: `Category ${category} deleted sucessfully` });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
const category_update = async (req, res) => {
  const { old_category, new_category } = req.body;
  try {
    const found = await Categories.findOne({ category: old_category });
    if (found) {
      await Categories.updateOne(
        {
          category: old_category,
        },
        { category: new_category }
      );
      res.send({
        ok: true,
        data: `Category ${old_category} updated sucessfully`,
      });
    }
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
const allCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.send({
      ok: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  category_add,
  allCategories,
  category_delete,
  category_update,
};
