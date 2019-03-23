import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import EditPost from './EditPost';

const EditPostModal = (props) => {
    return (
        <div>
            <Modal className='modal-lg' isOpen={props.editModalVisible} toggle={props.toggle}>
                <ModalBody>
                    <EditPost toggle={props.toggle} post={props.post}/>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EditPostModal;