import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../../data/faqData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <HelpCircle className="w-8 h-8 text-white" />
        </div> */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4 sm:mb-6">
            <MessageCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-semibold text-xs sm:text-sm">FAQ</span>
          </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Questions</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto px-4">
          Find answers to common questions about SmartSanstha
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left p-5 font-semibold text-white hover:text-orange-400 transition-colors"
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-orange-400' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-48' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 text-slate-400 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};






// import React, { useState } from 'react';
// import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { Card } from '../common/Card';
// import { useInView } from 'react-intersection-observer';

// export const FAQSection: React.FC = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const faqs = [
//     {
//       question: 'Is SmartSanstha free to use?',
//       answer: 'Yes! SmartSanstha is completely free. We believe constitutional education should be accessible to everyone.'
//     },
//     {
//       question: 'Do I need to create an account?',
//       answer: 'No account is required to access learning materials. However, creating an account helps track your progress and save your achievements.'
//     },
//     {
//       question: 'Is this suitable for competitive exam preparation?',
//       answer: 'Absolutely! Our content covers all aspects of the Constitution required for UPSC, SSC, state PSCs, and other competitive exams.'
//     },
//     {
//       question: 'How accurate is the information?',
//       answer: 'All content is based on the official Constitution of India and regularly updated to reflect the latest amendments.'
//     },
//     {
//       question: 'Can I use this on mobile devices?',
//       answer: 'Yes! SmartSanstha is fully responsive and works seamlessly on smartphones, tablets, and desktops.'
//     }
//   ];

//   return (
//     <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12 sm:mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4 sm:mb-6">
//             <MessageCircle className="w-4 h-4 text-red-400" />
//             <span className="text-red-400 font-semibold text-xs sm:text-sm">FAQ</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl text-slate-400 px-4">
//             Got questions? We've got answers!
//           </p>
//         </div>

//         <div 
//           ref={ref}
//           className="space-y-3 sm:space-y-4"
//         >
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className={inView ? 'animate-fade-in-up' : 'opacity-0'}
//               style={{ animationDelay: `${0.1 * index}s` }}
//             >
//               <Card 
//                 className="hover:border-orange-500/50 transition-all cursor-pointer"
//                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
//               >
//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                     <span className="text-white font-bold text-sm">Q</span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between gap-4">
//                       <h3 className="text-base sm:text-lg font-bold text-white mb-2">{faq.question}</h3>
//                       {openIndex === index ? (
//                         <ChevronUp className="w-5 h-5 text-orange-400 flex-shrink-0" />
//                       ) : (
//                         <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
//                       )}
//                     </div>
//                     {openIndex === index && (
//                       <p className="text-slate-400 text-sm sm:text-base leading-relaxed animate-fade-in">
//                         {faq.answer}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };