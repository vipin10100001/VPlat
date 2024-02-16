import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Modal from 'react-modal';

const Pricing = () => {
  const pricingOptions = [
    {
      id: 1,
      title: 'Basic Freelancing using AI',
      price: '$9.99',
      features: ['Web Development using AI', 'App Development using AI', 'Copyrighting using AI'],
    },
    {
      id: 2,
      title: 'Video-Editing',
      price: '$12.99',
      features: ['Video Editing using Final Cut Pro', 'Video Editing using Adobe Premiere Pro', 'Video Editing using Adobe After Effects', 'Cartoon Video Editing'],
    },
    {
      id: 3,
      title: 'Trading',
      price: '$29.99',
      features: ['Stocks', 'Forex Trading', 'Crpyto', 'Mutual Funds'],
    },
    {
      id: 4,
      title: 'Non-Techical using AI',
      price: '$15.99',
      features: ['Content-Writing ', 'Copyrighting', 'Content-Creation', 'Mutual Funds'],
    },
    {
      id: 5,
      title: 'Online Freelancing Agency using AI',
      price: '$9.99',
      features: ['Web Development using AI', 'App Development using AI', 'Copyrighting using AI','Payment Gateway','Client Management','Project Management','Client Aquisition'],
    },
  ];

  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing');
      const { top } = pricingSection.getBoundingClientRect();
      const isVisible = top < window.innerHeight - 100;
  
      if (isVisible) {
        controls.start({ opacity: 1, y: 0 });
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);
  

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
  };

  return (
    <section className="bg-transparent px-10 py-16" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              className="bg-transparent bg-opacity-20 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{option.title}</h3>
                <p className="text-green-500 text-2xl font-bold mb-6">{option.price}</p>
                <ul className="text-gray-300 mb-6">
                  {option.features.map((feature) => (
                    <li key={feature} className="mb-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                className="bg-white bg-opacity-20 hover:bg-opacity-70 text-green-500 hover:text-green-600 font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={controls}
                transition={{ duration: 0.8 }}
                onClick={() => handleChoosePlan(option)}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Plan Details"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedPlan && (
          <motion.div
            className="modal-content bg-white w-1/3 h-1/2 rounded-lg p-6 max-w-xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedPlan.title}</h2>
              <p className="text-green-500 text-2xl font-bold mb-6">{selectedPlan.price}</p>
              <ul className="text-gray-600 mb-6">
                {selectedPlan.features.map((feature) => (
                  <li key={feature} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Close
            </button>
          </motion.div>
        )}
      </Modal>
    </section>
  );
};

export default Pricing;
