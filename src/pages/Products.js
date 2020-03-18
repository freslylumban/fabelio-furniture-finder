import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../redux/actions/ActProducts';

import Muter from '../assets/images/spinner-loading.gif';

// const furnitureStyle = ['Contemporary', 'Modern', 'Scandinavian', 'Classic', 'Midcentury'];
// const deliveryTime = ['OneWeek', 'TwoWeek', 'ThreeWeek', 'FourWeek'];
// let timeDeliver = this.props.allProductsProps.delivery_time
// if (0<timeDeliver<=7) {
//   return timeDeliver = "oneWeek";
// } else if (7<timeDeliver<=14) {
//   return timeDeliver = "twoWeek";
// } else if (14<timeDeliver<=30) {
//   return timeDeliver = "oneMonth";
// } else {
//   return timeDeliver = "moreTime";
// }

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
      furnitureStylesChoose: [],
      deliveryTimeChoose: [],
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
  getDetailProduct = (e) => {
    e.preventDefault();
    console.log('TEST BUTTON DETAIL')
  }
  loading = isLoading => {
    if(isLoading) {
      return <div className="spinner-loading-gif"><img src={Muter} /></div>
    }
  }
  error = isError => {
    if(isError) {
      return <div className="alert alert-danger"><span>Network Error</span></div>
    }
  }
  ////////////////////////
  allFilterClickListener = async (e, filterProp) => {
    console.log("FILTER CLICKED", e.target.dataset.name);
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
    console.log('PASSING TAGS', this.state.passingTags)
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
    let timeee = this.state.passingTags.delivery_time;
    for (let dTime in delivery_time) {
      if (timeee.oneWeek && delivery_time[dTime]) {
        collectedTrueKeys.delivery_time.push('1', '2', '3', '4', '5', '6', '7');
      } else if (timeee.twoWeek) {
        collectedTrueKeys.delivery_time.push('8', '9', '10', '11', '12', '13', '14');
      } else if (timeee.oneMonth) {
        collectedTrueKeys.delivery_time.push('15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30');
      } else {
        collectedTrueKeys.delivery_time.push()
      }
      // if (delivery_time[dTime]) collectedTrueKeys.delivery_time.push(dTime);
    }
    console.log('furniture_style & delivery_time', collectedTrueKeys)
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
  ///////////////////////
  render() {
    console.log(this.props);
    const showProducts = this.searchProducts().map(pr => {
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
    console.log('searchProducts', this.searchProducts());
    return (
      <section className="fabelio-furniture">
      {this.error(this.state.error)}
        <div className="fabelio-header">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group">
                  <input type="text" className="form-control search-box" id="searchBox" placeholder="Search Furniture" name="searchBox"  onChange={this.inputHandler} autoComplete="off" />
                  {/* <button className="search-button"><i class="fas fa-search"></i></button> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="dropdown dropdown-style">
                  <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownFurnitureStyle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Furniture Style
                  </a>
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
                  <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownDeliveryTime" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Delivery Time
                  </a>
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
    allFurnitureStylesProps: state.RdcProducts.allFurnitureStyles,
    errorProps: state.RdcProducts.error
  }
}

const ProductsConnect = connect(
  mapStateToProps,
  { getAllProducts }
)(withRouter(Products))

export default ProductsConnect;
