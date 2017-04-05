// @flow

export default function insertOne(
  document: Object
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const candidate = new this(document);
      resolve(await candidate.save());
    } catch (error) {
      reject(error);
    }
  });
}
