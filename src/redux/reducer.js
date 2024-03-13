import actionTypes from "./actionTypes";

const initialState = {
  cameraPermission: null,
  hasPermission: null,
  isQrScanned: false,
  modalData: null,
  shouldScan: true,
  isModalOpen: false,
  errorMessage: null,
  contacts: [],
  isSameQrCode: false,
  isLoading: true,
};

const qrCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CAMERA_PERMISSION:
      return { ...state, cameraPermission: action.payload };

    case actionTypes.SET_HAS_PERMISSION:
      return { ...state, hasPermission: action.payload };

    case actionTypes.IS_QR_SCANNED:
      return { ...state, isQrScanned: action.payload };

    case actionTypes.UPDATE_MODAL_DATA:
      return { ...state, modalData: action.payload };

    case actionTypes.CAMERA_SHOULD_SCAN:
      return { ...state, shouldScan: action.payload };

    case actionTypes.IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };

    case actionTypes.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };

    case actionTypes.SET_CONTACTS:
      return { ...state, contacts: action.payload };

    case actionTypes.SET_IS_SAME_QR_CODE:
      return { ...state, isSameQrCode: action.payload };

    case actionTypes.IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default qrCodeReducer;
