import React, { useState } from 'react'
import StartHistoryModal from '../component/historyModals/StartHistoryModal'
import WelcomeHeader from '../component/WelcomeHeader'
import AddHistoryForm from '../component/historyModals/AddHistoryForm';
import FamilyTreePage from './FamilyTreePage';
import GeneologyHistory from '../component/GeneologyHistory';
import GenealogyHistoryPage from '../component/history/GenealogyHistoryPage';

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

      <div className='py-10'>
        <GenealogyHistoryPage />
      </div>

    </div>
  );
}

export default HistoryPage