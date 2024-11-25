import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const Homepage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewDate] = useState("table");  
  const [editable, setEditable] = useState(null);
  


  // table data
  const columns = [
    {
      title: "Date",  
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
      key: "refrence",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="d-flex gap-2">
          <EditOutlined
          className="text-primary cursor-pointer"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
             className="text-danger cursor-pointer"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div> 
      ),
    },
  ];

  // useEffect Hooks
  useEffect(() => {

    // getAll Transections
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("http://localhost:8000/api/v1/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransection(res.data);
      }
       catch (error) {
        console.log(error);
        message.error("Failed to get transection");
      }
    };
    getAllTransections();
  }, [frequency, selectedDate, type,setAllTransection]);


  // Delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/v1/transections/delete-transection", {
        transactionId: record._id,
      });
          // Remove the deleted transaction from the list
    setAllTransection((prevTransections) =>
      prevTransections.filter((transection) => transection._id !== record._id)
    );
      setLoading(false);
      message.success("Transection deleted successfully");
    } 
    catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Failed to delete transection");
    }
  };



  // form handleSubmit transaction edit and add
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      

      if (editable) {
         // Edit the existing transaction 
         await axios.post("http://localhost:8000/api/v1/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });  

    // Update the transaction in the state
    setAllTransection((prevTransections) =>   
      prevTransections.map((transection) =>
        transection._id === editable._id
          ? { ...transection, ...values } // Replace the old transaction with updated data
          : transection 
      )
    );
        setLoading(false);
      message.success("Transection Updated successfully");

      } 
      else {
        // Add a new transaction
        await axios.post("http://localhost:8000/api/v1/transections/add-transection", {
          ...values,
          userid: user._id,
        });

            //Add the new transaction to the state
            // setAllTransection((prevTransections) => [ 
            //   ...prevTransections, 
            //   response.data,
            // ]);

      setLoading(false);  
      message.success("Transection added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } 
    catch (error) {
      setLoading(false);
      message.error("Failed to add transection");
    }
    finally {
      setLoading(false);    // Always stop the loading state
    }
      
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters row bg-warning">
        <div className="col-12 col-md-4 mb-3">
          <h6>Select Frequency</h6>
          <Select
            value={frequency}
            onChange={(values) => setFrequency(values)}
            className="w-100"
          >
            <Select.Option value="7">Last 1 Week</Select.Option> 
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom Range</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
              className="w-100 mt-2"
            />
          )}
        </div>
        <div className="col-12 col-md-4 mb-3">
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={(values) => setType(values)}
            className="w-100"
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
       
        </div>

        <div className="col-12 col-md-4 mb-3 d-flex align-items-center justify-content-between">
          <div>
            <UnorderedListOutlined
              className={`mx-2 mt-4 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewDate("table")}
            />
            <AreaChartOutlined
              className={`mx-2 mt-4 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewDate("analytics")}
            />
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary mt-4">
            Add New Transaction 
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === "table" ? (  
          <div className="table-responsive">
            <Table
              columns={columns}
              className="bg-info"
              dataSource={allTransection.map((item,index) => ({
                ...item,
                key: item._id || `temp-${index}`,
              }))}
              pagination={{ pageSize: 8 }}
            />
          </div>
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => 
          setShowModal(false) // Close modal
        }
        footer={false}
      >
        <Form 
          className="mb-2"
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit} 
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
            <Select.Option value="incomeCategories">
                ------Income Categories------
              </Select.Option>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="bonus">Bonus</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="refund">Refund</Select.Option>
              <Select.Option value="dividend">Dividend</Select.Option>
              <Select.Option value="gift">Gift</Select.Option>
              <Select.Option value="rentalIncome">Rental Income</Select.Option>
              <Select.Option value="expenseCategories">
                ------Expense Categories------
              </Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="groceries">Groceries</Select.Option>
              <Select.Option value="transportation">
                Transportation
              </Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="utilities">Utilities</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="healthcare">Healthcare</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="subscriptions">Subscriptions</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="charity">Charity</Select.Option>
              <Select.Option value="pets">Pets</Select.Option>
              <Select.Option value="childcare">Childcare</Select.Option>
              <Select.Option value="insurance">Insurance</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="taxes">Taxes</Select.Option>
              <Select.Option value="donate">Donate</Select.Option>
              <Select.Option value="recharge">Mobile Recharge</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
