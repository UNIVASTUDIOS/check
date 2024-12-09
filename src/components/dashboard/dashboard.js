import React, { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import DashboardHero from './DashboardHero/DashboardHero'
import './dashboard.css'
import CollapseBlock from './CollapseBlockLeft/collapseblockleft'
import CollapseBlockRight from './collapseblockright/collapseblockright'

function Dashboard() {

  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
  const [blocksOpen, setBlocksOpen] = useState('both')

  useEffect(() => {
    if(isLeftBlockOpen && isRightBlockOpen){
        setBlocksOpen('both')
    
    }

    if(!isLeftBlockOpen && !isRightBlockOpen){
        setBlocksOpen('none')
    }

    if((!isLeftBlockOpen && isRightBlockOpen) || (isLeftBlockOpen && !isRightBlockOpen)){
        setBlocksOpen('one')
    }
  }, [isLeftBlockOpen, isRightBlockOpen])

  
  return (
    <div style={{ minHeight: '100vh' }} className='dashboard font-family-poppins'>
        <DashboardHeader />
        <div className='d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-2 px-lg-4 px-md-4 px-3 justify-content-between align-items-start herogeneral'>
            
            <div className='d-lg-none d-md-none d-flex align-items-center justify-content-between mb-2'>
              <div className='col-lg-2'>
                <CollapseBlock isSmallScreen={true} />
              </div>
              <div className='col-lg-2'>
                  <CollapseBlockRight isSmallScreen={true }/>
              </div>              
            </div>
            
            <div className={`${isLeftBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none`}>
              <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
            </div>

            <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-auto px-lg-4 px-md-4 px-0`}>
              <DashboardHero isLeftBlockOpen={isLeftBlockOpen} isRightBlockOpen={isRightBlockOpen} />
            </div>

            <div className={`${isRightBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none align-items-center justify-content-end`}>
              <div className=''>
                  <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard


// mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 justify-content-between