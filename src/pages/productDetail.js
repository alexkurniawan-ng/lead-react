import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';
import Axios from 'axios'
import { MDBRow, MDBCol, MDBBadge, MDBTooltip } from 'mdbreact';
import '../assets/css/productDetail.css'

class ProductDetail extends Component {
    state = {
        data: [],
        stockDetail: [],
        totalStock: 0,
        totalQty: [],
        orderOption: []
    }

    componentDidMount() {
        console.log(this.props)
        var id = this.props.location.search.split('=')[1];
        Axios.get(API_URL + `/products/getProductById/${id}`)
            .then((res) => {
                this.setState({ data: res.data[0], price: res.data[0].price, totalPrice: 0 })
                console.log(this.state.data)
                console.log(this.state.totalPrice)
                this.getStockDetail(id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getStockDetail = (id) => {
        Axios.get(API_URL + `/products/getStockDetail/${id}`)
            .then((res) => {
                let total = 0
                res.data.map((val) => total += val.stock)
                this.setState({ stockDetail: res.data, totalStock: total })
                console.log('cek stock', this.state.stockDetail)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    checkSizehandler = (e) => {
        let { orderOption, totalQty } = this.state
        let qty = document.getElementById(`qty${e.target.value}`).value
        if (!e.target.checked) {
            document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
        } else if (e.target.checked) {
            document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
            document.getElementById(`size${e.target.value}`).disabled = true
            if (qty !== null) {
                orderOption.push([parseInt(this.state.selectedId), parseInt(e.target.value), parseInt(qty)])
                totalQty.push(parseInt(qty))
                console.log(totalQty)
                this.totalOrder(totalQty)
                console.log(orderOption)
            }
        }
    }

    inQtyhandler = (e) => {
        console.log('check size', e.target.value)
        let size = document.getElementById(`size${document.getElementById(`size${e.target.name}`).value}`)
        console.log('size', size)
        e.target.value > 0 ? size.disabled = false : size.disabled = true
    }

    renderOrder = () => {
        return this.state.stockDetail.map((val, index) => {
            return (
                <MDBCol sm="3" key={val.sizeID} style={{ padding: 0 }}>
                    <div className="input-group" style={{ height: '2%' }}>
                        <div className="input-group-prepend">
                            <div className="input-group-text" style={{ paddingLeft: 0 }}>
                                <input type="checkbox" id={`size${val.sizeID}`} onChange={this.checkSizehandler} style={{ padding: 0 }} disabled aria-label="Checkbox for following text input" value={val.sizeID} />&nbsp;
                        {val.size}
                            </div>
                        </div>
                        <input type="text" id={`qty${val.sizeID}`} onChange={this.inQtyhandler} name={val.sizeID} className="form-control" aria-label="Text input with checkbox" />
                    </div>
                </MDBCol>
            )
        })
    }

    totalOrder = (qty) => {
        let count = 0
        if (qty.length > 0) {
            qty.map((val) => count += val)
            this.setState({ totalPrice: parseInt(this.state.data.price) * count })
        }
    }

    resetOrder = () => {
        this.setState({ orderOption: [],totalQty:[], totalPrice: 0 })
        console.log(this.state.orderOption)
        this.state.stockDetail.map((val) => {
            document.getElementById(`size${val.sizeID}`).checked = false
            document.getElementById(`qty${val.sizeID}`).disabled = false
        })
    }

    render = () => {
        let { data } = this.state;
        this.totalOrder(parseInt(data.price))
        return (
            <div className="jumbotron" style={{ padding: 0, width: '70%', marginLeft: '15%', marginRight: '15%', marginTop: '2.5%' }}>
                <MDBRow>
                    <div className="nameTag">
                        <strong><h1>{data.name}</h1></strong>
                    </div>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="5" style={{ padding: 0 }}>
                        <img src={API_URL + data.imagepath} style={{ padding: '10px 10px 10px 25px' }} width='100%' alt="product" />
                    </MDBCol>
                    <MDBCol>
                        <div style={{ paddingTop: 10 }}>
                            <MDBRow>
                                <MDBCol sm="3"><p className="h6 text-muted" >PRICE</p></MDBCol>
                                <MDBCol sm="8"><p className="h4 font-weight-bold" style={{ color: "orange" }} >IDR. {parseInt(data.price).toLocaleString()}</p></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol sm="3"><p className="h6 text-muted" >MATERIAL</p></MDBCol>
                                <MDBCol sm="8"><p className="h4">{data.material}</p></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol sm="3"><p className="h6 text-muted" >ORDER</p></MDBCol>
                                <MDBCol sm="8">
                                    <p style={{ margin: 0, padding: 0, height: '30%' }} className="font-small grey-text d-flex">
                                        Ready :
                                    <p className="dark-grey-text font-weight-bold ml-1">
                                            {this.state.totalStock}
                                        </p>
                                    </p>
                                    <MDBRow style={{ paddingLeft: '13px' }}>{this.renderOrder()}
                                        <MDBTooltip domElement placement="top">
                                            <span style={{ margin: 'auto' }} onClick={this.resetOrder}>
                                                <i style={{ verticalAlign: 'middle', cursor: 'pointer' }} class="material-icons">settings_backup_restore</i>
                                            </span>
                                            <p style={{ padding: 0 }}>Reset Order</p>
                                        </MDBTooltip>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol sm="3"><p className="h6 text-muted" >DESCRIPTION</p></MDBCol>
                                <MDBCol sm="8"><p style={{ textAlign: 'justify' }}>{data.description}</p></MDBCol>
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <div style={{ width: '100%' }}>
                        <div className="float-right" style={{ marginRight: '1%' }}>
                            <button className="element-AddToCart h2" style={{ height: '100%' }}>Add To Cart</button>
                        </div>
                        <div style={{ backgroundColor: 'silver', color: 'white', marginLeft: '1%', width: '95%', height: '88%' }}>
                            <h4 className="font-weight-bold" style={{ padding: '15px 0 15px 2%', color: 'black' }}>Total : IDR. {parseInt(this.state.totalPrice).toLocaleString()} </h4>
                        </div>
                    </div>
                </MDBRow>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(ProductDetail);