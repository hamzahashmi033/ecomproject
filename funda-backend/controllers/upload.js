const { delete: deleteFile } = require("../config/upload");

exports.uploadSingle = (req, res) => {
  res.status(200).json(req.file);
};

exports.uploadMultiple = (req, res) => {
  res.status(200).json(req.files);
};

exports.delete = (req, res) => {
  const url = req.body.url;
  const resp = deleteFile(url);
  res.status(200).json({ message: resp });
};
