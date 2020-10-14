
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import EditDelete from '../EditDelete/EditDelete';
import BasicButton from '../basicButton';

export default function EditableTable(props) {
    const { title,
        data,
        editAction,
        deleteAction,
        addText,
        addAction } = props

    const renderTableHeader = () => {

        return props.headers.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })

    }

    const configEditDelete = {
        
        editEvent: editAction
    }

    const renderTableData = () => {
        console.log("data   ## ", data)
        return data != null && data.map((item, index) => {
            const { id, name, role, phoneNumber, emailId } = item
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{phoneNumber}</td>
                    <td>{emailId}</td>
                    <td>{role}</td>
                    <td> <EditDelete deleteAction = {()=>{alert("delete"+ id)}} {...configEditDelete} /></td>
                </tr>
            )
        })
    }

    const configAddUser = {
        buttonText: addText,
        isEnable: true,
        emitEvent: addAction
    }

    return (
        <div className='grid'>
            <div className='header'>{title}
                <div className='addUser'> <BasicButton {...configAddUser} /></div>
            </div>
            <table id='tableComponent'>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>


        // <div
        //   title="Editable Example"
        //   columns={state.columns}
        //   data={state.data}
        //   editable={{
        //     onRowAdd: (newData) =>
        //       new Promise((resolve) => {
        //         setTimeout(() => {
        //           resolve();
        //           setState((prevState) => {
        //             const data = [...prevState.data];
        //             data.push(newData);
        //             return { ...prevState, data };
        //           });
        //         }, 600);
        //       }),
        //     onRowUpdate: (newData, oldData) =>
        //       new Promise((resolve) => {
        //         setTimeout(() => {
        //           resolve();
        //           if (oldData) {
        //             setState((prevState) => {
        //               const data = [...prevState.data];
        //               data[data.indexOf(oldData)] = newData;
        //               return { ...prevState, data };
        //             });
        //           }
        //         }, 600);
        //       }),
        //     onRowDelete: (oldData) =>
        //       new Promise((resolve) => {
        //         setTimeout(() => {
        //           resolve();
        //           setState((prevState) => {
        //             const data = [...prevState.data];
        //             data.splice(data.indexOf(oldData), 1);
        //             return { ...prevState, data };
        //           });
        //         }, 600);
        //       }),
        //   }}
        // />
    );
}

EditableTable.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    editAction: PropTypes.func,
    deleteAction: PropTypes.func,
    addText: PropTypes.string,
    addAction: PropTypes.func,
    headers: PropTypes.object
}
