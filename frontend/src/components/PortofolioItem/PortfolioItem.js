import React, { useState } from 'react';
import './PortfolioItem.css';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faRectangleXmark, faTrashCan, faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { encode } from 'base64-arraybuffer';
import EditModal from "../EditModal/EditModal";

const PortfolioItem = ({ id, item, onCancel, selectedItem, getItems }) => {
    const { data, type } = item?.image_data;
    const base64String = encode(new Uint8Array(data));
    const apiUrl = API_BASE_URL;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const newImageUrl = `data:${type};base64,${base64String}`;

    const handleEditClick = () => {
        setIsEditModalOpen(prev => !prev);
    };

    const handleData = async (data) => {
        setLoading(true);
        axios.put(`${apiUrl}/portfolio-item/${item._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(resp => {
            handleEditClick();
            getItems();
            onCancel(null);
            setLoading(false)
        }). catch (error => {
            console.error('Error updating item', error);
            setLoading(false)
        });
    };



    const handleDeleteClick = async () => {
        try {
            const resp = await axios.delete(`${apiUrl}/portfolio-item/${item._id}`);
            if (resp?.status === 200) {
                getItems();
            }
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onCancel(item._id);
    };
    const handleCancel = (e) => {
        e.stopPropagation();
        onCancel(null)
    }

    const getValidUrl = (url) => {
        if (!url) return '#';
        return url.startsWith('http') ? url : `https://${url}`;
    };

    return (
        <div
            className={`portfolio-item ${selectedItem === item._id ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <EditModal
                isEditModalOpen={isEditModalOpen}
                toggle={() => setIsEditModalOpen(!isEditModalOpen)}
                handleData={handleData}
                itemData={item}
                loading={loading}
            />
            <div className="image-container">
                <img
                    style={{
                        objectFit: 'cover',
                        aspectRatio: '3/2'
                    }}
                    className="port-item"
                    src={newImageUrl}
                    alt={item.title}
                />
            </div>
            <h3 className="port-item">{item?.title}</h3>
            <p className="port-item description">{item?.description}</p>
            <a href={getValidUrl(item?.client_site_url)}
               target="_blank"
               rel="noopener noreferrer"
               onClick={(event) =>  event.stopPropagation()}
               style={{ marginTop: 'auto',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   gap: '.5rem'}}
            >
                <FontAwesomeIcon icon={faUpRightFromSquare} /> Visit this artist's website
            </a>
            {selectedItem === item._id && (
                <>
                    <hr />
                    <div className="portfolio-item-actions">
                        <Button color="primary" className="btn-sm" style={{minWidth: '59px'}} onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button color="danger" className=" btn-sm" style={{minWidth: '59px'}} onClick={handleDeleteClick}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                        <Button color="secondary" className=" btn-sm" style={{minWidth: '59px'}} onClick={handleCancel}>
                            <FontAwesomeIcon icon={faRectangleXmark} />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PortfolioItem;