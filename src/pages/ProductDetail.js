import React, { Component } from 'react';

class ProductDetail extends Component {
  render() {
    return (
      <section className="fabelio-detailproducts">
        <div className="fabelio-detailprod-header">
          <div className="container">
            <h3>{this.props.detailProduct.name}</h3>
          </div>
        </div>
        <div className="fabelio-detailprod-body">
          <div className="container">
            <div className="product-details-box">
              <div className="prod-details-name">
                <p className="prod-details-name-title">Product Name</p>
                <p className="prod-details-name-product">{this.props.detailProduct.name}</p>
              </div>
              <div className="prod-details-desc">
                <p className="prod-details-desc-title">Product Description</p>
                <p className="prod-details-desc-product">{this.props.detailProduct.description}</p>
              </div>
              <div className="prod-details-fstyle">
                <p className="prod-details-fstyle-title">Furniture Style</p>
                <p className="prod-details-fstyle-product">{this.props.detailProduct.furniture_style.slice().join(", ")}</p>
              </div>
              <div className="prod-details-deliverytime">
                <p className="prod-details-deliverytime-title">Delivery Time</p>
                <p className="prod-details-deliverytime-product">{parseInt(this.props.detailProduct.delivery_time)} {(parseInt(this.props.detailProduct.delivery_time) === 1) ? 'Day' : 'Days'}</p>
              </div>
              <div className="prod-details-price">
                <p className="prod-details-price-title">Price</p>
                <p className="prod-details-price-product">Rp. {parseInt(this.props.detailProduct.price).toLocaleString("id-ID")}</p>
              </div>
            </div>
              <button type="button" className="btn btn-primary" onClick={() => this.props.changeView(1)}><i className="fas fa-arrow-left"></i> Back to Home</button>
          </div>
        </div>
      </section>
    )
  }
}

export default ProductDetail;
