import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useEffect } from 'react';
import { axiosPost } from '../../../AxiosOperations.jsx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Report(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    let [formData, setFormData] = useState({
        email: props.email,
        name: props.name,
        message: '',
        subject: '',
        contactname: ''

    });

    const validateFormData = () => {

        const errors = {};

        if (!formData.message.trim()) {
            errors.fullname = "Please enter message";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleChnage = (e) => {

        const { value, name } = e.target;
        //console.log(value, name);
        setFormData({ ...formData, [name]: value });
    }