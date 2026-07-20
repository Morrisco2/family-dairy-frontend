import React, {useState}  from 'react'
import StartHistoryModal from '../component/historyModals/StartHistoryModal'
import WelcomeHeader from '../component/WelcomeHeader'
import AlertToaster from '../component/toasters/AlertToaster';
import AddHistoryForm from '../component/historyModals/AddHistoryForm';
import FamilyTreePage from './FamilyTreePage';

const HistoryPage = () => {
  const startWith = localStorage.getItem("startWith");
  const [showToast, setShowToast] = useState(false);


  return (
    <div className="py-5 px-4 ">
      <div>
        <WelcomeHeader />
      </div>
      <StartHistoryModal />
      {startWith && (
        <div>
          <AddHistoryForm />
        </div>
      )}

      <FamilyTreePage />

      {/* <button onClick={() => setShowToast(true)}>Show Toast</button>

      <AlertToaster
        show={showToast}
        status="failed"
        message="Failed to load the resources"
        duration={3000}
        onClose={() => setShowToast(false)}
      /> */}
    </div>
  );
}

export default HistoryPage