import React, {Component} from 'react'
import './styles.scss'
import ServiceCard from '../ServiceCard'

class ServiceList extends Component {
    
    

    render (){
        const {data} = this.props;
        console.log("[ServiceList.js] data :: ", data)
        return (
            <div id="service-list">
                 {data != null && data != undefined && data.map(item => (
                        <ServiceCard  key={item.id} 
                            onClick={()=>this.props.serviceSelectionHandler(item.id)}
                            img = {item.coverPicture}
                            name = {item.name}
                            description = {item.address}
                        />
                    ))}
            </div>
        )
    }
    
}

export default ServiceList