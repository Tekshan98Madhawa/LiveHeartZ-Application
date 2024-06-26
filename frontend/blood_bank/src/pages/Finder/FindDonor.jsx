import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';
import Chat from '../../popups/Chat';
import { axiosGet, axiosPost } from '../../AxiosOperations';
import { useLocation } from "react-router-dom";
import testImg from '/user.png';
import { Link } from 'react-router-dom';
import Spinner1 from '../../pages/spinners/Spinner1';
import Report from '../Donar/popup/Report.jsx';
import Province from '../../assets/data/SelectData';




const FindDonor = () => {

  const [verifyuser, setVerifyUser] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const verify = searchParams.get("verify");
  const requesterData = searchParams.get("data");
  var decodedFormData = JSON.parse(requesterData);



  useEffect(() => {

    if (verify == "true") {
      setVerifyUser(true);
    }


    return () => {
      // Cleanup code goes here
    };
  }, []);


  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [donorList, setDonorList] = useState([]);
  const [chatVisible, setChatVisible] = useState(false);
  const [available, setAvailable] = useState(false);



  const [formData, setFormData] = useState({
    bloodgroup: 'Select',
    province: 'Select',
    district: 'Select',
  });

  const bloodbankCheck = () => {
    try {
      axiosGet(`home/bloodbank/availability/${formData.bloodgroup}`).then((data) => {
        if (formData.district == "Vavuniya" & data.data.available & verifyuser) {
          setAvailable(true);
        } else {
          setAvailable(false);
        }

      });


    } catch (error) {

    }

  }

  const handleChnage = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const getDistrcts = (e) => {

    Province.map(pr => {
      if (pr.name === e.target.value) {
        setDistricts(pr.districts);
      }
    }
    )

  };

  const sendMail = async (id) => {

    try {
      await axiosPost('donor/sendemail', { data: decodedFormData, receiverId: id }).then(alert("Email Send Succsessfully"));


    } catch (error) {
      console.log(error)
    }

  };


  const validateFormData = () => {
    const errors = {};
    if (formData.bloodgroup.trim() === "Select") {
      errors.bloodgroup = 'BloodGroup is required';
    }
    if (formData.province.trim() === "Select") {
      errors.province = 'Province is required';
    }
    if (formData.district.trim() === "Select") {
      errors.district = 'District is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getDonorsList = async () => {
    if (validateFormData()) {
      await axiosGet(`donor/finddonor/${formData.bloodgroup}/${formData.province}/${formData.district}`)
        .then(data => {
          bloodbankCheck();
          setDonorList(data.data);
        }).then(setInterval(() => {
          setLoading(false);
        }, 500))
        .then(() => {
          // Show chat after fetching donor list
          setChatVisible(true);
        });
    }
  };

  const openReportBox = () => {

  }


  return (
    <div>
      <Header navLinks={navLinks} />
      <div className='flex flex-col'>
        <form>
          <div className='flex sm:min-w-500 justify-center pt-[20px] font-bold '>
            Search Blood
          </div>
          <div className='grid lg:grid-cols-3 gap-4  ml-[150px] mr-[150px] p-[25px] '>
            <div>
              <label >Blood Group</label>
              <select name="bloodgroup" onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                <option value='A-'>A-</option>
                <option value="A+">A+</option>
                <option value="AB-">AB-</option>
                <option value="AB+">AB+</option>
                <option value="B-">B-</option>
                <option value="B+">B+</option>
                <option value="O-">O-</option>
                <option value="O+">O+</option>
              </select>
              {errors.bloodgroup && <span className="text-red-500">{errors.bloodgroup}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-[5px]">
                Province
              </label>
              <select name="province" onChange={(e) => {
                handleChnage(e); getDistrcts(e);
              }} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                {
                  Province.map((province) =>
                    <option value={province.name}>{province.name}</option>
                  )
                }
              </select>
              {errors.province && <span className="text-red-500">{errors.province}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-[5px]">
                District
              </label>
              <select name="district" onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
                <option value="Select">Select</option>
                {

                  districts.map(dis =>
                    <option value={dis}>{dis}</option>
                  )

                }
              </select>
              {errors.district && <span className="text-red-500">{errors.district}</span>}
            </div>
            <div className='flex'>
              <Stack direction="row" spacing={2}>

                <Button variant="outlined" style={{ color: '#BC005A', border: '2px solid #BC005A' }} onClick={getDonorsList} >FIND DONARS</Button>
              </Stack>
            </div>
          </div>
        </form>
      </div>


      {
        donorList.length && available && (
          <center className='text-[26px] homepara text-red-400 underline'>
            The blood is available at our blood bank. You can pick it up.
            <a href="https://www.google.com/maps/place/University+of+Vavuniya/@8.7559478,80.4106635,19.14z/data=!4m7!3m6!1s0x3afc3f3a01dd2393:0xe31eaf7e0d5bcecd!4b1!8m2!3d8.7586746!4d80.4106966!16s%2Fg%2F11my146w8q?entry=ttu" target="_blank" rel="noopener noreferrer">
              <span style={{ color: 'blue', textDecoration: 'none' }}> Click here for location. </span>
            </a>
            <br></br>
            or contact the donors below.
          </center>
        )
      }



      {donorList.length !== 0 ? (
        loading ? (<Spinner1 />) : (<div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4'>
          {donorList.map(item => (
            <div className='flex justify-center p-[20px]' key={item._id}>
              <div className='xl:w-[500px] lg:w-[500px] md:w-[500px] h-[300px] border-2 bg-slate-200  '>
                <div className='flex justify-around  '>
                  <div className='w-[200px] h-[200px]  mt-[20px]  '><span><img src={testImg} alt="" /></span></div>
                  <div className='w-[200px] h-[200px] mt-[40px]'>
                    <div className='flex flex-col'>
                      <span key='1' className='cardData text-[24px] font-bold mb-3'>{item.fullname}</span>
                      <div className='flex flex-col'>
                        <div className='flex items-center mb-3'>
                          <i className="fa-solid fas fa-tint"> :</i>
                          <span key='2' className='cardData ml-2'>Blood Group: {item.bloodgroup}</span>
                        </div>
                        <div className='flex items-center mb-3'>
                          <i className="fa-solid fa-location-dot"></i>
                          <span key='3' className='cardData ml-2'>Address: {item.district}, {item.province}.</span>
                        </div>
                        <div className='flex items-center mb-3'>
                          <i className="fa-regular fa-calendar"></i>
                          <span key='5' className='cardData ml-2'>Last Donation: {item.lastdonationdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  verifyuser ? (<div className='grid grid-cols-2'>
                    <div>
                      {chatVisible && <Chat name={item.fullname} id={item._id} />}
                    </div>
                    <div>
                      {chatVisible && <Button style={{ backgroundColor: '#BC005A', border: '2px solid white', color: 'white' }} onClick={() => sendMail(item._id)} className='w-full'>
                        Request Email
                      </Button>}

                    </div>
                  </div>) : (
                    <div className='flex justify-between '>
                      <Link className='text-[16px] homepara text-green-800 font-bold w-full flex justify-center ' style={{ borderRadius: 4, alignItems: 'center', color: '#BC005A', border: '2px solid #BC005A' }} to={'/requestblood'}>SEND REQUEST</Link>
                      <Report name={item.fullname} email={item.email} />

                    </div>)
                }

              </div>
            </div>
          ))}
        </div>)

      ) : (
        <div className='flex justify-center w-full/2 h-[500px] items-center bg-slate-200 m-[20px] homepara'>There is no available donor / All fields are not selected</div>
      )}

      <Footer navLinks1={socialLinks} navLinks2={contactData} />
    </div>
  );
}

export default FindDonor;
