import React from 'react'
import { useState, useEffect } from 'react';
import { axiosPost } from '../AxiosOperations';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

import { navLinks } from '../assets/data/HeaderData';
import { socialLinks, contactData } from '../assets/data/FooterData';
import { useNavigate } from "react-router-dom";
import Province from '../assets/data/SelectData';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '@fortawesome/fontawesome-free/css/all.css';



const Register = () => {

  const [errors, setErrors] = useState({});
  const navigetor = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: '',
    bloodgroup: 'Select',
    gender: 'Select',
    birthdate: '',
    weight: '',
    lastdonationdate: '',
    nic: '',
    zipcode: '',
    province: 'Select',
    district: 'Select',
    tandc: false

  });



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChnage = (e) => {

    const { value, name } = e.target;
    //console.log(value, name);
    setFormData({ ...formData, [name]: value });

  }

  const getDistrcts = (e) => {

    Province.map(pr => {
      if (pr.name === e.target.value) {
        setDistricts(pr.districts);
      }
    }
    )

  };


  const validateFormData = () => {

    const errors = {};

    if (!formData.fullname.trim()) {
      errors.fullname = "Full name required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.mobile) {
      errors.mobile = 'Mobile is required';
    }
    else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (formData.bloodgroup.trim() === "Select") {
      errors.bloodgroup = 'BloodGroup is required';
    }
    if (formData.gender.trim() === "Select") {
      errors.gender = 'Gender is required';
    }
    // if (!formData.birthdate.trim()) {
    //   errors.birthdate = 'Birthdate is required';
    // }
    if (!formData.birthdate.trim()) {
      errors.birthdate = 'Birthdate is required';
    } else {
      const today = new Date();
      const birthdate = new Date(formData.birthdate);
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }

      if (age < 18) {
        errors.birthdate = 'Age should be above 18';
      }
    }
    // if (!formData.weight.trim()) {
    //   errors.weight = 'Weight is required';
    // }
    if (!formData.weight.trim()) {
      errors.weight = 'Weight is required';
    } else if (parseFloat(formData.weight) <= 45) {
      errors.weight = 'Weight should be above 45Kg';
    }
    // if (!formData.lastdonationdate.trim()) {
    //   errors.lastdonationdate = 'Last Donation Date is required';
    // }
    if (!formData.nic.trim()) {
      errors.nic = 'NIC number is required';
    } else if (!/^[0-9]{9}[vV]$/.test(formData.nic) && !/^[0-9]{12}$/.test(formData.nic)) {
      errors.nic = 'NIC number must be 10 digits or 12 digits';
    }
    if (!formData.zipcode.trim()) {
      errors.zipcode = 'Zipcode is required';
    } else if (formData.zipcode.trim().length !== 5 || !/^\d+$/.test(formData.zipcode.trim())) {
      errors.zipcode = 'Zipcode must be 5 digits';
    }

    if (formData.province.trim() === "Select") {
      errors.province = 'Province is required';
    }
    if (formData.district.trim() === "Select") {
      errors.district = 'District is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const verifiDonor = async () => {
    try {

      if (validateFormData()) {

        await axiosPost('donor/register', formData);


        navigetor(`/register/otpsend?formdata=${encodeURIComponent(JSON.stringify(formData))}`);

      }
    } catch (error) {
      alert("Email alreday exists");
    }


  }



  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>



      <div className='ml-[150px] mt-[20px] mb-[10px] font-bold formheading'>Login Details</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-[50px] pr-[50px] md:pl-[150px] md:pr-[150px] mb-[20px] ">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}

          />
          {errors.fullname && <span className="text-red-500">{errors.fullname}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}

          />
          {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}


          />
          {
            formData.password ? (<i
              className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}

            ></i>) : (<></>)
          }


          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>
      </div>

      <div className='ml-[150px] mt-[20px] mb-[10px] font-bold formheading'>Donor Details</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-[50px] pr-[50px] md:pl-[150px] md:pr-[150px] mb-[20px] ">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Blood Group
          </label>
          <select name="bloodgroup" value={formData.bloodgroup} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
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
            Gender
          </label>
          <select name="gender" value={formData.gender} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
            <option value="Select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>

          </select>
          {errors.gender && <span className="text-red-500">{errors.gender}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Birth Date
          </label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.birthdate && <span className="text-red-500">{errors.birthdate}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Weight
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.weight && <span className="text-red-500">{errors.weight}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Last Donation Date
          </label>
          <input
            type="date"
            name="lastdonationdate"
            value={formData.lastdonationdate}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500  bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.lastdonationdate && <span className="text-red-500">{errors.lastdonationdate}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            NIC Number
          </label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100"
            required
            onChange={handleChnage}
          />
          {errors.nic && <span className="text-red-500">{errors.nic}</span>}
        </div>


      </div>
      <div className='ml-[150px] mt-[20px] mb-[10px] font-bold formheading '>Contact Details</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-[50px] pr-[50px] md:pl-[150px] md:pr-[150px] mb-[20px] ">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px] ">
            Zip Code
          </label>
          <input
            type="text"
            value={formData.zipcode}
            name="zipcode"
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-100 "
            required
            onChange={handleChnage}
          />
          {errors.zipcode && <span className="text-red-500">{errors.zipcode}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[5px]">
            Province
          </label>
          <select name="province" value={formData.province} onChange={(e) => {
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
          <select name="district" value={formData.district} onChange={handleChnage} className='w-full h-[40px] bg-slate-100'>
            <option value="Select">Select</option>
            {

              districts.map(dis =>
                <option value={dis}>{dis}</option>
              )

            }
          </select>
          {errors.district && <span className="text-red-500">{errors.district}</span>}
        </div>


      </div>
      <div className='flex ml-[150px] mb-[20px] gap-4'>
        <input
          type="checkbox"
          name='tandc'
          value={formData.tandc}
          onChange={handleChnage}
          data-required
        />
        <span>I Accept Terms & Conditions</span>
      </div>
      <div className='ml-[150px] mb-[25px]'>
        <Stack direction="row" spacing={2}>


          <Button style={{ backgroundColor: '#BC005A', border: '2px solid white', color: 'white' }} onClick={verifiDonor} >SUBMIT</Button>




        </Stack>
      </div>
      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default Register
