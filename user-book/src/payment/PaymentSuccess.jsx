import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
function PaymentSuccess() {

    let [showDiv, setShowDiv] = useState(false);
    let [transaction, setTransaction] = useState(null);

    useEffect(()=>{
        let transactionId = localStorage.getItem("transactionId");
        axios({
            url: apiUrl + '/update/transaction/'+ transactionId,
            method: 'put'
        }).then((result)=>{
            if(result.data.success){
                setTransaction(result.data.data)
                setShowDiv(true);
            }
        }).catch((err)=>{
            alert(err);
            console.log(err)
        })

    },[])
    return(
        <>
        {
            showDiv && <div style={{margin:'20px'}}>
                {  transaction ? transaction.transactionId:'' }
                <br /><br />
                {transaction ? transaction.created_at: ''}
                <br /><br />
                {transaction ? transaction.status: ''}
            </div>
        }
       
        </>
    )
}
export default PaymentSuccess;