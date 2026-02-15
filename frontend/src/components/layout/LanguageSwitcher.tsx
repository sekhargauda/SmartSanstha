// import React, { useEffect, useState, useRef } from 'react';
// import { Globe, Check } from 'lucide-react';

// const languages = [
//   { code: 'en', label: 'English', native: 'English' },
//   { code: 'hi', label: 'Hindi', native: 'हिंदी' },
//   { code: 'mr', label: 'Marathi', native: 'मराठी' },
//   { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
// ];

// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: any;
//   }
// }

// export const LanguageSwitcher: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentLang, setCurrentLang] = useState('en');
//   const initializationStarted = useRef(false);

//   useEffect(() => {
//     // 1. Get Cookie Language
//     const getCookie = (name: string) => {
//       try {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) return parts.pop()?.split(';').shift();
//       } catch (e) {
//         return null;
//       }
//     };
    
//     const cookieLang = getCookie('googtrans');
//     if (cookieLang) {
//       const code = cookieLang.split('/').pop();
//       if (code) setCurrentLang(code);
//     }

//     // 2. Singleton Initialization - Only run once!
//     if (initializationStarted.current) return;
//     initializationStarted.current = true;

//     const initializeGoogleTranslate = () => {
//       // A. Create the hidden div container if it doesn't exist
//       if (!document.getElementById('google_translate_element')) {
//         const div = document.createElement('div');
//         div.id = 'google_translate_element';
//         div.style.display = 'none'; // Keep it hidden
//         document.body.appendChild(div);
//       }

//       // B. Inject the Styles to hide the Top Bar (Programmatically)
//       const styleId = 'google-translate-styles';
//       if (!document.getElementById(styleId)) {
//         const style = document.createElement('style');
//         style.id = styleId;
//         style.innerHTML = `
//           .goog-te-banner-frame.skiptranslate { display: none !important; } 
//           body { top: 0px !important; } 
//           .goog-tooltip { display: none !important; }
//           .goog-te-gadget-simple { background-color: transparent !important; border: none !important; }
//           .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
//         `;
//         document.head.appendChild(style);
//       }

//       // C. Define Init Function
//       window.googleTranslateElementInit = () => {
//         if (window.google && window.google.translate) {
//           new window.google.translate.TranslateElement(
//             {
//               pageLanguage: 'en',
//               includedLanguages: 'en,hi,mr,gu',
//               autoDisplay: false,
//             },
//             'google_translate_element'
//           );
//         }
//       };

//       // D. Inject Script (Only if missing)
//       const scriptId = 'google-translate-script';
//       if (!document.getElementById(scriptId)) {
//         const script = document.createElement('script');
//         script.id = scriptId;
//         script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     };

//     // 3. WAIT FOR WINDOW LOAD (The Fix for Vite Preamble Error)
//     if (document.readyState === 'complete') {
//       setTimeout(initializeGoogleTranslate, 1000);
//     } else {
//       window.addEventListener('load', () => {
//          setTimeout(initializeGoogleTranslate, 1000);
//       });
//     }

//   }, []);

//   const handleLanguageChange = (langCode: string) => {
//     const domain = window.location.hostname;
//     document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`;
//     document.cookie = `googtrans=/en/${langCode}; path=/;`; 

//     setCurrentLang(langCode);
//     setIsOpen(false);
//     window.location.reload();
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all border border-slate-700 hover:border-slate-600 bg-slate-900/50"
//       >
//         <Globe className="w-4 h-4 text-orange-400" />
//         <span className="text-sm font-medium hidden sm:block">
//           {languages.find(l => l.code === currentLang)?.native || 'English'}
//         </span>
//       </button>

//       {isOpen && (
//         <>
//           <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
//           <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-20 animate-fade-in">
//             <div className="py-1">
//               {languages.map((lang) => (
//                 <button
//                   key={lang.code}
//                   onClick={() => handleLanguageChange(lang.code)}
//                   className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
//                     ${currentLang === lang.code 
//                       ? 'bg-orange-500/10 text-orange-400' 
//                       : 'text-slate-300 hover:bg-slate-700 hover:text-white'
//                     }`}
//                 >
//                   <div className="flex flex-col items-start">
//                     <span className="font-medium">{lang.native}</span>
//                     <span className="text-xs opacity-60">{lang.label}</span>
//                   </div>
//                   {currentLang === lang.code && (
//                     <Check className="w-4 h-4 text-orange-400" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };











// frontend/src/components/layout/LanguageSwitcher.tsx

import React, { useEffect, useState, useRef } from 'react';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const initializationStarted = useRef(false);

  useEffect(() => {
    // 1. Check Cookie
    const getCookie = (name: string) => {
      try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      } catch (e) {
        return null;
      }
    };
    const cookieLang = getCookie('googtrans');
    if (cookieLang) {
      const code = cookieLang.split('/').pop();
      if (code) setCurrentLang(code);
    }

    // 2. Singleton Init
    if (initializationStarted.current) return;
    initializationStarted.current = true;

    const initializeGoogleTranslate = () => {
      if (!document.getElementById('google_translate_element')) {
        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.display = 'none';
        document.body.appendChild(div);
      }

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,gu',
              autoDisplay: false, // Don't show the banner automatically
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
        }
      };

      const scriptId = 'google-translate-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Load
    if (document.readyState === 'complete') {
      setTimeout(initializeGoogleTranslate, 1000);
    } else {
      window.addEventListener('load', () => {
         setTimeout(initializeGoogleTranslate, 1000);
      });
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const domain = window.location.hostname;
    // Set cookie for both domain levels to ensure it catches
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`; 

    setCurrentLang(langCode);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all border border-slate-700 hover:border-slate-600 bg-slate-900/50"
      >
        <Globe className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium hidden sm:block">
          {languages.find(l => l.code === currentLang)?.native || 'English'}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-20 animate-fade-in">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                    ${currentLang === lang.code 
                      ? 'bg-orange-500/10 text-orange-400' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-xs opacity-60">{lang.label}</span>
                  </div>
                  {currentLang === lang.code && (
                    <Check className="w-4 h-4 text-orange-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};