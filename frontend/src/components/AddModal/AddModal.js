import React, {useEffect, useState, useRef} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Spinner, FormFeedback } from 'reactstrap';

const AddModal = ({ isAddModalOpen, handleData, toggle, loading }) => {

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [isActive, setIsActive] = useState(false);

    const [errors, setErrors] = useState({
        image: '',
        title: '',
        description: '',
        url: '',
    });

    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleStatusChange = () => setIsActive(!isActive);

    const validateFields = () => {
        const errors = {
            image: '',
            title: '',
            description: '',
            url: '',
        };
        if (!image) errors.image = 'Image is required.';
        if (!title.trim()) errors.title = 'Title is required.';
        if (!description.trim()) errors.description = 'Description is required.';
        if (!url.trim()) errors.url = 'Url is required.';

        setErrors(errors);
        return !errors.image && !errors.title && !errors.description && !errors.url;
    };

    const createFormData = () => {
        const formData = new FormData();
        if (image) {
            formData.append('image_data', image);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('client_site_url', url);
        formData.append('status', JSON.stringify(isActive));
        return formData;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            const data = createFormData();
            handleData(data);
            setIsActive(false);
            setImage(null);
            setTitle('');
            setDescription('');
            setUrl('');
            let newErrors = {
                image: '',
                title: '',
                description: '',
                url: '',
            }
            setErrors(newErrors)
        }
    };

    return (
        <div>
            <Modal centered isOpen={isAddModalOpen} toggle={toggle} style={{
                backgroundImage: "url(/'addModal.jpg')"
            }}>
                <ModalHeader toggle={toggle}>Adauga un portofloliu</ModalHeader>
                <ModalBody>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '370px' }}>
                            <Spinner color="primary" style={{ height: '5rem', width: '5rem', color: 'lightgray!important', fontSize: 'xx-large' }}>
                                Loading...
                            </Spinner>
                        </div>
                    ) : (
                        <>
                            <FormGroup>
                                <Label for="imageUpload">Imagine</Label>
                                <Input
                                    type="file"
                                    id="imageUpload"
                                    onChange={handleImageChange}
                                    invalid={!!errors.image}
                                />
                                {errors.image && <div style={{
                                    color: 'var(--bs-form-invalid-color)',
                                    fontSize: '.875em',
                                    marginTop: '.25rem',
                                    width: '100%'
                                }}>{errors.image}</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Nume</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    invalid={!!errors.title}
                                />
                                <FormFeedback>{errors.title}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Descriere</Label>
                                <Input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    invalid={!!errors.description}
                                />
                                <FormFeedback>{errors.description}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="urlInput">Link</Label>
                                <Input
                                    type="url"
                                    id="urlInput"
                                    value={url}
                                    onChange={handleUrlChange}
                                    invalid={!!errors.url}
                                />
                                <FormFeedback>{errors.url}</FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" checked={isActive} onChange={handleStatusChange} />
                                    <b style={{color: '#fff'}}>Status</b>
                                </Label>
                            </FormGroup>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div style={{ textAlign: 'center' }}>
                        <Button color="primary" disabled={loading} onClick={handleSubmit}>
                            Salveaza
                        </Button>{' '}
                        <Button color="danger" disabled={loading} onClick={() => {
                            let newErrors = {
                                image: '',
                                title: '',
                                description: '',
                                url: '',
                            }
                            setErrors(newErrors)
                            toggle()}}>
                            Anuleaza
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AddModal;