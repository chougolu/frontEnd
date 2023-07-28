import React, { useEffect, useState } from 'react'
import '../../css/Profile.css'
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../src/prrrr.png';
import { AiOutlineLock } from 'react-icons/ai';

export const Profile = () => {

  const editIconStyle = {
    fontSize: '27px',
    color: 'black',
    marginLeft: '10px',
    borderRadius: '50%',
    background: '#e0dedc',
    position: 'absolute',
    left: '380px',
    bottom: '-3px',
    padding: '5px',
    top: '215px',
    cursor: 'pointer'
  };

  const editIconPasswordStyle = {
    cursor: 'pointer',
    fontSize: '27px',
    color: 'red',
  };

  const navigate = useNavigate();

  const [arr, setArr] = useState([]);

  const token = localStorage.getItem('user_token');

  const config = {
    headers: { Authorization: token }
  };

  //Get profile data.
  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/auth/profile', config);
      setArr([res.data.combinedData]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  //For edit profile.
  const editProfile = () => {
    navigate('/profile-update');
  }

  // Reset password
  const ResetPassword = (id) => {
    navigate(`/reset-password/${id}`);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      {(!token) ?
        <>
          <h1 className='text-center mt-3 pb-5'>Unauthorized user.</h1>
        </>
        :
        <>
          {arr.map((item, index) => {
            return (
              <div class="profile-container" key={index} >
                <div class="profile-details">
                  {item.userData.profileImg === "" ?
                    (<img class="profile-image" src={defaultImg} alt='' />) :
                    (<img class="profile-image" src={`http://localhost:4000/${item.userData.profileImg}`} alt='' />)}
                  <div onClick={editProfile}>
                    <AiFillEdit style={editIconStyle} />
                  </div>
                  <h5 style={{fontWeight:"bold"}} className='text-center'>User Profile</h5>
                  <div class="bottom-section">
                    <div class="left-section">
                      <table>
                        <tr>
                          <th>
                            <div class="profile-field">
                              First Name  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userData.firstName} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Address line 1  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userAddressData.address_line_1} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Telephone  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="telephone" value={item.userData.telephone} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              City  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userAddressData.city} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Postal code  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="telephone" value={item.userAddressData.postal_code} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Reset Password  &nbsp; :&nbsp; &nbsp;
                              <div onClick={ResetPassword}>
                                <AiOutlineLock style={editIconPasswordStyle} />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </table>
                    </div>
                    <div class="right-section">
                      <table>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Last name  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userData.lastName} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Address line 2  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userAddressData.address_line_2} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Mobile  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="telephone" value={item.userAddressData.mobile} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Country  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="mobile" value={item.userAddressData.country} disabled />
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <div class="profile-field">
                              Email  &nbsp; :&nbsp; &nbsp;
                              <input type="tel" id="telephone" value={item.userData.email} disabled />
                            </div>
                          </th>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </>

      }
    </>
  )
}



