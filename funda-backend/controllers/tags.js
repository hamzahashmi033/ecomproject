const Tags = require("../models/Tags");
// @Method: POST
// @Route : api/tag/createTag
// @Desc  : Handling the creation of tag
exports.createTag = async (req, res) => {
  try {
    const { tagName } = req.body;
    if (!tagName) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter Tag name." });
    }
    let Tag = await Tags.findOne({ tagName });
    if (Tag) {
      return res
        .status(400)
        .json({ success: false, message: "Tag already exists" });
    }
    Tag = await Tags.create({ tagName });
    res.status(200).json({ success: true, data: Tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/tag/
// @Desc  : Get all tags
exports.getTag = async (req, res) => {
  try {
    const Tag = await Tags.find();
    res.status(200).json({ success: true, data: Tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: DELETE
// @Route : api/tag/:id
// @Desc  : Delete tag by id
exports.removeTag = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const removedTag = await Tags.remove({ _id: id });
    res.status(200).json({ success: true, message: "Tag Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: PATCH
// @Route : api/tag/:id
// @Desc  : Handling the updation of tag
exports.updateTag = async (req, res) => {
  let id = req.params.id;
  const { tagName } = req.body;
  if (!id || !tagName) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    // if (!tagName) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Please enter tag name." });
    // }

    const updatedTag = await Tags.updateOne(
      { _id: id },
      { $set: { tagName: tagName } }
    );
    res.status(200).json({ success: true, message: "Tag updated Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
