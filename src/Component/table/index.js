
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
        addAction} = props
   
    const renderTableHeader = () => {
        if (data != null) {
        let header = Object.keys(data[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    }
    
    const configEditDelete = {
        deleteEvent: deleteAction,
        editEvent: editAction
    }

    const renderTableData = () => {
        console.log("data   ## ",data)
        return data!=null && data.map((item, index) => {
            const { id, name, role, status } = item
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>{status}</td>
                    <td> <EditDelete {...configEditDelete}/></td>
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
            <div className='header'>{title}</div>
            <table id='tableComponent'>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData()}
                </tbody>
            </table>
            
            <div className='addUser'> <BasicButton {...configAddUser}/></div>
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
}
