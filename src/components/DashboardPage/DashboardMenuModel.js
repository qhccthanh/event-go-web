import React from 'react';
import {store} from '../../storeConfigure';
import {push} from 'react-router-redux';
import {getSupplier} from '../../reducer/supplier/action';
import {signIn} from '../../reducer/authentication/action';
import {MdEvent, MdLocationOn,MdAccountCircle,
    MdNotificationsActive, MdAcUnit} from 'react-icons/lib/md';
import {FaSignIn, FaPencil, FaImage} from 'react-icons/lib/fa';
import styles from '../stylesScript';

const models = [
    {
        title: "Chung",
        subModels: [
            {
                title: "Tổng quan",
                action: function() {
                    store.dispatch(getSupplier());
                    store.dispatch(push('/'));
                },
                icon: <MdAccountCircle size={styles.leftIconButton.size}/>
            },
            {
                title: "Sự kiện",
                action: function() {
                    store.dispatch(push('/events'));
                },
                icon: <MdEvent  size={styles.leftIconButton.size}/>
            },
            // {
            //     title: "Nhiệm vụ",
            //     action: function() {
            //         store.dispatch(push('/tasks'));
            //     },
            //     icon: <MdDirectionsWalk  size={styles.leftIconButton.size}/>
            // },
            {
                title: "Vật phẩm",
                action: function() {
                    store.dispatch(push('/items'));
                },
                icon: <MdAcUnit  size={styles.leftIconButton.size}/>
            },
            {
                title: "Địa điểm",
                action: function() {
                    store.dispatch(push('/locations'));
                },
                icon: <MdLocationOn  size={styles.leftIconButton.size}/>
            },
            // {
            //     title: "Phần thưởng",
            //     action: function() {
            //         store.dispatch(push('/awards'));
            //     },
            //     icon: <FaGift  size={styles.leftIconButton.size}/>
            // },
            {
                title: "Hình ảnh",
                action: function() {
                    store.dispatch(push('/resources'));
                },
                icon: <FaImage  size={styles.leftIconButton.size}/>
            },
            {
                title: "Thông báo",
                action: function() {
                    store.dispatch(push('/notifications'));
                },
                icon: <MdNotificationsActive  size={styles.leftIconButton.size}/>
            },
        ],
    },
    {
        title: "Debug",
        subModels: [
            {
                title: "Đăng nhập",
                action: function() {
                    store.dispatch(signIn('supplier_1', 'supplier_1'));
                },
                icon: <FaSignIn  size={styles.leftIconButton.size}/>
            },
            {
                title: "Cập nhật",
                action: function() {
                    store.dispatch(push('/'));
                },
                icon: <FaPencil  size={styles.leftIconButton.size}/>
            },
        ]
    }
];

export default models;