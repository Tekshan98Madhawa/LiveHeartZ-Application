import { Button, Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';
import { axiosGet } from '../../AxiosOperations';
import Spinner1 from '../../pages/spinners/Spinner1';
import { WarningOutlined } from '@ant-design/icons';

const Report = () => {
    const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
}

export default Report