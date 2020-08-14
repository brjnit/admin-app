import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import DropDown from '../dropDown'
import './styles.scss'
import { AccountBalance } from "@material-ui/icons";
import Wrapper from "../../hoc/Wrapper";
import Footer from "../footer";
import BasicButton from "../basicButton";
import { useDispatch } from "react-redux";
const Report = (props) => {

    const [campus, setCampus] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const dispatch = useDispatch();
    const configCampusSelect = {
            label: "Campus",
            list: [3,4,56,6,7],
            emitEvent: (value)=>{
                setCampus(value)
            }
    }

    const configCompanySelect = {
        label: "Company",
        list: [3,4,56,6,7],
        emitEvent: (value)=>{
            setCompany(value)
        }
}

const configTypeSelect = {
    label: "Type",
    list: [3,4,56,6,7],
    emitEvent: (value)=>{ 
        setType(value)
    }
}

const checkSubmitButton = () => {
    console.log("campus", campus, company, type)
    return campus != '' &&  company != '' && type != ''
}

const handleSubmit = () => {
    dispatch() //call service acion and pass campus, handleSubmit, type, fromdate, todate
}

const configSubmit = {
    buttonText: "Submit",
    isEnable: checkSubmitButton(),
    emitEvent: handleSubmit
}

// useEffect(() => {
//     checkSubmitButton()
// }, []);
    return (
        <Wrapper>
            <div>Select below Fields to generate report </div>
            <div className="report">
            <div  className="compus_select">
            <DropDown {...configCampusSelect}/>
            </div>
            <div className="compus_select">
            <DropDown {...configCompanySelect}/>
            </div>
            <div className="compus_select">
            <DropDown {...configTypeSelect}/>
            </div>
            

            {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        </div>
        <Footer>
                            <BasicButton  {...configSubmit} />
            </Footer>
        </Wrapper>
        
    )
}
Report.propTypes = {
    data: PropTypes.array
}

export default Report;