import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  render() {
    return (
      <section className="fabelio-detailproducts">
        <div className="fabelio-detailprod-header">
          <div className="container">
            <h3>Sofa L Arsa Wooden Leg</h3>
          </div>
        </div>
        <div className="fabelio-detailprod-body">
          <div className="container">
            <div className="product-details-box">
              <div className="prod-details-name">
                <p className="prod-details-name-title">Product Name</p>
                <p className="prod-details-name-product">Sofa L Arsa Wooden Leg</p>
              </div>
              <div className="prod-details-desc">
                <p className="prod-details-desc-title">Product Description</p>
                <p className="prod-details-desc-product">Arsa 'L' Sofa dengan kaki kayu adalah gabungan dari sofa 2 seater dan 1 sofa memanjang yang cocok ditaruh ditengah maupun dipojok ruangan anda. Keseluruhan sofa didominasi oleh bantalan dengan busa khusus indoor dengan aksen kaki kayu. Cushion isi dacron yang ditambahkan pada sandaran punggung sofa menambah kenyamanan. Jangan heran bila Anda mudah terlelap di atas sofa ini.</p>
              </div>
              <div className="prod-details-fstyle">
                <p className="prod-details-fstyle-title">Furniture Style</p>
                <p className="prod-details-fstyle-product">Modern, Scandinavian</p>
              </div>
              <div className="prod-details-deliverytime">
                <p className="prod-details-deliverytime-title">Delivery Time</p>
                <p className="prod-details-deliverytime-product">2 day(s)</p>
              </div>
              <div className="prod-details-price">
                <p className="prod-details-price-title">Price</p>
                <p className="prod-details-price-product">Rp. 7.499.000</p>
              </div>
            </div>
            <Link to="/">
              <button type="button" className="btn btn-primary"><i className="fas fa-arrow-left"></i> Back to Home</button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default ProductDetail;
