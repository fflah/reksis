import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class ComponentsSidebar extends Component {
  render() {
    return (
      <div>
        <div className="az-content-left az-content-left-components">
          <div className="component-item">
            {/* <label>Reksis</label>
            <nav className="nav flex-column">
              <Link to="/reksis" className={ this.isPathActive('/reksis') ? "nav-link active" : "nav-link" }>Pilih Dosbing</Link>
              <Link to="/dosbing" className={ this.isPathActive('/dosbing') ? "nav-link active" : "nav-link" }>Daftar Dosbing</Link>
            </nav>

            <label>Sistem</label>
            <nav className="nav flex-column">
              <Link to="/about" className={ this.isPathActive('/about') ? "nav-link active" : "nav-link" }>About</Link>
            </nav> */}

            
          </div>{/* component-item */}

        </div>{/* az-content-left */}
      </div>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(ComponentsSidebar)
