import React from 'react';
import {store} from '../../storeConfigure';
import {push} from 'react-router-redux';
import {MdEvent, MdLocationOn,MdAccountCircle,
    MdNotificationsActive, MdDirectionsWalk, MdAcUnit} from 'react-icons/lib/md';
import {FaSignIn, FaPencil, FaGift} from 'react-icons/lib/fa';

const models = [
    {
        title: "Chung",
        subModels: [
            {
                title: "Tổng quan",
                action: function() {
                    store.dispatch(push('/'));
                },
                icon: <MdAccountCircle/>
            },
            {
                title: "Sự kiện",
                action: function() {
                    store.dispatch(push('/events'));
                },
                icon: <MdEvent/>
            },
            {
                title: "Nhiệm vụ",
                action: function() {
                    store.dispatch(push('/tasks'));
                },
                icon: <MdDirectionsWalk/>
            },
            {
                title: "Vật phẩm",
                action: function() {
                    store.dispatch(push('/items'));
                },
                icon: <MdAcUnit/>
            },
            {
                title: "Địa điểm",
                action: function() {
                    store.dispatch(push('/locations'));
                },
                icon: <MdLocationOn/>
            },
            {
                title: "Phần thưởng",
                action: function() {
                    store.dispatch(push('/awards'));
                },
                icon: <FaGift/>
            },
            {
                title: "Thông báo",
                action: function() {
                    store.dispatch(push('/notifications'));
                },
                icon: <MdNotificationsActive/>
            },
        ],
    },
    {
        title: "Debug",
        subModels: [
            {
                title: "Đăng nhập",
                action: function() {
                    store.dispatch(push('/'));
                },
                icon: <FaSignIn/>
            },
            {
                title: "Cập nhật",
                action: function() {
                    store.dispatch(push('/'));
                },
                icon: <FaPencil/>
            },
        ]
    }
];

export default models;