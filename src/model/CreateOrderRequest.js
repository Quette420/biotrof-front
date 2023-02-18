export default class CreateOrderRequest {

    constructor(productName, category, price, weight, plannedDateOfShipment, wishes, employerUuid) {
      this.productName = productName;
      this.category = category;
      this.price = price;
      this.weight = weight;
      this.plannedDateOfShipment = plannedDateOfShipment;
      this.wishes = wishes;
      this.employerUuid = employerUuid;
    }
  }