let id = 0;

export default {
  connector: {
    actions: {
      insertOne: doc => new Promise((resolve, reject) => {
        try {
          resolve({...doc, id: id++});
        } catch (error) {
          reject(error);
        }
      }),
    },
    id: {
      name: 'id',
      type: Number,
    },
  }
};
