// hooks/useAppointments.js
import {useState, useEffect, useCallback} from 'react';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
import {Appointment} from '../types';
import {Alert} from 'react-native';
const useAppointments = (providerId: number, showPastAppointments: boolean) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Refresh key for manual refresh

  const refreshAppointments = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1); // This will trigger the useEffect below
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace with your actual endpoint and add your desired request configuration
        const endpoint = showPastAppointments
          ? endpoints.PROVIDER_BOOKINGS
          : endpoints.PROVIDER_PENDING_BOOKINGS;
        const response = await axiosPrivate.post(endpoint, {
          provider_id: providerId,
        });
        // console.log(response, 'appointments');

        setAppointments(response?.data?.bookings);
      } catch (err: Error | any) {
        console.log(err, 'error from appointments');
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (providerId) {
      // Ensure providerId is available before fetching
      fetchAppointments();
    }
  }, [providerId, showPastAppointments, refreshKey]);
  const cancelAppointment = async (id: number) => {
    try {
      //   const response =
      axiosPrivate.delete(`${endpoints.CANCEL_BOOKING}/${id}`);
      Alert.alert('Information', 'Successfully Cancelled Appointment!');
      //   console.log(response, 'cancel appointment response');
      return true;
    } catch (error) {
      console.log(error, 'error in cancel Appointment');
      Alert.alert('Error', 'Error in cancelling appointment');
      return false;
    }
  };
  const completeAppointment = async (id: number) => {
    try {
      //   const response =
      axiosPrivate.put(`${endpoints.COMPLETE_BOOKING}/${id}`);
      Alert.alert('Information', 'Successfully Completed Appointment!');
      //   console.log(response, 'cancel appointment response');
      return true;
    } catch (error) {
      console.log(error, 'error in complete Appointment');
      Alert.alert('Error', 'Error in completing appointment');
      return false;
    }
  };
  return {
    appointments,
    isLoading,
    error,
    refreshAppointments,
    cancelAppointment,
    completeAppointment,
  };
};

export default useAppointments;
