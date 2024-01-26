import { useContext } from 'react';
import appContext from '@/context/app/appContext';

const Modal = ({ closeModal, children }) => {
    const AppContext = useContext(appContext);
    const { isOpenModal, toggleModal } = AppContext;

  const overlayClasses = isOpenModal ? 'fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 duration-1000' : 'hidden';
  const modalClasses = isOpenModal ? 
  'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-50 rounded-2xl opacity-100 scale-100 transition-opacity duration-300 ease-in-out' : 'hidden';

  return (
    <>
      <div className={overlayClasses} onClick={toggleModal}></div>
      <div className={modalClasses}>
        <button className="absolute top-2 right-2 text-2xl font-black text-white-600 px-3 py-1 pb-2 bg-red-600 hover:bg-red-700 hover:scale-110 text-white duration-300 rounded-full" onClick={toggleModal}>&times;</button>
        {children}
      </div>
    </>
  );
};

export default Modal;
