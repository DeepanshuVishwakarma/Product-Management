const AppError = require("../error/AppError");
const { StatusCodes } = require("../utils/status");

class Crud {
  constructor(model) {
    console.log("model", model);
    this.model = model;
  }

  async create(data) {
    console.log("Creating method called");
    const response = await this.model.create(data);
    console.log(response);
    return response;
  }

  async deleteById(id, key = "id") {
    const query = {};
    query[key] = id;

    const response = await this.model.deleteOne(query);

    if (response.deletedCount === 0) {
      throw new AppError("Resource not found");
    }
    return response;
  }

  async deleteAll() {
    const response = await this.model.deleteMany({});
    return response;
  }

  async getById(id, key = "id") {
    const query = {};
    query[key] = id;
    const response = await this.model.findOne(query);
    if (!response) {
      throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    console.log("inside crudrepo");
    const response = await this.model.find({});
    return response;
  }

  async update(id, data) {
    const response = await this.model.findOneAndUpdate({ id: id }, data, {
      new: true,
    });

    if (!response) {
      throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
    }

    return response;
  }
}

module.exports = Crud;
