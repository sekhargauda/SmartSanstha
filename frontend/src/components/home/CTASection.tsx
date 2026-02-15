// import React from 'react';
// import { BookOpen, BarChart } from 'lucide-react';
// import { Card } from '../common/Card';
// import { Button } from '../common/Button';
// import { useInView } from 'react-intersection-observer';

// interface CTASectionProps {
//   onNavigate: (page: string) => void;
// }

// export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//       <div className="max-w-4xl mx-auto">
//         <div
//           ref={ref}
//           className={inView ? 'animate-fade-in-up' : 'opacity-0'}
//         >
//           <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30 text-center">
//             <div className="py-8 sm:py-12">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transform hover:scale-110 transition-transform">
//                 <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//               </div>
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
//                 Ready to Start Your Learning Journey?
//               </h2>
//               <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
//                 Join thousands of learners and become a constitutional expert today!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
//                 <Button 
//                   size="lg"
//                   onClick={() => onNavigate('learn')}
//                   icon={<BookOpen className="w-5 h-5" />}
//                   className="w-full sm:w-auto"
//                 >
//                   Start Learning Now
//                 </Button>
//                 <Button 
//                   size="lg"
//                   variant="outline"
//                   onClick={() => onNavigate('dashboard')}
//                   icon={<BarChart className="w-5 h-5" />}
//                   className="w-full sm:w-auto"
//                 >
//                   View Dashboard
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };










// frontend/src/components/home/CTASection.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useInView } from 'react-intersection-observer';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={inView ? 'animate-fade-in-up' : 'opacity-0'}
        >
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30 text-center">
            <div className="py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transform hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join thousands of learners and become a constitutional expert today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/learn')}
                  icon={<BookOpen className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Start Learning Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  icon={<BarChart className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};