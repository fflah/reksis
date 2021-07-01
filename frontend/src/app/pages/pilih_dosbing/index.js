import React, { Component, Fragment } from 'react';
import ComponentsSidebar from '../../shared/ComponentsSidebar';
import { Form, Button, Modal} from 'react-bootstrap';
import "./pilih_dosbing.css";
import bsCustomFileInput from 'bs-custom-file-input';
import AsyncSelect from 'react-select/async';
import API from '../../../services';
import makeAnimated from 'react-select/animated';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import {connect} from 'react-redux';


export class PilihDosbing extends Component {
    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);             
    }
    state = {        
            paperPost:{
                judul: '',
                abstrak: '',
                keyword: ''
            },
            isSubmit: false,
            reksis_dosen: [],
            show: false,
            errorMessage:''
        }

    componentDidMount() {
        bsCustomFileInput.init()        
    }
    handleClose (){
        this.setState({ show: false });
    };
    
    handleShow (){
        this.setState({ show: true });
    };

    handelFromChange = (event) =>{
        let fromPaperInput = {...this.state.paperPost};
        fromPaperInput[event.target.name] = event.target.value
        
        this.setState({
            paperPost:fromPaperInput
        })
        
    }
    
    hendelKeyword = (inputValue, callback) => {
        setTimeout(() => {
            API.getKeyword(inputValue).then((data)=>{  
                const tempArray = [];              
                for (const keyword of data.results){                    
                    tempArray.push({
                        label: `${keyword.text}`,
                        value: keyword.text,
                    });
                }
                callback(tempArray);
                
            }).catch((error) => {
                console.log(error, "catch the hoop");
            });            
        }, 1000);
    };

    onSearchChange = (selectedOption) => {
        if (selectedOption) {
            let fromPaperInput = {...this.state.paperPost};
            let keyword = []
            selectedOption.forEach(data =>{
                keyword.push(data.value)
            })
            let key = keyword.join(", ")
            fromPaperInput['keyword'] = key;
            this.setState({
                paperPost:fromPaperInput
            })
        }
    };

    handleSubmit = () =>{        
        if(this.state.paperPost.judul !== "" && this.state.paperPost.abstrak !== "" && this.state.paperPost.keyword !== "" ){
            if(this.state.paperPost.abstrak.split(' ').length >=150){
                let data = {
                    'input': `${this.state.paperPost.judul} ${this.state.paperPost.abstrak} ${this.state.paperPost.keyword}`
                }            
                this.setState({show:true, errorMessage:''})
                setTimeout(() => {
                    API.postPaper(data, this.props.user_key).then((result)=>{                      
                        this.setState({    
                            show:false,                
                            isSubmit:true,
                            reksis_dosen:result,                
                        })
                        
                    }).catch((error) => {
                        console.log(error, "catch the hoop");
                    });
                }, 1000);

            }else{

                this.setState({errorMessage:'Abstrak kamu kurang, minimal 150 kata :('})
            }
        }else{
            this.setState({errorMessage:'Form yang kamu isi belum lengkap :('})
        }
    }

    handelBack = () =>{
        let paperClean = {
            judul : '',
            abstrak: '',
            keyword: ''
        }

        this.setState({
            isSubmit:false,            
            paperPost:paperClean
        })
    }

    handleChange = (normalSelectOption) => {
        this.setState({ normalSelectOption });
    };

    render() {    
    const animatedComponents = makeAnimated();

    return (
        <Router>
        <Switch>
        <Fragment>
            {
                !this.state.isSubmit ?
                <div>
                    <div className="container d-flex p-md-0">
                    <ComponentsSidebar/>

                    <Modal centered backdrop="static" size="sm" show={this.state.show} onHide={this.handleClose}>
                        <Modal.Body id="modal_loading" > 
                        <div className="loading text-center">
                            <i className="fa-6x fas fa-circle-notch fa-spin"></i>
                            <p>Memuat...</p>
                        </div>
                        </Modal.Body>
                    </Modal>
                    
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                        <span>Home</span>
                        <span>Pilih Dosbing</span>
                        </div>
                        <p className="mg-b-20">Silakan ini form dibawa ini dengan lengkap untuk menentukan dosen pembimbing tugas akhir kamu ya!.</p>

                        <div className="row row-sm mg-b-20">
                            
                            <div className="col-lg-12">
                                <p className="mg-b-10">Nama</p>
                                <Form.Control readOnly defaultValue={`${this.props.user.first_name} ${this.props.user.last_name}`} type="text" placeholder="Input box" />
                            </div>
                        
                            <div className="col-lg-12 mg-t-20 mg-lg-t-15">
                                <p className="mg-b-10">Judul</p>
                                <Form.Control autoComplete="off" defaultValue={this.state.paperPost.judul} type="text" name="judul" id="judul" placeholder="Input your title paper" onChange={(event) => this.handelFromChange(event)}/>
                            </div>
                            <div className="col-lg-12 mg-t-20 mg-lg-t-15">
                                <p className="mg-b-10">Abstrak</p>
                                <Form.Control as="textarea" defaultValue={this.state.paperPost.abstrak} name="abstrak" rows="6" placeholder="Input your abstract paper" onChange={(event) => this.handelFromChange(event)}/>
                            </div>
                            <div className="col-lg-12 mg-t-20 mg-lg-t-15">
                                <p className="mg-b-10">Keywords</p>
                                <AsyncSelect
                                    value={this.state.selectedOption}
                                    components={animatedComponents}
                                    loadOptions={this.hendelKeyword}
                                    placeholder="Search your keywords"
                                    onChange={(e) => {this.onSearchChange(e); }}
                                    isMulti
                                    defaultOptions={true}
                                    name="keyword"
                                />
                            </div>                
                            <div className="col-lg-4 mg-t-20 mg-lg-t-15">
                                <p className="error-message">{this.state.errorMessage}</p>
                                <Button onClick={() => this.handleSubmit()} type="submit" variant="az-secondary btn-block">Submit</Button>
                            </div>
                            
                        </div>

                        <hr className="mg-y-30"/>

                    </div>
                    </div>
                </div>
                :
                <div>
                    <div className="container d-flex p-md-0">
                    <ComponentsSidebar/>
                    <div className="container-fluid">
                        <div className="az-content-breadcrumb">
                            <span>Home</span>
                            <span>Rekomendasi Dosbing</span>
                        </div>
                            <div className="card mhs">
                                <div className="card-horizontal">
                                <div className="row">
                                    <div className="col-lg-12 pt-2 pb-2 ">
                                        <div className="card-body pl-0 pt-1 ml-3">
                                            {/* <h4 className="card-title ">{`${this.props.user.first_name} ${this.props.user.last_name}`}</h4>
                                            <hr></hr> */}

                                            <div className="judul">
                                                <p className="card-text text-muted title">Judul</p>
                                                <p className="card-text text-muted diskripsi">{this.state.paperPost.judul}</p>
                                            </div>
                                            <div className="abstrak">
                                                <p className="card-text text-muted title">Abstrak</p>
                                                <p className="card-text text-muted diskripsi">{this.state.paperPost.abstrak}</p>
                                            </div>
                                            <div className="abstrak">
                                                <p className="card-text text-muted title">Keyword</p>
                                                <p className="card-text text-muted diskripsi">{this.state.paperPost.keyword}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        

                                </div>
                                
                            </div>
                        <h5 className="mg-b-10 title-reksis">Dibawah ini hasil rekomendasi dosbing untuk kamu</h5>
                        <div className="row">
                            {this.state.reksis_dosen.map((reksis, index) =>{
                                let text_score = undefined;
                                if (reksis.value_similarity <=0.2)
                                    text_score = <Fragment><rect x={0} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={22} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={44} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={66} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={88} y={8} width={20} height={8} fill="#DCDCDC" /></Fragment>
                                else if (reksis.value_similarity <=0.4)
                                    text_score = <Fragment><rect x={0} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={22} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={44} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={66} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={88} y={8} width={20} height={8} fill="#DCDCDC" /></Fragment>
                                else if (reksis.value_similarity <=0.6)
                                    text_score = <Fragment><rect x={0} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={22} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={44} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={66} y={8} width={20} height={8} fill="#DCDCDC" />
                                    <rect x={88} y={8} width={20} height={8} fill="#DCDCDC" /></Fragment>
                                else if (reksis.value_similarity <=0.8)
                                    text_score = <Fragment><rect x={0} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={22} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={44} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={66} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={88} y={8} width={20} height={8} fill="#DCDCDC" /></Fragment>
                                else if (reksis.value_similarity <=1)
                                    text_score = <Fragment><rect x={0} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={22} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={44} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={66} y={8} width={20} height={8} fill="#009ECE" />
                                    <rect x={88} y={8} width={20} height={8} fill="#009ECE" /></Fragment>                              

                                return<div className="col-12 mt-3" key={index}>
                                    <div className="card dosen">
                                        <div className="card-horizontal">
                                            <div className="row">
                                                <div className="col-lg-3 pt-2 pb-2 text-center">
                                                    <div className="img-square-wrapper">
                                                        <img src={`${reksis.foto.foto}`} alt="dosen foto" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 pl-0 text-left">
                                                    <div className="card-body pl-0 pt-1">
                                                        <h4 className="card-title ">{reksis.dosen}</h4>
                                                        <hr></hr>
                                                        <p className=" title_text_score">Text match score </p>
                                                        <svg className="svg_score" width={108} height={24} viewBox="0 0 108 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title_6a30gzag63" aria-describedby="desc_6a30gzag63">
                                                            <title id="title_6a30gzag63">TextMatchScore</title>
                                                            <desc data-testid="textmatchscore-desc" id="desc_6a30gzag63">TextMatchScore 3 out of 5</desc>
                                                            {text_score}
                                                        </svg>
                                                        <div className="judul">
                                                            <p className="card-text title">Judul</p>
                                                            <p className="card-text diskripsi">{reksis.judul}</p>
                                                        </div>
                                                        <div className="abstrak">
                                                            <p className="card-text title">Abstrak</p>
                                                            <p className="card-text diskripsi">{reksis.abstrak}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                        <small className="text-muted">data by google scholar</small>
                                        </div>
                                    </div>
                                </div>
                                })
                            }
                        </div>                      
                        <div className="col-lg-4 mg-t-20 mg-lg-t-15 btn-kembali"><Button  onClick={() => this.handelBack()} variant="az-secondary btn-block">Kembali</Button></div>
                    </div>
                    </div>
                </div>
                

            }
        </Fragment>
        </Switch>
        </Router>
        
    )
  }
}

// subscription
const mapStateToProps = (state) =>{
    return{
        user:state.user,
        user_key:state.user_key
    }

}

export default connect(mapStateToProps)(PilihDosbing);