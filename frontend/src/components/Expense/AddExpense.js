import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import explogo from '../../images/explogo.png';
import axios from 'axios';
import backendServer from '../../backEndConfig';

function AddExpense(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setdescription] = useState();
  const [amount, setAmount] = useState();

  const onSubmitExpense = (e) => {
    e.preventDefault();
    const expenseData = {
      description: description,
      amount: amount,
      groupName: props.groupData.groupName,
      groupMembers: props.groupData.groupMembers,
      createdBy: localStorage.getItem('userid'), //email
    };

    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, '-');

    const expenseDatatoParent = {
      expDesc: description,
      amount: amount,
      paidbyUser: localStorage.getItem('username'),
      date: formattedDate,
    };

    props.method(expenseDatatoParent);
    console.log('data to post', expenseData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/expense/addexpense`, expenseData)
      .then((response) => {
        console.log('response after post', response);
        if (response.status == 200) {
          alert('Expense added sucessfully!');
        }
      })
      .catch((error) => {
        alert('Failed to add expense');
        console.log('error:', error);
      });
    handleClose();
  };

  return (
    <div>
      <div>
        <button className="orange-button" onClick={handleShow}>
          Add an expense
        </button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div>
          <Modal.Header closeButton className="modal-header modal-head">
            <Modal.Title className="text-center">Add an Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-2">
                <img src={explogo} className="exp-logo" alt="explogo" />
              </div>
              <div className="col-md-8">
                <form
                  className="form"
                  id="expense-form"
                  onSubmit={onSubmitExpense}
                >
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      id="description"
                      name="description"
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                      required
                    />
                    <p id="error-description" className="text-danger"></p>
                  </div>

                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      id="amount"
                      name="amount"
                      placeholder="0.00$"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      className="form-control"
                      type="number"
                      step=".01"
                      required
                    />
                    <p id="error-expense-amount" className="text-danger"></p>
                  </div>
                  <div>
                    <p>
                      <small>Paid by you and Split Equally</small>
                    </p>
                  </div>

                  <button
                    type="submit"
                    onClick={handleClose}
                    className="float -left orange-button"
                  >
                    close
                  </button>
                  <button type="submit" className="float-right green-button">
                    Save
                  </button>
                </form>
                <div
                  id="error-message"
                  style={{ display: 'none' }}
                  className="mt-4 alert alert-danger"
                ></div>
                <div
                  id="success-message"
                  style={{ display: 'none' }}
                  className="mt-4 alert alert-success"
                ></div>
                <br />
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
export default AddExpense;
