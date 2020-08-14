import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Card from '../card'
import './styles.scss'
import { AccountBalance } from "@material-ui/icons";
const Dashboard = (props) => {
    const { data } = props
    //const [textValue, setTextValue] = useState('')
    const handleDisplay= () => {
        if (data !=null && data.length>0) {
           return  data.map( (item) => {
                return <Card {...item}/>
            })
        }
    }
    // useEffect(() => {
    //     setTextValue(value)
    // }, []);
    
    
    return (
        <div className="dashboard">
            {handleDisplay() }
        </div>
    )
}
Dashboard.propTypes = {
    data: PropTypes.array
}

export default Dashboard;