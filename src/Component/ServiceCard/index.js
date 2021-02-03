import React, {Component} from 'react'
import './styles.scss'

class ServiceCard extends Component {
    
    render (){
        return (
            <div className = 'service-card-container' onClick= {this.props.onClick}>
                <img id="target" 
                    src={this.props.img}
                    style={{ maxWidth: 100, maxHeight: 100 }} />
                <div id = "service-details">
                    <div style = {{marginBottom : 10}}>{this.props.name}</div>
                    <div>{this.props.description}</div>
                </div>
            </div>
        )
    }
}

export default ServiceCard