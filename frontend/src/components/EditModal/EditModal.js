import React, {useEffect, useState} from 'react';
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner
} from 'reactstrap';

const EditModal = ({ isEditModalOpen, itemData, handleData, toggle, loading }) => {
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

    useEffect(() => {
        if (itemData) {
            setTitle(itemData?.title || '');
            setDescription(itemData?.description || '');
            setUrl(itemData?.client_site_url || '');
            setIsActive(itemData?.status);
        }
    }, [itemData]);

    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleStatusChange = () => setIsActive(!isActive);

    useEffect(() => {
        validateFields()
    },[image, title, description, url])

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
        return !errors.title && !errors.description && !errors.url;
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
        if(validateFields()){
            const data = createFormData();
            handleData(data);
        }
    };

    const closeEditModal = () => {
        toggle();
        if (itemData) {
            setTitle(itemData?.title || '');
            setDescription(itemData?.description || '');
            setUrl(itemData?.client_site_url || '');
            setIsActive(itemData?.status);
        }
    }

    return (
        <Modal centered isOpen={isEditModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modifica Portofoliul</ModalHeader>
            <ModalBody>
                {
                    loading ?
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '370px'}}>
                            <Spinner
                                color="primary"
                                style={{
                                    height: '5rem',
                                    width: '5rem',
                                    color: 'lightgray!important',
                                    fontSize: 'xx-large'
                                }}>
                                Loading...
                            </Spinner>
                        </div>
                        :
                        <>
                            <FormGroup>
                                <Label for="imageUpload">Imagine</Label>
                                <Input
                                    type="file"
                                    id="imageUpload"
                                    onChange={handleImageChange}
                                />
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
                                    <b style={{color:'#fff'}}>Status</b>
                                </Label>
                            </FormGroup>
                        </>
                }
            </ModalBody>
            <ModalFooter>
                <div style={{ textAlign: 'center' }}>
                    <Button color="primary" disabled={loading} onClick={handleSubmit}>
                        Salveaza
                    </Button>{' '}
                    <Button color="secondary" disabled={loading} onClick={closeEditModal}>
                        Anuleaza
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default EditModal;
