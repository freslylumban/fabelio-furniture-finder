import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../redux/actions/ActProducts';

import Muter from '../assets/images/spinner-loading.gif';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
      furnitureStylesChoose: [],
      deliveryTimeChoose: [],
      loading: false
    }
  }
  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.props.getAllProducts();
    this.setState({
      loading: false
    });
  }
  loading = isLoading => {
    if(isLoading) {
      return <div className="spinner-loading-gif"><img src={Muter} /></div>
    }
  }
  render() {
    console.log(this.props)
    const showProducts = this.props.allProductsProps.map(pr => {
      return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-6" key={pr.name}>
          <Link to="/product/:name">
            <div className="product-box">
              <div className="prod-name">
                <h4 className="prod-name-title">{pr.name}</h4>
                <p className="prod-name-price">Rp. {parseInt(pr.price).toLocaleString("id-ID")}</p>
              </div>
              <div className="prod-desc">
                <p className="prod-desc-text">{pr.description}</p>
              </div>
              <div className="prod-fstyle">
                <p className="prod-fstyle-sub">{pr.furniture_style.slice().join(", ")}</p>
              </div>
              <div className="prod-delivery">
                <p className="prod-delivery-days">
                  {parseInt(pr.delivery_time)} {(parseInt(pr.delivery_time) === 1) ? 'Day' : 'Days'}
                  </p>
              </div>
            </div>
          </Link>
        </div>
      )
    })
    return (
      <section className="fabelio-furniture">
        <div className="fabelio-header">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group">
                  <input type="text" className="form-control search-box" id="searchBox" placeholder="Search Furniture" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group">
                  <div className="dropdown dropdown-style">
                    <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownFurnitureStyle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Furniture Style
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownFurnitureStyle">
                      <div className="fstyle-box">
                        <div className="furniture-style">
                          <p>Contemporary</p>
                          <input type="checkbox" />
                        </div>
                        <div className="furniture-style">
                          <p>Modern</p>
                          <input type="checkbox" />
                        </div>
                        <div className="furniture-style">
                          <p>Scandinavian</p>
                          <input type="checkbox" />
                        </div>
                        <div className="furniture-style">
                          <p>Classic</p>
                          <input type="checkbox" />
                        </div>
                        <div className="furniture-style">
                          <p>Midcentury</p>
                          <input type="checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="dropdown dropdown-style">
                  <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownDeliveryTime" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Delivery Time
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownDeliveryTime">
                    <div className="dtime-box">
                      <div className="deliv-time">
                        <p>1 Week</p>
                        <input type="checkbox" />
                      </div>
                      <div className="deliv-time">
                        <p>2 Weeks</p>
                        <input type="checkbox" />
                      </div>
                      <div className="deliv-time">
                        <p>3 Weeks</p>
                        <input type="checkbox" />
                      </div>
                      <div className="deliv-time">
                        <p>1 Month</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fabelio-body">
          <div className="container">
            <div className="row">
              {this.loading(this.state.loading)}
              {showProducts}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProductsProps: state.RdcProducts.allProducts,
    allallFurnitureStylesProps: state.RdcProducts.allFurnitureStyles
  }
}

const ProductsConnect = connect(
  mapStateToProps,
  { getAllProducts }
)(withRouter(Products))

export default ProductsConnect;
