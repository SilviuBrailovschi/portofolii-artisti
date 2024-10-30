import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import {Card, CardBody, Spinner, Row, Col, Button, CardHeader, FormGroup, Label, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PortfolioItem from '../PortofolioItem/PortfolioItem';
import './PortfolioGrid.css';
import AddModal from "../AddModal/AddModal";

const PortfolioGrid = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectedItem = (id) => {
        setSelectedItem(id)
    }

    const fetchPortfolioItems = async () => {
        setLoading(true);
        setError(null);
             axios.get(`${apiUrl}/portfolio-item`, {
                params: { status: statusFilter }
            }).then(response => {
                 setPortfolioItems(response.data);
                 setLoading(false);
             }).catch (error => {
            console.error("Error fetching portfolio items", error);
            setError('Error fetching portfolio items. Please try again later.');
            setLoading(false);
        });


    }

    const handleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    }
    const handleAddPortfolio = (data) => {
        setLoading(true);
        axios.post(`${apiUrl}/portfolio-item`, data ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            fetchPortfolioItems().then();
            handleAddModal();
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.error('Error:', error)
        })
    }

    const apiUrl = API_BASE_URL;

    useEffect(() => {
        fetchPortfolioItems().then();
    }, [statusFilter]);


    return (
            <Card style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: "url('/birds.jpg')",
                backgroundSize: 'cover',
                minHeight: '100%',
                maxWidth: '80%',
                minWidth: '80%'
            }}>
                <CardHeader
                    style={{
                        padding: '0',
                        borderBottom: 'none',
                        backgroundColor: 'transparent'
                    }}
                    >
                    <AddModal isAddModalOpen={isAddModalOpen} handleData={handleAddPortfolio} toggle={handleAddModal} loading={loading}/>
                    <Row className="d-flex justify-content-end align-items-center" style={{ margin: '2rem 0', minWidth: '100%'}}>
                        <Col>
                            <div className="filter-wrapper">
                                <Button className="add-btn " color="success"  onClick={handleAddModal}>
                                    <FontAwesomeIcon style={{transform: 'scale(1.3)'}} icon={faPlus} />
                                </Button>
                                <div className="desktop-filter">
                                    <Button className={`filter-btn ${statusFilter === 'all' && 'btn-selected'}`} color="primary" onClick={() => setStatusFilter('all')}>Toate</Button>
                                    <Button className={`filter-btn ${statusFilter === 'active' && 'btn-selected'}`}  color="primary" onClick={() => setStatusFilter('active')}>Active</Button>
                                    <Button className={`filter-btn ${statusFilter === 'inactive' && 'btn-selected'}`} color="primary" onClick={() => setStatusFilter('inactive')}>Inactive</Button>
                                </div>
                                <div className="mobile-filter">
                                        <Input
                                            id="filter-select"
                                            name="select"
                                            type="select"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value={'all'}>Toate</option>
                                            <option value={'active'}>Active</option>
                                            <option value={'inactive'}>Inactive</option>
                                        </Input>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                    {loading ?
                        <Spinner color="primary"
                                 style={{
                                     height: '5rem',
                                     width: '5rem',
                                     color: 'lightgray!important',
                                     fontSize: 'xx-large'
                        }}>
                            Loading...
                        </Spinner> :
                        <Row className="justify-content-center align-items-center" >
                            <Col sm={8}  className="d-flex flex-column align-items-center ">
                                <div className="portfolio-grid">
                                    {!portfolioItems?.length > 0 && !loading &&
                                        <b style={{
                                            color: '#fcfbf3',
                                            fontSize: '18px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            padding: '20px',
                                            borderRadius: '10px',
                                            borderLeft: '2px solid #003d59',
                                            margin: '20px 0',
                                            paddingLeft: '10px',
                                            fontStyle: 'italic',
                                            }}>
                                        {`Ne pare rau, nu putem gasi portofolii artistice ${statusFilter === 'active' ? 'active': statusFilter === 'inactive' ? 'inactive' : ''} in acest moment.`}
                                        </b>
                                    }
                                    {portfolioItems?.map(item => {
                                        return(
                                            <PortfolioItem
                                                key={item._id}
                                                id={item._id}
                                                item={item}
                                                selectedItem={selectedItem}
                                                onCancel={handleSelectedItem}
                                                getItems={fetchPortfolioItems}
                                                loading={loading}
                                            />
                                        )})
                                    }
                                </div>
                            </Col>
                        </Row>
                    }
                </CardBody>

            </Card>
    );
};

export default PortfolioGrid;
