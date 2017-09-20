'use strict';

class PricingRulesRepository {

  constructor(request){
    this.request = request;
  }

  /**
   * Get customer pricing rules
   * @param {string} customerId - Customer ID.
   * @returns {array} - Pricing Rules
   * @throws Error - if request goes wrong
   */
  async getByCustomerId(customerId) {
    if (customerId === '') {
      customerId = 'default';
    }

    let response = this.request.response;
    try {
      response = await this.request(`${process.env.PRICING_URI}pricing/rules?customerId=${customerId}`);
    } catch (error) {
      throw new Error(error);
    }

    return JSON.parse(response.body);
  }
}

module.exports = PricingRulesRepository;
