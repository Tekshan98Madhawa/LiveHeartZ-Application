import React from 'react'

import Header from '../../components/common/Header';
import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';
import Footer from '../../components/common/Footer';
import bloodnews from '../../assets/images/News/bloodnews.webp';


const News = () => {
  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>
      <div className='m-[50px]'>
        <div className='   p-[20px] '>
          <div className='flex justify-evenly mt-[10px]  p-[20px] '>
            <h1 className='text-black-500 text-[40px] font-bold h1Text'>Donating Blood</h1>
          </div>
          <div className='ps-[20px]'>
            <h4 className='text-black-500 text-[30px] font-bold h4Text'>Advantages of Blood Donation</h4>
          </div>
        </div>

        <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 p-[10px]'>
          <div className='w-full mb-10 ms-10 p-10 bg-white rounded-lg shadow-md'>
            <img src={bloodnews} alt="Blood News" className="mx-auto w-full lg:w-5/6 h-auto md:h-96" />
          </div>

          <div className='m-4 p-4 w-full bg-white rounded-lg shadow-md flex flex-col justify-center'>
            <div className='mt-2 p-2'>
              <h6 className='text-pink-600 text-xl font-bold h6Text'>Donating blood can help people with many health conditions, such as those who:</h6>
            </div>
            <div>
              <ul className='text-base p-2 md:list-disc '>
                <li>have sickle cell disease or another illness that affects the blood</li>
                <li>are undergoing cancer treatment</li>
                <li>are undergoing surgery, such as cardiovascular or orthopedic surgery</li>
                <li>have an inherited blood disorder</li>
                <li>are undergoing a transplant</li>
                <li>need treatments involving plasma or other blood products</li>
                <li>have internal or external bleeding due to an injury</li>
              </ul>
            </div>
          </div>

        </div>

        <div className='m-4 p-4 mt-2 mb-1 pt-1 pb-1 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text mt-2'>Benefits for the donor</h6>
          <p className='text-base mt-2'>
            For many people, blood donation offers many health benefits with few risks. The strict regulation of blood banks means that a donor can give their blood or plasma safely in the United States. Donated blood can save the lives of people in need. However, according to some medical professionals, it may also benefit the donor. The sections below will look at some benefits for the donor in more detail.
          </p>
        </div>


        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text'>Identifying adverse health effects</h6>
          <p className='text-base mt-2'>
            Each person who donates blood completes a simple physical examination and blood test before giving blood. These are not in-depth tests, but they may help identify unknown health concerns, such as anemia or high or low blood pressure.<br />
            The test will check the person’s:
          </p>
          <ul className='text-base p-2 list-disc ps-4'>
            <li>blood pressure </li>
            <li>body temperature </li>
            <li>heart rate </li>
            <li>hemoglobin, or iron, levels</li>
          </ul>
          <p className='text-base'>
            If the test reveals a problem, the person will not be able to donate blood. However, the results could be a first step toward seeking treatment.
          </p>
        </div>


        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text'>Contributing to the community</h6>
          <p className='text-base mt-2'>
            Donating one unit of blood may save the lives of up to three people, according to the American Red Cross. Blood donors provide a vital service to the community. Making a difference in the lives of others can boost a donor’s sense of well-being.
          </p>
        </div>


        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text'>Weight management</h6>
          <p className='text-base mt-2'>
            There are claims that giving blood burns 650 calories. However, there does not appear to be any scientific evidence to prove this. Any benefits of this calorie loss will be short-term and will not help a person lose weight. However, a 2012 study suggests that because blood donation centers need to weigh people before they give blood, this could help identify people with obesity and offer them help to manage their weight and any related health problems. It can also identify people with a low weight, who may also benefit from counseling and advice.
          </p>
        </div>


        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text'>Cardiovascular health</h6>
          <p className='text-base mt-2'>
            In 2019, researchers looked at the data of nearly 160,000 females who had donated blood for 10 years or more. They concluded that blood donation offers a “protective effect of long-term, high-frequency blood donation against cardiovascular disease.”
          </p>
        </div>

        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h6 className='text-pink-600 text-lg font-bold h6Text'>Overall health</h6>
          <p className='text-base mt-2'>
            In 2007, researchers looked at the data of over 1 million blood donors. Among the participants, there was a 30% lower chance of dying from any cause and a 4% lower chance of developing cancer. The authors concluded that “blood donors enjoy better than average health.” <br />
            A 2015 study took a fresh look at the same data. After adjusting for other factors, the researchers concluded that for each annual donation, a person’s risk of dying from any cause fell by 7.5%, on average. <br />
            This may indicate that donating blood is good for a person’s overall health, but the researchers could not confirm this. However, they did point out that donating blood seems unlikely to shorten a person’s life span.
          </p>
        </div>


        <div className='m-4 p-4 mt-2 pt-2 bg-white rounded-lg shadow-md'>
          <h3 className='text-black-500 text-2xl font-bold h4Text'>Disadvantages</h3>
          <p className='text-base mt-2'>
            Donating blood is safe, as long as the center follows the standard guidelines.<br /> The U.S. and many other countries have strict regulations to ensure safety. The FDA and American Association of Blood Banks (AABB) monitor blood banks for this purpose.<br /> Safety precautions they take include:
          </p>
          <ul className='text-base p-2 list-disc ps-4'>
            <li>screening donors for existing health conditions</li>
            <li>using new needles for each donation</li>
            <li>having professional staff on hand</li>
            <li>providing monitoring and refreshments to ensure a safe recovery</li>
          </ul>
          <p className='text-base'>
            However, there are some potential disadvantages of donating blood.
          </p>
        </div>


      </div>

      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default News
