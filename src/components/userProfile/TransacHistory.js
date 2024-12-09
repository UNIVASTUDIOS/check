import React, { useEffect, useState } from "react";
import CustomSvg from "../svgs/CustomSvg";
import { formatDateDash } from "../../utils";
import { getRequest } from "../apiRequests/requestApi";
import { Spinner } from "react-bootstrap";

export default function TransacHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await getRequest("/transactions");
        console.log(response);

        if (!response.data) {
          setTransactions(null);
        }

        const data = response.data;

        const newArray = data.map(({ amount, createdAt, type, ref }) => ({
          ref,
          amount: amount / 100,
          date: formatDateDash(createdAt),
          type,
        }));

        setTransactions(newArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, []);

  const displayTransacHistory = transactions?.map((transac, i) => {
    const { type, amount, date, ref } = transac;

    return (
      <div
        key={i}
        className="d-flex align-items-center justify-content-between mb-4"
      >
        <div className="d-flex align-items-center">
          <div className="p-2 rounded-circle user-profile-transac-history-transac-icon-container">
            <CustomSvg
              name={
                type === "withdrawal" ? "withdrawal-arrow" : "deposit-arrow"
              }
            />
          </div>
          <div className="mx-2 px-2">
            <h5 className="m-0 p-0 mb-1 txt-FFF opacity-_8 font-weight-600 font-family-poppins small-txt">
              {type === "withdrawal" ? "Cash Withdrawal" : "Funds Added"}
            </h5>
            <p className="m-0 p-0 txt-979797 extra-small-txt font-family-poppins font-weight-400 letter-spacing-_12">
              {ref}
            </p>
          </div>
        </div>
        <div>
          <h5
            className={`${
              type === "withdrawal" ? "txt-E75547" : "txt-4FC143"
            } m-0 p-0 mb-1 small-txt font-family-poppins font-weight-500`}
          >
            &#8358;{amount.toLocaleString()}
          </h5>
          <p className="m-0 p-0 txt-979797 font-family-poppins extra-small-txt line-height-16 letter-spacing-_12 font-weight-400">
            {date}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
      {loading ? (
        <div className="d-flex align-items-center">
          <p className="m-0 p-0 txt-FFF font-weight-600 font-family-poppins small-txt">
            Retrieving transactions...
          </p>
          <div className="mx-2">
            <Spinner size="sm" variant="light" />
          </div>
        </div>
      ) : transactions && transactions.length > 0 ? (
        <div>{displayTransacHistory}</div>
      ) : (
        <p className="m-0 p-0 txt-FFF font-weight-600 font-family-poppins small-txt">
          No transactions found
        </p>
      )}
    </div>
  );
}
