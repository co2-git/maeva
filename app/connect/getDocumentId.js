import getIdName from './getIdName';

const getDocumentId = (doc, connection) => doc[getIdName(connection)];

export default getDocumentId;
