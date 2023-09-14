import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CTable,
  CTableCaption,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react';

const ViewAllPost = () => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/fetchallnotes`);
        if (response.status !== 200) {
          throw new Error('User not found');
        }
        const data = response.data.data;
        setPostList(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  // Check if postList is an array before mapping over it
  if (!Array.isArray(postList)) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <CTable responsive striped caption="top">
        <CTableCaption style={{ fontWeight: 'bold', fontSize: '40px' }}>List of User</CTableCaption>
        <CTableHead>
          <CTableRow>
            <CTableDataCell>Name</CTableDataCell>
            <CTableDataCell>Email</CTableDataCell>
            <CTableDataCell>Date</CTableDataCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {postList.map((post, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{post.name}</CTableDataCell>
              <CTableDataCell>{post.email}</CTableDataCell>
              <CTableDataCell style={{ fontWeight: 'bolder' }}>{post.date}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ViewAllPost;
