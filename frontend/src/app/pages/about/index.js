import React, { Component } from 'react';
import ComponentsSidebar from '../../shared/ComponentsSidebar';
import "react-datepicker/dist/react-datepicker.css";
import "nouislider/distribute/nouislider.css";
import bsCustomFileInput from 'bs-custom-file-input'


export class About extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      toggleSwitchDefault: false,
      toggleSwitchSecondary: false,
      toggleSwitchSuccess: false,
      toggleSwitchDark: false,
      toggleSwitchDefault2: true,
      toggleSwitchSecondary2: true,
      toggleSwitchSuccess2: true,
      toggleSwitchDark2: true,
    }
  }
  componentDidMount() {
    bsCustomFileInput.init()
  }

  render() {
    const mystyle = {      
      minHeight:"500px"
    };
    return (
      <div>
        <div className="container d-flex p-md-0">
          <ComponentsSidebar/>
          <div className="az-content-body pd-lg-l-40 d-flex flex-column"  style={mystyle}>
            <div className="az-content-breadcrumb">
              <span>Home</span>
              <span>About</span>
            </div>
            <p className="mg-b-20" style={{textIndent: "30px"}}>
            Hai aku reksis, aku recommendation system untuk memilih dosen pembimbing di prodi Informatika UMS, aku dibangun dengan data-data publik,
            data dari google scholar, eprint ums, mail.ums, fki.ums.ac.id informatika.ums.ac.id, dll. Cara kerjaku simple, aku mencocokan judul, abstrak dan keyword 
            mahasiswa dengan abstrak dan judul paper dosen yang telah terbit di google scholar, dengan harapan mahasiswa dapat menemukan dosen pembimbing terbaiknya di penellitian tugas akhirnya.
            Aku hanya merekomendasikan, keputusan tetap di kamu sendiri. Oh iya aku juga tidak menyimpan data nama, judul dan abstrak yang kamu inputkan. Terimakasih. 

            </p>
            <div className="row row-sm mg-b-20">
                
            </div>

            <hr className="mg-y-30"/>

          </div>{/* az-content-body */}
        </div>{/* container */}        
      </div>
    )
  }
}

export default About
