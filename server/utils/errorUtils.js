// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

'use strict';

class ErrorUtils {
  static ERROR_DAO_NOT_FOUND = {
    code: 404,
    error: {
      internalErrorCode: 404,
      message: 'Resource not found',
      description: 'The requested URI or the requested resource does not exist.'
    }
  };

  static ERROR_DAO_CONFLICT = {
    code: 422,
    error: {
      internalErrorCode: 422,
      message: 'Conflict',
      description: 'This object already exists.'
    }
  };

  static ERROR_DAO_REQUEST_FAILED = {
    code: 500,
    error: {
      internalErrorCode: 1,
      message: 'Internal error',
      description: 'An internal error occured requesting the resource.'
    }
  };

  static ERROR_DAO_MISSING_MANDATORY_PARAM = {
    code: 500,
    error: {
      internalErrorCode: 1,
      message: 'Internal error',
      description: 'An internal error occured accessing the resource.'
    }
  };

}


module.exports = ErrorUtils;