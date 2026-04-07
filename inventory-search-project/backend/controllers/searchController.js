const inventory = require('../data/inventory');
const Joi = require('joi');

exports.searchItems = (req, res) => {
  let { q, category, minPrice, maxPrice, page = 1, limit = 5 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const schema = Joi.object({
    q: Joi.string().allow(""),
    category: Joi.string().allow(""),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    page: Joi.number().min(1),
    limit: Joi.number().min(1)
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let results = [...inventory];

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  if (q) {
    results = results.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    results = results.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    results = results.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }

  //  Pagination
  const start = (page - 1) * limit;
  const paginatedResults = results.slice(start, start + limit);

  res.json({
    total: results.length,
    page,
    limit,
    data: paginatedResults
  });
};