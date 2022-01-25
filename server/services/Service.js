class Service {
  static rejectResponse(error, code = 500) {
    let returnedResponse = { error: 'Invalid input', code: 405 };
    if (error !== undefined) {
      if ((error.error !== undefined) && (error.code !== undefined)) {
        // Define returnedResponse from error object
        returnedResponse = { error: error.error, code: error.code };
      } else if (error.message !== undefined) {
        // Define returnedResponse from error message and code parameter
        returnedResponse = { error: error.message, code };
      }
    }
    return returnedResponse;  }

  static successResponse(payload, code = 200) {
    return { payload, code };
  }
}

module.exports = Service;
