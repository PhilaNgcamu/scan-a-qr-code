import actionTypes from "./actionTypes";

export const setCameraPermission = (permission) => ({
  type: actionTypes.SET_CAMERA_PERMISSION,
  payload: permission,
});

export const isQrScanned = (isScanned) => ({
  type: actionTypes.IS_QR_SCANNED,
  payload: isScanned,
});

export const updateModalData = (data) => ({
  type: actionTypes.UPDATE_MODAL_DATA,
  payload: data,
});

export const cameraShouldScan = (shouldScan) => ({
  type: actionTypes.CAMERA_SHOULD_SCAN,
  payload: shouldScan,
});

export const setIsModalOpen = (isOpen) => ({
  type: actionTypes.IS_MODAL_OPEN,
  payload: isOpen,
});

export const setErrorMessage = (error) => ({
  type: actionTypes.SET_ERROR_MESSAGE,
  payload: error,
});

export const setContacts = (contacts) => ({
  type: actionTypes.SET_CONTACTS,
  payload: contacts,
});

export const setIsSameQrCode = (isSameQrCode) => ({
  type: actionTypes.SET_IS_SAME_QR_CODE,
  payload: isSameQrCode,
});

export const setIsLoading = (isLoading) => ({
  type: actionTypes.IS_LOADING,
  payload: isLoading,
});

export const isContactStarred = () => ({
  type: actionTypes.IS_CONTACT_STARRED,
});
