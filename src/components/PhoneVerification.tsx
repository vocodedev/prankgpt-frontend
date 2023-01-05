import React from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

// const isCallerIdVerified = async (phoneNumber: string): Promise<boolean> => {
//     const response = await fetch(`https://${BACKEND_URL}/caller_id_verified`, {
//         method: 'POST',
//         body: JSON.stringify({
//             phone_number: phoneNumber
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const data = await response.json();
//     return data.verified;
// }

// const sendCallerIdValidation = async (phoneNumber: string): Promise<string> => {
//     const response = fetch(`https://${BACKEND_URL}/create_caller_id`, {
//         method: 'POST',
//         body: JSON.stringify({
//             phone_number: phoneNumber
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => data.code);
// }

// const sendVerificationCode = (phoneNumber: string): Promise<boolean> => {
//     return fetch(`https://${BACKEND_URL}/send_verification_code`, {
//         method: 'POST',
//         body: JSON.stringify({
//             phone_number: phoneNumber
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => data.success ? true : false);
// }

// const verifyPhoneNumber = (phoneNumber: string, code: string): Promise<boolean> => {
//     return fetch(`https://${BACKEND_URL}/verify_phone_number`, {
//         method: 'POST',
//         body: JSON.stringify({
//             phone_number: phoneNumber,
//             code
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => data.status ? true : false);
// }

const PhoneVerification = () => {
    const [searchParams] = useSearchParams();
    const phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) return (<ErrorPage />);

    // const [verificationCode, setVerificationCode] = React.useState("");
    // const [isCallerIdVerification, setIsCallerIdVerification] = React.useState(false);
    // const [isNormalVerification, setIsNormalVerification] = React.useState(false);
    
    // React.useEffect(() => {
    //     isCallerIdVerified(phoneNumber)
    //     .then(verified => {
    //         if (verified) {
    //             sendVerificationCode(phoneNumber).resolve();
    //             setIsNormalVerification(true);
    //         } else {
    //             sendCallerIdValidation(phoneNumber)
    //             .then(code => {
    //             setIsCallerIdVerification(true);
    //             setVerificationCode(code); 
    //             })
    //         }
    //     })
    // }, [])
    return (
        <div>
        <p>Phone Number: {phoneNumber}</p>
        </div>
    );
};

export default PhoneVerification;