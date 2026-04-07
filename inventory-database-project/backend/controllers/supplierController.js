const db = require("../db/connection");
const Joi = require("joi");

exports.createSupplier = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, city } = req.body;

  db.run(
    "INSERT INTO suppliers (name, city) VALUES (?, ?)",
    [name, city],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, name, city });
    }
  );
};