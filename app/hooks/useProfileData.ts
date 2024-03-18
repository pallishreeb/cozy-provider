// useProfileData.js

import {useState, useEffect} from 'react';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
export interface PersonalProfileData {
  id?: number;
  name: string;
  email?: string;
  profile_pic: string | null;
  mobile_number: string | null;
  address: string | null;
  zipcode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
}

export interface ProfessionalProfileData {
  experience: number | null;
  rate: number | null;
  specialization: string | null;
  portfolio: string | null;
  email_verified_at?: string | null;
  category_id: number | null;
  service_id: number | null;
  business_hours_enabled: number | null;
  skills: string | null;
  working_hours?: null | any;
}

const useProfileData = () => {
  const [personalData, setPersonalData] = useState<PersonalProfileData | null>(
    null,
  );
  const [professionalData, setProfessionalData] =
    useState<ProfessionalProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(`${endpoints.GET_PROFILE}`);
      const data = response?.data?.provider;
      console.log(data, 'provider ');

      setPersonalData({
        id: data.id,
        name: data.name,
        email: data.email,
        profile_pic: data?.profile_pic,
        mobile_number: data?.mobile_number,
        address: data?.address,
        zipcode: data?.zipcode,
        city: data?.city,
        state: data?.state,
        country: data?.country,
      });
      setProfessionalData({
        experience: data?.experience,
        rate: data?.rate,
        specialization: data?.specialization,
        portfolio: data?.portfolio,
        email_verified_at: data?.email_verified_at,
        category_id: data?.category_id,
        service_id: data?.service_id,
        business_hours_enabled: data?.business_hours_enabled,
        skills: data?.skills,
        working_hours: data?.working_hours,
      });

      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.log(err, 'error from load profile');

      setError('Failed to fetch profile data');
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const updateProfileData = async (updatedData: any, isPersonal: boolean) => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (
          key !== 'profile_pic' &&
          key !== 'portfolio' &&
          updatedData[key] !== null
        ) {
          formData.append(key, updatedData[key]);
        }
      });
      if (isPersonal && updatedData?.profile_pic) {
        formData.append('profile_pic', {
          uri: updatedData.profile_pic.uri,
          type: updatedData.profile_pic.type || 'image/jpeg', // Fallback MIME type
          name: updatedData?.profile_pic.name || 'profile_pic.jpg', // Fallback file name
        });
        // Directly append the portfolio object from data if it's a professional profile update and not null
      } else if (updatedData.portfolio) {
        // Directly append the profile_pic object from data for personal profile update, skipping if null
        formData.append('portfolio', {
          uri: updatedData.portfolio.uri,
          type: updatedData.portfolio.type || 'application/pdf', // Fallback MIME type
          name: updatedData.portfolio.name || 'portfolio.pdf', // Fallback file name
        });
      }
      // console.log(formData, 'formdata');

      const url = isPersonal
        ? endpoints.UPDATE_PROFILE
        : endpoints.UPDATE_BUSINESS_PROFILE;
      const response = await axiosPrivate.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other necessary headers here (e.g., authorization)
        },
      });
      fetchProfileData();
      // console.log(response);

      return true;
    } catch (error) {
      console.error(error);
      setError('Failed to update profile data');
      return false; // Indicate failure
    }
  };

  return {personalData, professionalData, isLoading, error, updateProfileData};
};

export default useProfileData;
