export default class CreateProductRequest {

    constructor(categoryName, productName, price) {
        this.categoryName = categoryName
        this.productName = productName;
        this.price = price;
    }
  }