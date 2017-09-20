'use strict';

class ResponseBuilder {

  /**
   * Send a success on response
   * @param {object} res - Response
   * @param {array} data - Response body
   */
  static success(res, data){
    return res.send(200, data);
  }

  /**
   * Send a error on response
   * @param {object} res - Response
   * @param {object} error - error object
   */
  static error(res, error){
    if (error.code == undefined) {
      error.code = 500;
    }
    
    // TODO: implement log handler
    return res.send(error.code, {
      code:error.code,
      message: error.message
    })
  }
}

module.exports = ResponseBuilder;
