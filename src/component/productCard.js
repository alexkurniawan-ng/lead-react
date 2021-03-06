import React, { Component } from 'react';
import '../assets/css/card.css'
import { MDBIcon, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBTooltip } from "mdbreact";
import { Link } from 'react-router-dom'
import { API_URL } from '../support/Backend_URL'
import { connect } from 'react-redux'
import { getAllProduct } from '../redux/action'

class ProductCard extends Component {

    componentDidMount = () => {
        console.log('CP', this.props.children)
        this.props.getAllProduct(this.props.children)
    }

    componentDidUpdate() {
        if (this.props.children) {
            this.props.getAllProduct(this.props.children)
        }
    }

    sortData = (arr, cbfn) => {
        let hasil = ''
        for (let k = 0; k < arr.length - 1; k++) {//berhenti sebelum melebihi index
            for (let l = k + 1; l < arr.length; l++) {
                hasil = cbfn(typeof (arr[k].price) === 'string' ? arr[k].price.charCodeAt(0) : arr[k].price, typeof (arr[l].price) === 'string' ? arr[l].price.charCodeAt(0) : arr[l].price)//membandingkan setiap item dengan semua item satu persatu
                if (hasil > 0) {
                    [arr[k], arr[l]] = [arr[l], arr[k]]
                }
            }
        }
        return arr
    }

    render() {
        return (
            <div className="row">
                {this.sortData(this.props.allProduct, (a, b) => { 
                    if(this.props.sort==='hight'){
                        return b - a 
                    }else if(this.props.sort==='low'){
                        return a - b 
                    }}).map((val, index) =>
                    <MDBCol lg="3" style={{ marginTop: "2%" }} key={val.id}>
                        <Link to={`/ProductDetail?id=${val.id}`}>
                            <MDBCard wide ecommerce>
                                <MDBCardImage
                                    hover
                                    cascade
                                    src={API_URL + val.imagepath}
                                    top
                                    alt="sample photo"
                                    height="250px"
                                    className="objectFit"
                                />
                                <MDBCardBody cascade className="text-center">
                                    {/* <a href="#!" className="text-muted">
                                        <h6>{val.category}</h6>
                                    </a> */}
                                    <MDBCardTitle>
                                        <strong>
                                            <h5>{val.name}</h5>
                                        </strong>
                                    </MDBCardTitle>
                                    <div className="float-left price">
                                        <strong>IDR. {val.price.toLocaleString()}</strong>
                                    </div>
                                    <div className="float-right">
                                        <MDBTooltip domElement placement="top">
                                            <span>
                                                <MDBIcon id={`quickDetail${val.id}`} icon="eye" style={{ cursor: 'pointer' }} />
                                            </span>
                                            <ul className="list-group" >
                                                {/* <li className="list-group-item bg-transparent text-white" style={{ padding: 0 }}>Bahan : {val.product_bahan}</li> */}
                                                {/* <li className="list-group-item bg-transparent text-white" style={{ padding: 0 }}>Rating : {val.product_rating}/5</li> */}
                                                <li className="list-group-item bg-transparent text-white" style={{ padding: 0 }}>Description : {val.description}</li>
                                            </ul>
                                        </MDBTooltip>
                                    </div>
                                    <MDBCardFooter transparent />
                                </MDBCardBody>
                            </MDBCard>
                        </Link>
                    </MDBCol>
                )}
            </div>
        );
    }
}

const mapToProps = ({ products }) => {
    return { ...products }
}

export default connect(mapToProps, { getAllProduct })(ProductCard);
