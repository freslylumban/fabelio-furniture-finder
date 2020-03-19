import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../redux/actions/ActProducts';
import ProductDetail from './ProductDetail';

import Muter from '../assets/images/spinner-loading.gif';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
      passingTags: {
        furniture_style: {
          Contemporary: false,
          Modern: false,
          Scandinavian: false,
          Classic: false,
          Midcentury: false
        },
        delivery_time: {
          oneWeek: false,
          twoWeek: false,
          oneMonth: false,
          moreTime: false,
        }
      },
      loadView: 1,
      disabledProp: false,
      detailProduct: [],
      loading: false,
      error: false
    }
  }
  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.props.getAllProducts();
    this.setState({
      loading: false,
      error: this.props.errorProps
    });
  }
  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  checkboxHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }
  updateSearch = (e) => {
    this.setState({
      searchBox: e.target.value.substr(0, 15)
    })
  }
  allFilterClickListener = async (e, filterProp) => {
    const name = e.target.dataset.name;
    this.setState(prevState => ({
      passingTags: {
        ...prevState.passingTags,
        [filterProp]: {
          ...prevState.passingTags[filterProp],
          [name]: !prevState.passingTags[filterProp][name]
        }
      }
    }));
    await this.checkboxHandler(e);
  }
  filteredCollected = () => {
    const collectedTrueKeys = {
      furniture_style: [],
      delivery_time: []
    };
    const { furniture_style, delivery_time } = this.state.passingTags;
    for (let fStyle in furniture_style) {
      if (furniture_style[fStyle]) collectedTrueKeys.furniture_style.push(fStyle);
    }
    // let abcBox = [];
    // let defBox = [];
    // let ghiBox = [];
    // let jklBox = [];
    // for (let iu=1; iu<=7; iu++) {
    //   abcBox.push(`${iu}`);
    // }
    // for (let ju=8; ju<=14; ju++) {
    //   defBox.push(`${ju}`);
    // }
    // for (let ku=15; ku<=30; ku++) {
    //   ghiBox.push(`${ku}`);
    // }
    // for (let lu=31; lu<=100; lu++) {
    //   jklBox.push(`${lu}`);
    // }
    let timeee = this.state.passingTags.delivery_time;
    for (let dTime in delivery_time) {
      if ((dTime === 'oneWeek') && timeee.oneWeek) {
        collectedTrueKeys.delivery_time.push('1', '2', '3', '4', '5', '6', '7');
      } else if ((dTime === 'twoWeek') && timeee.twoWeek) {
        collectedTrueKeys.delivery_time.push('8', '9', '10', '11', '12', '13', '14');
      } else if ((dTime === 'oneMonth') && timeee.oneMonth) {
        collectedTrueKeys.delivery_time.push('15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30');
      } else if ((dTime === 'moreTime') && timeee.moreTime) {
        collectedTrueKeys.delivery_time.push('31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60')
      } else {
        collectedTrueKeys.delivery_time.push();
      }
    }
    return collectedTrueKeys;
  }
  multiPropsFilter = (products, filters) => {
  return products.filter(product => {
    const filterKeys = Object.keys(filters);
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        if (Array.isArray(product[key])) {
          return product[key].some(keyElement => filters[key].includes(keyElement));
        }
        return filters[key].includes(product[key]);
      });
    });
  }
  searchProducts = () => {
    const filteredProducts = this.multiPropsFilter(this.props.allProductsProps, this.filteredCollected());
    return filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(this.state.searchBox);
    });
  }
  getDetailProduct = async (data) => {
    await this.setState({
      loadView: 2,
      detailProduct: data,
      disabledProp: true
    })
  }
  changeView = (View) => {
    this.setState({
      loadView: View,
      disabledProp: false
    });
  }
  refreshPage = () => {
    window.location.reload(true);
  }
  loading = isLoading => {
    if(isLoading) {
      return <div className="spinner-loading-gif"><img src={Muter} /></div>
    }
  }
  error = isError => {
    if(isError) {
      return <div className="alert alert-danger">
        <span style={{ margin: "0 10px 0 0" }}>Network Error </span><button type="button" className="btn btn-primary" onClick={this.refreshPage}><i className="fas fa-arrow-left"></i>Refresh Page</button>
      </div>
    }
  }
  render() {
    const showProducts = this.searchProducts().map(pr => {
      return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-6" key={pr.name}>
          {/* <Link to="/product/:name"> */}
            <div className="product-box" onClick={() => this.getDetailProduct(pr)}>
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
          {/* </Link> */}
        </div>
      )
    })
    return (
      <section className="fabelio-furniture">
      {this.error(this.state.error)}
        <div className="fabelio-header">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group">
                  <input type="text" className="form-control search-box" id="searchBox" placeholder="Search Furniture" name="searchBox"  onChange={this.inputHandler} autoComplete="off" disabled={this.state.disabledProp} />
                  {/* <button className="search-button"><i class="fas fa-search"></i></button> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="dropdown dropdown-style">
                  <button className="btn btn-light dropdown-toggle" role="button" id="dropdownFurnitureStyle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.disabledProp} >
                    Furniture Style
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownFurnitureStyle">
                    <div className="fstyle-box">
                      <div className="furniture-style">
                        <p>Contemporary</p>
                        <input type="checkbox" name="Contemporary" data-name="Contemporary" onClick={e => this.allFilterClickListener(e, "furniture_style")} />
                      </div>
                      <div className="furniture-style">
                        <p>Modern</p>
                        <input type="checkbox" name="Modern" data-name="Modern" onClick={e => this.allFilterClickListener(e, "furniture_style")} />
                      </div>
                      <div className="furniture-style">
                        <p>Scandinavian</p>
                        <input type="checkbox" name="Scandinavian" data-name="Scandinavian" onClick={e => this.allFilterClickListener(e, "furniture_style")} />
                      </div>
                      <div className="furniture-style">
                        <p>Classic</p>
                        <input type="checkbox" name="Classic" data-name="Classic" onClick={e => this.allFilterClickListener(e, "furniture_style")} />
                      </div>
                      <div className="furniture-style">
                        <p>Midcentury</p>
                        <input type="checkbox" name="Midcentury" data-name="Midcentury" onClick={e => this.allFilterClickListener(e, "furniture_style")} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="dropdown dropdown-style">
                  <button className="btn btn-light dropdown-toggle" role="button" id="dropdownDeliveryTime" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.disabledProp} >
                    Delivery Time
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownDeliveryTime">
                    <div className="dtime-box">
                      <div className="deliv-time">
                        <p>1 Week</p>
                        <input type="checkbox" name="oneWeek" data-name="oneWeek" onClick={e => this.allFilterClickListener(e, "delivery_time")} />
                      </div>
                      <div className="deliv-time">
                        <p>2 Weeks</p>
                        <input type="checkbox" name="twoWeek" data-name="twoWeek" onClick={e => this.allFilterClickListener(e, "delivery_time")} />
                      </div>
                      <div className="deliv-time">
                        <p>1 Month</p>
                        <input type="checkbox" name="oneMonth" data-name="oneMonth" onClick={e => this.allFilterClickListener(e, "delivery_time")} />
                      </div>
                      <div className="deliv-time">
                        <p>More...</p>
                        <input type="checkbox" name="moreTime" data-name="moreTime" onClick={e => this.allFilterClickListener(e, "delivery_time")} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          parseInt(this.state.loadView) === parseInt(1) ? 
        <div className="fabelio-body">
          <div className="container">
            <div className="row">
              {this.loading(this.state.loading)}
              {showProducts}
            </div>
          </div>
        </div> : null
        }

        {
          parseInt(this.state.loadView) === parseInt(2) ? 
          <ProductDetail detailProduct={this.state.detailProduct} changeView={this.changeView}/> : null
        }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProductsProps: state.RdcProducts.allProducts,
    allFurnitureStylesProps: state.RdcProducts.allFurnitureStyles,
    errorProps: state.RdcProducts.errorBool,
    errorText: state.RdcProducts.errorMsg
  }
}

const ProductsConnect = connect(
  mapStateToProps,
  { getAllProducts }
)(withRouter(Products))

export default ProductsConnect;
