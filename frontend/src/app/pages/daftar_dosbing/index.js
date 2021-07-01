import React, { Component } from 'react';
import ComponentsSidebar from '../../shared/ComponentsSidebar';
import { Card } from 'react-bootstrap';
import "./daftar_dosbing.css";
import "nouislider/distribute/nouislider.css";
import bsCustomFileInput from 'bs-custom-file-input';
import API from '../../../services';
import {connect} from 'react-redux';

export class DaftarDosbing extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dosen : []
        }
    }

    hendelDaftarDosen = () => {
        
        API.getDosen(this.props.user_key).then((result)=>{  
            this.setState({
                dosen:result.results
            })
            
        }).catch((error) => {
            console.log(error);
        });
        
    };

    componentDidMount() {
        bsCustomFileInput.init()
        this.hendelDaftarDosen()
    }

    render() {
        return (
        <div>
            <div className="container d-flex p-md-0">
            <ComponentsSidebar/>
            <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                <div className="az-content-breadcrumb">
                <span>Home</span>
                <span>Daftar Dosbing</span>
                </div>

                <div className="row row-sm mg-b-20 ">
                    {this.state.dosen.map((dosen, index) =>{                          
                            return <div className="col-lg-4 " key={index}>
                                <Card className="justify-content-center card_daftar_dosen" style={{ width: '18rem' }} >
                                    <Card.Img variant="top" className="w-75 p-3 mx-auto d-block" src={dosen.foto}/>
                                    <Card.Body>
                                        <Card.Title>{dosen.fname} {dosen.lname}</Card.Title>
                                        <Card.Text>
                                        {dosen.deskripsi}
                                        Alumni: {dosen.alumni} <br></br>
                                        Home base: {dosen.home_base} <br></br>
                                        Email: {dosen.email}
                                        </Card.Text>
                                    </Card.Body>    
                                    <Card.Body>
                                        <Card.Link className="btn btn-primary" href={dosen.link_scholar}>Google Scholar</Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        })
                    }
                </div>

                <hr className="mg-y-30"/>

            </div>{/* az-content-body */}
            </div>{/* container */}        
        </div>
        )
    }
}
// subscription
const mapStateToProps = (state) =>{
    return{
        user_key:state.user_key,
    }
  
  }


export default connect(mapStateToProps)(DaftarDosbing);