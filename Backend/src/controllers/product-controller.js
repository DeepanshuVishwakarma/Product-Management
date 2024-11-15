const User = require("../models/User");
const {
  isEmailValid,
  isValidPassword,
  isValidName,
} = require("../utils/validators");
// const { UserServices } = require("../service/index");
const AppError = require("../error/AppError");
const ProductRepository = require("../repository/product-repo");

const productRepository = new ProductRepository();
const status = require("../utils/status");

const isProductValid = (product) => {
  const { name, inStock, category, price } = product;

  if (!name || !inStock || !category || !price) {
    console.log("product", product);
    return false;
  }

  if (
    typeof name !== "string" ||
    typeof inStock !== "boolean" ||
    typeof category !== "string" ||
    typeof price !== "number"
  ) {
    console.log("product", product);
    return false;
  }
  if (price <= 0) return false;
  return true;
};
const createProduct = async (req, res) => {
  try {
    console.log("inside createProduct", req.body);
    const product = req.body.product;

    if (!isProductValid(product)) {
      throw new AppError("Invalid product data", status?.badRequest);
    }

    const createdProduct = await productRepository.create(product);
    console.log(createdProduct);
    res.status(status.success).json({
      message: "Product created successfully",
      data: createdProduct,
      success: true,
    });
  } catch (error) {
    res.status(error?.status || status?.internalServerError).json({
      message: error?.message,
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("deleteProduct");
    const id = req?.params?.id;
    if (!id) {
      throw new AppError("Product id is required", status.badRequest);
    }

    const response = await productRepository.deleteById(id);
    return res.status(status.success).json({
      success: true,
      message: "product deleted successfully",
      data: response,
    });
  } catch (e) {
    res.status(error?.status || status?.internalServerError || 500).json({
      message: error?.message,
      success: false,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const id = req?.params?.id;
    console.log(id);
    if (!id) {
      throw new AppError("Id is required", status.badRequest);
    }

    const product = await productRepository.getById(id);
    if (!product) {
      throw new AppError("Product not found", status.itemNotFound);
    }
    const { name, price, category, inStock } = req.body.product || {};
    console.log(req.body);
    if (!name && !price && !category && typeof inStock !== "boolean") {
      throw new AppError(
        "At least one field (name, price, category, or inStock) is required for update.",
        status.badRequest
      );
    }

    const updateFields = {};
    if (name) {
      if (typeof name !== "string") {
        throw new AppError(
          "Invalid name. Name must be a string",
          status.badRequest
        );
      }
      updateFields.name = name;
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        throw new AppError(
          "Invalid price. Price must be a positive number.",
          status.badRequest
        );
      }
      updateFields.price = price;
    }

    if (category) {
      if (typeof category !== "string") {
        throw new AppError(
          "Invalid category. Category must be a string.",
          status.badRequest
        );
      }
      updateFields.category = category;
    }

    if (inStock !== undefined) {
      if (typeof inStock !== "boolean") {
        throw new AppError(
          "Invalid inStock value. inStock must be a boolean",
          status.badRequest
        );
      }
      updateFields.inStock = inStock;
    }

    const updatedProduct = await productRepository.update(id, updateFields);

    return res.status(status.success).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(error?.status || status.internalServerError || 500).json({
      message: error?.message || "An internal server error occurred.",
      success: false,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await productRepository.getAll();

    res.status(status.success).json({
      message: "products fetched successfully",
      data: allProducts,
      success: true,
    });
  } catch (e) {
    res.status(error?.status || status?.internalServerError).json({
      message: error?.message,
      success: false,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (!id) {
      throw new AppError("Product id is required", status.badRequest);
    }
    const response = await productRepository.getById(id);

    res.status(status.success).json({
      message: "product fetched successfully by Id",
      data: response,
      success: true,
    });
  } catch (e) {
    res.status(error?.status || status?.internalServerError).json({
      message: error?.message,
      success: false,
    });
  }
};

module.exports = {
  updateProduct,
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
};
