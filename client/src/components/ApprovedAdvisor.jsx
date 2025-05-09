import React, { useEffect, useState, useContext } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { HiOutlineUserCircle, HiCheckCircle, HiMail, HiUserAdd } from 'react-icons/hi';
import { ThemContext } from '../context/ThemContext';
import { useSelector } from 'react-redux';

const ApprovedAdvisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { darkMode } = useContext(ThemContext);
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const { currentUser } = useSelector((state) => state.user);

  const fetchApprovedAdvisors = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/AuthRoute/approved-advisors', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
     
      if (!res.ok) throw new Error(data.message || 'Failed to fetch advisors');
      setAdvisors(data.advisors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedAdvisors();
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
            Approved Advisors
          </h1>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${darkMode ? 'bg-gray-700 text-cyan-400' : 'bg-cyan-100 text-cyan-800'}`}>
            <HiCheckCircle className="w-4 h-4" />
            <span>Verified</span>
          </div>
        </div>

        {error && (
          <div className={`p-4 mb-6 rounded-lg flex items-start space-x-3 ${darkMode ? 'bg-red-900/30 border border-red-800 text-red-200' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            <HiOutlineUserCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Error loading advisors</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Spinner size="xl" />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading approved advisors...</p>
          </div>
        ) : advisors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor) => (
              <Card 
                key={advisor._id} 
                className={`relative overflow-hidden transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="absolute top-0 right-0 p-2">
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'}`}></div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-cyan-100 text-cyan-600'}`}>
                  {
                    advisor?.profile === defaultProfileImage ? (
                          <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full ">
                            <span className=' text-pink-700 font-serif text-2xl'>{advisor?.userName?.[0]}</span>
                          </div>
                        ) : (
                          <Avatar
                            img={`http://localhost:3000${advisor?.profile}`}
                            rounded
                            bordered
                           
                          />
                        )
                      }
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{advisor.userName}</h3>
                    <div className="flex items-center mt-1 space-x-2 text-sm">
                      <HiMail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{advisor.email}</span>
                    </div>
                    <div className="flex items-center mt-1 space-x-2 text-sm">
                      <HiMail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{advisor.email}</span>
                    </div>
                  </div>
                </div>

                <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h4 className="text-sm font-medium uppercase tracking-wider opacity-80 mb-2">Approved By</h4>
                  {advisor.approvedBy ? (
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {
                        currentUser?.profile === defaultProfileImage ? (
                          <div className="flex items-center justify-center h-14 w-14 bg-gray-400 text-white text-xl font-bold rounded-full ">
                            <span className=' text-pink-700 font-serif text-2xl'>{currentUser?.userName?.[0]}</span>
                          </div>
                        ) : (
                          <Avatar
                            img={`http://localhost:3000${currentUser?.profile}`}
                            rounded
                            bordered
                           
                          />
                        )
                      }
                      </div>
                      <div>
                        <p className="font-medium">{advisor.approvedBy.userName}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{advisor.approvedBy.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`px-3 py-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                      Approval information not available
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className={`text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col items-center justify-center py-8">
              <HiOutlineUserCircle className={`w-12 h-12 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <h3 className="text-xl font-medium mb-2">No Approved Advisors</h3>
              <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                There are currently no approved advisors in the system. Check back later or approve some advisors.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApprovedAdvisor;