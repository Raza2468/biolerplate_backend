const getAllProduct = async (req, res) => {
  res.status(200).json({ message: "I am get all product" });
};

const getAllProducttesting = async (req, res) => {
  res.status(200).json({ message: "I am get all getAllProducttesting" });
};

module.exports = { getAllProduct, getAllProducttesting };
