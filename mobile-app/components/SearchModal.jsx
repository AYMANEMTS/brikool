import * as React from 'react';
import { Modal, Portal, Text} from 'react-native-paper';

const SearchModal = ({visibleModal,handleVisibleModal}) => {
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <Portal>
            <Modal visible={visibleModal} onDismiss={handleVisibleModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
        </Portal>
    );
};

export default SearchModal;