import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import UploadPostForm from './UploadPostForm';

const UploadModal = (props) => {
    return (
        <div>
            <Modal className='modal-lg' isOpen={props.uploadPostVisible} toggle={props.toggle}>
                <ModalBody>
                    {/* {props.post ? (<UploadPostForm toggle={props.toggle} post={props.post}/>):(<div></div>)} */}
                    <UploadPostForm toggle={props.toggle} post={props.post}/>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default UploadModal;