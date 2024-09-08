import { PaginationRequest, PaginationResponse } from '@app/models/pagination';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import * as _ from 'lodash';

export abstract class GenericRepository<T> {
  private readonly baseModel: Model<T>;

  constructor(baseModel: Model<T>) {
    this.baseModel = baseModel;
  }

  private queryBuilder(model: Object) {
    let query = {};
    if (!_.isEmpty(model)) {
      for (let key of Object.keys(model)) {
        query[key] = model[key];
      }
    }
    return query;
  }

  async findWithPagination(request: PaginationRequest, projection = null): Promise<PaginationResponse<any>> {
    const { query, offset, limit, sort } = request;
    const total = await this.baseModel.countDocuments(query).exec();
    const items = await this.baseModel.find(query, projection).skip(offset).limit(limit).sort(sort).exec();

    return new PaginationResponse({ total, items, offset, limit, sort });
  }

  async findAll(queryModel: FilterQuery<T> = {}, projection = null): Promise<T[]> {
    const query = this.queryBuilder(queryModel);
    return await this.baseModel.find(query, projection).exec();
  }

  async findOne(queryModel: FilterQuery<T> = {}, projection = null): Promise<T> {
    const query = this.queryBuilder(queryModel);
    return await this.baseModel.findOne(query, projection).exec();
  }

  //============Cmd=================
  async create(model): Promise<T> {
    return await this.baseModel.create(model);
  }

  async updateOne(filter: FilterQuery<T>, model: UpdateQuery<T>, upsert = false): Promise<T> {
    return await this.baseModel.findOneAndUpdate(filter, model, { new: true, upsert });
  }

  async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>, upsert = false): Promise<any> {
    return await this.baseModel.updateMany(filter, update, { new: true, upsert });
  }

  async deleteOne(filter: FilterQuery<T>): Promise<T> {
    return await this.baseModel.findOneAndDelete(filter);
  }
}
