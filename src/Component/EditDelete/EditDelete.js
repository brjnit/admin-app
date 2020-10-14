import React from "react";
import PropTypes from 'prop-types';
import { Edit, Delete } from '@material-ui/icons';
import './styles.scss'

const EditDelete = (props) => {
    const {editEvent, deleteAction} = props
    
    return(
        <div className = "editDelete" >
            <div  className = "delete" onClick = {deleteAction}> <Delete/></div>
            <div onClick = {editEvent}><Edit/></div>
            </div>
    )
}
EditDelete.propTypes = {
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.func
}

export default EditDelete;

