import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { axiosPost } from '../AxiosOperations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OtpSend = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const formdata = searchParams.get("formdata");


    var decodedFormData = JSON.parse(formdata);


    const [inputemail, setInputEmail] = useState(0);

    const navigetor = useNavigate();

    return (
        <div className='flex justify-center items-center h-screen bg-stone-100 '>

            <div className=' border-8 p-[75px]'>
                <div>

                    <center className='homepara text-[26px]'>Hi <span className='text-red-600 font-bold'>{decodedFormData.fullname}</span> </center>
                    <center className='homepara text-[16px]'>Enter Your Email  {decodedFormData.email[0]}{decodedFormData.email[1]}**** {decodedFormData.email.substring(decodedFormData.email.length - 15)} </center>

                </div>

                <div className='w-full h-[300px] bg-slate-200 mt-[25px] p-[75px] border-2'>
                    <center className='font-sans mb-[10px]'>Enter Email</center>
                    <center className='font-sans mb-[10px] '><input type='text' className='w-[250px]' onChange={} ></input></center>

                    <div>
                        <center >
                            <Button variant="contained" onClick={cheakOperations} endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </center>

                    </div>


                </div>

            </div>


        </div>
    )
}

export default OtpSend
