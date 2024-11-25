import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
  //category
  const categories = [
    "salary",  //Income Categories Start
    "bonus",
    "freelance",
    "investment",
    "project",
    "refund",
    "dividend",
    "gift",
    "rentalIncome",
    "food",     //Expense Categories start
    "groceries",
    "transportation",
    "entertainment",
    "utilities",
    "rent",
    "healthcare",
    "education",
    "subscriptions",
    "shopping",
    "travel",
    "charity",
    "pets",
    "childcare",
    "insurance",
    "movie",
    "bills",
    "taxes",
    "donate",
    "recharge",
    "others"
  ];

  // total Transection
  const totalTransaction = allTransection.length;
  
  
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;



  // total Turnover

  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-3">
          <div className="card mt-3">
            <div className="card-header bg-info fw-bold">
              Total Transections : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransactions.length}
              </h5>

              <div className="d-flex align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mt-3"
                  percent={totalIncomePercent.toFixed(0)}
                />

                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card mt-3"> 
            <div className="card-header bg-info fw-bold">Total Turnover : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>

              <div className="d-flex align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mt-3"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />

                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <h6 className="bg-success p-2 text-light mt-3">Categorywise Income</h6>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2" key={`income-${category}`}>
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="col-md-3">
          <h6 className="bg-danger p-2 text-light mt-3">Categorywise Expense</h6>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2" key={`expense-${category}`}>
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="row mt-3 analytics"></div>
    </>
  );
};

export default Analytics;
