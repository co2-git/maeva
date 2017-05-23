// @flow
import Connection from './app/defs/DataConnection';
import Connector from './app/defs/DataConnector';
import ConnectorResponse from './app/defs/DataConnectorResponse';
import Document from './app/defs/DataDocument';
import Model from './app/defs/DataModel';
import Type from './app/defs/DataType';

import type {DataConvert} from './app/types/convert';
import type {DataDefault} from './app/model/applyDefaults';
import type {DataTypeCandidate} from './app/types/getType';
import type {DataValidate} from './app/types/validate';
import type {DataValidator} from './app/model/applyValidators';

declare type DataConnection = Connection;
declare type DataConnector = Connector;
declare type DataConnectorResponse = ConnectorResponse;
declare type DataDocument = Document;
declare type DataModel = Model;
declare type DataType = Type;
