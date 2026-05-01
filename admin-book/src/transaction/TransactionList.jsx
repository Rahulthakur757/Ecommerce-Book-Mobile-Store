import axios from 'axios';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

function TransactionList() {
    let [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios({
            url: apiUrl + '/admin/transactions',
            method: 'get'
        }).then((result) => {
            setTransactions(result.data.data);

        }).catch((err) => {
            alert(err);
        })
    }, [])
    return (
        <>
           <table className='table'>
            <thead>
                <tr>
                    <th>Transaction Id</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Amount Paid</th>
                    <th>Producrs</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions.map((transaction)=>
                        <tr>
                            <td>{transaction.transactionId.substring(0, 15) + "..."}</td>
                            <td>{transaction.email}</td>
                            <td>{transaction.mobileNo}</td>
                            <td>{transaction.totalPrice}</td>
                            <td>{
                                transaction.products.map(product => product.bookTitle?product.bookTitle:product.name).join(", ")
                                }</td>
                            <td className={transaction.status==="Pending"? "text-danger ":transaction.status==="Completed"? "text-success":""}>{transaction.status}</td>
                        </tr>
                    )
                }
            </tbody>
           </table>
        </>
    )
}
export default TransactionList;