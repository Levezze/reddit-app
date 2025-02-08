import React, { useEffect } from 'react';
import LogoutButton from '../../components/auth/AuthButton';
import { useGetProfileDataQuery } from '../../store/middleware/profileAPI';
import { setProfile } from '../../store/slices/profileSlice';
import '../../../styles/ProfilePage.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import User from './User/User';
import DarkLightButton from './DarkLightButton';
import { setPage } from '../../store/slices/pageSlice';


const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const pageView = useSelector((state: RootState) => state.view.viewSize);
  const profile = useSelector((state: RootState) => state.profile)
  const { data, isLoading } = useGetProfileDataQuery(undefined, 
    { skip: !!profile.name });
  
  useEffect(()=>{
    dispatch(setPage('account'));
  },[dispatch]);


  useEffect(()=> {
    if (data && profile.name !== data.name) {
    dispatch(setProfile({
      name: data.name, 
      icon_img: data.icon_img, 
      total_karma: data. total_karma 
    }))};
  }, [data, profile.name, dispatch])

  return (
    <>
      <div className='profile-top'>
        <h1>Reddit Profile</h1>
      </div>
      <div className={`profile-layout ${pageView === 2 ? 'mobile' : ''}`}>
        <div className="profile-container">
          {isLoading ? <p>Loading profile...</p> :
          <User />}
        </div>
        <div className={`profile-buttons ${pageView === 2 ? 'mobile' : ''}`}>
          <LogoutButton />
          <DarkLightButton />
        </div>
      </div>
    </>
  )
};

export default ProfilePage;