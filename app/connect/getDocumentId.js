import getId from './getId';

const getDocumentId = (doc, connection) => {
  const id = getId(connection);
  return doc[id.name];
};

export default getDocumentId;
