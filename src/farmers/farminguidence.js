import React, { useState } from 'react';
import './farmingguidence.css';
export default function Farminguidence() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'What are the best farming practices for sustainable agriculture?',
      answer: 'Sustainable agriculture involves using eco-friendly practices such as crop rotation, using organic fertilizers, and conserving water resources.'
    },
    {
      question: 'How can I improve soil health on my farm?',
      answer: 'Improving soil health can be achieved by adding organic compost, practicing cover cropping, and minimizing soil disturbance.'
    },
    {
      question: 'What types of irrigation systems are most efficient?',
      answer: 'Drip irrigation and sprinkler systems are efficient, as they reduce water waste and deliver water directly to plant roots.'
    },
    {
      question: 'How can I prevent pests and diseases on my farm?',
      answer: 'Integrated pest management (IPM) is a holistic approach that combines biological, cultural, and mechanical methods to control pests.'
    },
    {
      question: 'What are the best crops to grow in different seasons?',
      answer: 'It depends on your region, but typically, cool-season crops like lettuce and spinach grow in spring and fall, while warm-season crops like tomatoes and peppers thrive in summer.'
    }
  ];

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section>
      <div className="faq-section">
        <h1>Farmer's Guidance and FAQs</h1>
        <p>Find answers to common questions about farming practices, crop management, and sustainable agriculture.</p>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => handleToggle(index)}>
                <h3>{item.question}</h3>
                {activeIndex === index ? (
                  <span>−</span> // Shows minus sign when answer is revealed
                ) : (
                  <span>+</span> // Shows plus sign when answer is hidden
                )}
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
