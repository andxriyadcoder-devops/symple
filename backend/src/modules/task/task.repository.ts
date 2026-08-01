import { Task } from "./task.model";
import { ITaskDocument } from "./task.types";

export class TaskRepository {
  async create(data: Partial<ITaskDocument>) {
    return Task.create(data);
  }

  async findAll() {
    return Task.find().sort({
      createdAt: -1,
    });
  }

  async findActive() {
    return Task.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });
  }

  async findById(id: string) {
    return Task.findById(id);
  }

  async update(
    id: string,
    data: Partial<ITaskDocument>
  ) {
    return Task.findByIdAndUpdate(
      id,
      data,
      {
        returnDocument: "after",
      }
    );
  }

  async delete(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository();