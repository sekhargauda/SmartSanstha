// import React from 'react';
// import { BookOpen, Mail, Phone, MapPin, Twitter, Linkedin, Github, Heart, ExternalLink } from 'lucide-react';

// interface FooterProps {
//   onNavigate: (page: string) => void;
// }

// export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { label: 'Home', page: 'home' },
//     { label: 'Learn Constitution', page: 'learn' },
//     { label: 'Play Games', page: 'games' },
//     { label: 'About Us', page: 'about' },
//     { label: 'Dashboard', page: 'dashboard' },
//   ];

//   const resources = [
//     { label: 'Constitution of India', url: 'https://www.constitution.org/cons/india/const.html' },
//     { label: 'Know India Programme', url: 'https://knowindia.india.gov.in/' },
//     { label: 'Ministry of Law', url: 'https://lawmin.gov.in/' },
//     { label: 'Indian Parliament', url: 'https://www.sansad.in/' },
//   ];

//   const socialLinks = [
//     { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
//     { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
//     { icon: Github, url: 'https://github.com/harshgajera101', label: 'GitHub' },
//   ];

//   return (
//     <footer className="relative z-10 bg-slate-900 border-t border-slate-800 mt-20">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand Section */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
//                 <BookOpen className="w-6 h-6 text-white" />
//               </div>
//               <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
//                 SmartSanstha
//               </span>
//             </div>
//             <p className="text-slate-400 text-sm leading-relaxed mb-4">
//               An AI-powered gamified platform making constitutional literacy engaging, accessible, and fun for every Indian citizen.
//             </p>
//             <div className="flex gap-3">
//               {socialLinks.map((social) => {
//                 const Icon = social.icon;
//                 return (
//                   <a
//                     key={social.label}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
//                   >
//                     <Icon className="w-5 h-5" />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.page}>
//                   <button
//                     onClick={() => onNavigate(link.page)}
//                     className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1 group"
//                   >
//                     <span className="w-0 h-0.5 bg-orange-400 group-hover:w-3 transition-all duration-300"></span>
//                     {link.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
//               Resources
//             </h3>
//             <ul className="space-y-2">
//               {resources.map((resource) => (
//                 <li key={resource.label}>
//                   <a
//                     href={resource.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1 group"
//                   >
//                     <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                     {resource.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
//               Get in Touch
//             </h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3 text-sm text-slate-400">
//                 <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
//                 <span>
//                   A.P. Shah Institute of Technology<br />
//                   Thane, Maharashtra, India
//                 </span>
//               </li>
//               <li className="flex items-center gap-3 text-sm text-slate-400">
//                 <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
//                 <a href="mailto:info@smartsanstha.in" className="hover:text-orange-400 transition-colors">
//                   info@smartsanstha.in
//                 </a>
//               </li>
//               <li className="flex items-center gap-3 text-sm text-slate-400">
//                 <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
//                 <a href="tel:+911234567890" className="hover:text-orange-400 transition-colors">
//                   +91 123 456 7890
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-8 border-t border-slate-800">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-slate-500 text-center md:text-left">
//               © {currentYear} SmartSanstha. All rights reserved.
//             </p>
//             <p className="text-sm text-slate-500 flex items-center gap-1">
//               Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by Team SmartSanstha
//             </p>
//           </div>
//           <div className="mt-4 text-center">
//             <p className="text-xs text-slate-600">
//               An academic project by students of A.P. Shah Institute of Technology
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };






// frontend/src/components/layout/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Twitter, Linkedin, Github, Heart, ExternalLink } from 'lucide-react';

// ✅ REMOVED FooterProps interface - no more onNavigate
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Learn Constitution', path: '/learn' },
    { label: 'Play Games', path: '/games' },
    { label: 'About Us', path: '/about' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const resources = [
    { label: 'Constitution of India', url: 'https://www.constitution.org/cons/india/const.html' },
    { label: 'Know India Programme', url: 'https://knowindia.india.gov.in/' },
    { label: 'Ministry of Law', url: 'https://lawmin.gov.in/' },
    { label: 'Indian Parliament', url: 'https://www.sansad.in/' },
  ];

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/harshgajera101', label: 'GitHub' },
  ];

  return (
    <footer className="relative z-10 bg-slate-900 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                SmartSanstha
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              An AI-powered gamified platform making constitutional literacy engaging, accessible, and fun for every Indian citizen.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  {/* ✅ CHANGED: button with onClick to Link */}
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span className="w-0 h-0.5 bg-orange-400 group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300 mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  A.P. Shah Institute of Technology<br />
                  Thane, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@smartsanstha.in" className="hover:text-orange-400 transition-colors">
                  info@smartsanstha.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-orange-400 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {currentYear} SmartSanstha. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by Team SmartSanstha
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-600">
              An academic project by students of A.P. Shah Institute of Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};