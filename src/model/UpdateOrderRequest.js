export default class UpdateOrderRequest {

    constructor(productName, category, price, weight, plannedDateOfShipment, clientFio, phoneNumber, address, employerUuid) {
      this.productName = productName;
      this.category = category;
      this.price = price;
      this.weight = weight;
      this.plannedDateOfShipment = plannedDateOfShipment;
      this.clientFio = clientFio,
      this.phoneNumber = phoneNumber,
      this.address = address,
      this.employerUuid = employerUuid;
    }
  }