const validateProductFields = (req, res, next) => {
    const { name, description, category, url, tags } = req.body;
    
    if (!name || !description  || !category || !url || !tags) {
      return res.status(400).json({ message: "All fields should be mandatory." });
    }
  
    next();
  };
  
  module.exports = validateProductFields;