import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  render() {
    return (
      <section class="fabelio-detailproducts">
        <div class="fabelio-detailprod-header">
          <div class="container">
            <h3>Sofa L Arsa Wooden Leg</h3>
          </div>
        </div>
        <div class="fabelio-detailprod-body">
          <div class="container">
            <div class="product-details-box">
              <div class="prod-details-name">
                <p class="prod-details-name-title">Product Name</p>
                <p class="prod-details-name-product">Sofa L Arsa Wooden Leg</p>
              </div>
              <div class="prod-details-desc">
                <p class="prod-details-desc-title">Product Description</p>
                <p class="prod-details-desc-product">Arsa 'L' Sofa dengan kaki kayu adalah gabungan dari sofa 2 seater dan 1 sofa memanjang yang cocok ditaruh ditengah maupun dipojok ruangan anda. Keseluruhan sofa didominasi oleh bantalan dengan busa khusus indoor dengan aksen kaki kayu. Cushion isi dacron yang ditambahkan pada sandaran punggung sofa menambah kenyamanan. Jangan heran bila Anda mudah terlelap di atas sofa ini.</p>
              </div>
              <div class="prod-details-fstyle">
                <p class="prod-details-fstyle-title">Furniture Style</p>
                <p class="prod-details-fstyle-product">Modern, Scandinavian</p>
              </div>
              <div class="prod-details-deliverytime">
                <p class="prod-details-deliverytime-title">Delivery Time</p>
                <p class="prod-details-deliverytime-product">2 day(s)</p>
              </div>
              <div class="prod-details-price">
                <p class="prod-details-price-title">Price</p>
                <p class="prod-details-price-product">Rp. 7.499.000</p>
              </div>
            </div>
            <Link to="/">
              <button type="button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Back to Home</button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default ProductDetail;
