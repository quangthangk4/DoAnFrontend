import React, { useState } from 'react';
import TemperatureControl from '../../components/Temp/TemperatureControl';

const DeviceControl = () => {
    const devices = ['light', 'fan', 'door'];
    const [activeTab, setActiveTab] = useState('light');


    return (
        <div className='p-4'>
            <div className="bg-white rounded-4">
                <h3 className='d-inline me-5' role="button">Living Room</h3>
                <h3 className='d-inline text-secondary' role="button">Kitchen</h3>

                <div className="device-control mt-4">
                    <nav>
                        <button style={{minWidth:"70px"}} onClick={() => setActiveTab('light')} className={`btn me-3 ${activeTab === 'light' ? "btn-primary" : ""}`}>
                            Đèn
                        </button>
                        <button style={{minWidth:"70px"}} onClick={() => setActiveTab('fan')} className={`btn me-3 ${activeTab === 'fan' ? "btn-primary" : ""}`}>
                            Quạt
                        </button>
                        <button style={{minWidth:"70px"}} onClick={() => setActiveTab('door')} className={`btn me-3 ${activeTab === 'door' ? "btn-primary" : ""}`}>
                            Cửa
                        </button>
                    </nav>

                    {/* Nội dung hiển thị bên dưới */}
                    <div className="device-content">
                        {activeTab === 'light' && <p>light</p>}
                        {activeTab === 'fan' && <TemperatureControl />}
                        {activeTab === 'door' && <p>door</p>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeviceControl