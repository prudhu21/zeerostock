const db = require("../db/connection");
const Joi = require("joi");

exports.createInventory = (req, res) => {
  const schema = Joi.object({
    supplier_id: Joi.number().required(),
    product_name: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().greater(0).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { supplier_id, product_name, quantity, price } = req.body;

  db.get(
    "SELECT * FROM suppliers WHERE id = ?",
    [supplier_id],
    (err, supplier) => {
      if (!supplier) {
        return res.status(400).json({ message: "Invalid supplier_id" });
      }

      db.run(
        "INSERT INTO inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)",
        [supplier_id, product_name, quantity, price],
        function (err) {
          if (err) return res.status(500).json(err);
          res.json({ id: this.lastID });
        }
      );
    }
  );
};

exports.getInventory = (req, res) => {
  db.all("SELECT * FROM inventory", [], (err, rows) => {
    res.json(rows);
  });
};


exports.getGroupedInventory = (req, res) => {
  db.all(`
    SELECT s.name,
    SUM(i.quantity * i.price) AS total_value
    FROM suppliers s
    JOIN inventory i ON s.id = i.supplier_id
    GROUP BY s.id
    ORDER BY total_value DESC
  `, [], (err, rows) => {
    res.json(rows);
  });
};