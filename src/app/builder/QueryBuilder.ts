import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  // Constructor to initialize the queryModel and query object
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // Method to handle search functionality
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map((field) => {
          return {
            [field]: { $regex: searchTerm, $options: 'i' }, // Case-insensitive regex search
          } as FilterQuery<T>;
        }),
      });
    }

    return this;
  }

  // Method to filter the query based on remaining fields after excluding certain ones
  filter() {
    const queryObject = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];

    // Remove fields that should not be used for filtering
    excludeFields.forEach((field) => delete queryObject[field]);

    this.queryModel = this.queryModel.find(queryObject as FilterQuery<T>);

    return this;
  }

  // Method to sort the results based on the 'sort' field or default to '-createdAt'
  sort() {
    const sort = this.query?.sort || '-createdAt';

    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  // Method to paginate the results based on 'page' and 'limit' fields
  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }

  // Method to select specific fields to return in the results
  fields() {
    const fields = (this?.query?.fields as string)?.split(',')?.join(' ');

    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}

export default QueryBuilder;
