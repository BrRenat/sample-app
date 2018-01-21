class User {
  constructor(collection) {
    this.collection = collection;
  }

  async list() {
    return await this.collection.find();
  }

  async create(args) {
    return await this.collection.insert(args);
  }

  async update(filter, query) {
    let res = await this.collection.updateOne({
      filter,
      query
    });

    return !!res.modifiedCount;
  }

  async delete(args) {
    return await this.collection.deleteOne(args);
  }

  async getByID(_id) {
    return await this.collection.findOne(ObjectId(_id));
  }

  async edit({_id, name, email}) {
    const user = await this.getByID(_id);

    if (!user) {
      return false;
    }

    const filter = {_id};

    const query = {
      $set: {
        name,
        email,
      }
    };

    return await this.update(filter, query);
  }

  async deleteByID(_id) {
    const res = await this.delete({_id: ObjectId(_id)});

    return !!res.deletedCount;
  }
}

const Users = MongoDB.collection('isina.users');
const userObj = new User(Users);

const users = async () => {
  return await userObj.list().toArray();
};

const user = async (root, {_id}) => {
  return await userObj.getByID(_id);
};

const createUser = async (root, args, context, info) => {
  const res = await userObj.create(args);

  return true;
};

const editUser = async (root, {_id, name, email}) => {
  return await userObj.edit({_id, name, email});
};

const deleteUser = async (root, {_id}) => {
  return await userObj.deleteByID(_id);
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
  users,
  user,
};
