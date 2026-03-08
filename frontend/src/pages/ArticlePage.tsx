// // frontend/src/pages/ArticlePage.tsx

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import {
//   BookOpen,
//   FileText,
//   Lightbulb,
//   Scale,
//   ChevronRight,
//   ChevronLeft,
//   CheckCircle,
//   XCircle,
//   Bookmark,
//   ArrowLeft,
//   Sparkles,
//   Info,
//   BookMarked,
//   Loader,
//   AlertCircle,
//   Share2,
//   Pencil,
//   Save,
//   X,
//   Plus,
//   Trash2
// } from "lucide-react";
// import { Card } from "../components/common/Card";
// import { Button } from "../components/common/Button";
// import { articleAPI, progressAPI } from "../services/api";
// import { normalizeArticleId } from "../utils/articleNumber";
// import { UserData } from "../App";

// interface ArticlePageProps {
//   user?: UserData | null;
// }

// export const ArticlePage: React.FC<ArticlePageProps> = ({ user }) => {
//   const navigate = useNavigate();
//   const params = useParams<{ articleId: string }>();
//   const location = useLocation();

//   const articleData = location.state as any;
//   // Use params.articleId as the source of truth for the ID
//   const articleNumber = params.articleId || articleData?.articleNumber;

//   const [article, setArticle] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"simplified" | "original">("simplified");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [allArticles, setAllArticles] = useState<any[]>(articleData?.allArticles || []);
//   const [currentIndex, setCurrentIndex] = useState(articleData?.currentIndex || 0);

//   // --- EDITING STATE ---
//   const [isEditing, setIsEditing] = useState<string | null>(null);
//   const [editData, setEditData] = useState<any>({});
//   const [isSaving, setIsSaving] = useState(false);

//   const isAdmin = user?.type === 'admin';

//   useEffect(() => {
//     if (articleNumber) {
//       fetchArticle(articleNumber);
//       if (articleData?.allArticles) {
//         setAllArticles(articleData.allArticles);
//         setCurrentIndex(articleData.currentIndex || 0);
//       }
//     } else {
//       setError("No article number provided");
//       setLoading(false);
//     }
//   }, [articleNumber, articleData]);

//   const fetchArticle = async (artNum: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`📄 Fetching article ${artNum}...`);
//       const response: any = await articleAPI.getArticle(artNum);
//       if (response?.success) {
//         setArticle(response.data);
//         console.log("✅ Article loaded:", response.data.articleName);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         setError("Failed to load article data");
//       }
//     } catch (err: any) {
//       console.error("❌ Error fetching article:", err);
//       setError("Failed to load article. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!article) return;
//     const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
//     if (!raw) return;
//     const num = normalizeArticleId(raw);
//     const partName = article.part?.name || articleData?.partName;
//     progressAPI.markArticleRead(num, partName).catch((e: any) => console.error("markArticleRead failed:", e));
//   }, [article, articleData, articleNumber]);

//   useEffect(() => {
//     const loadBookmarkState = async () => {
//       if (!article) return;
//       const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
//       if (!raw) return;
//       const num = normalizeArticleId(raw);
//       try {
//         const res: any = await progressAPI.getDashboard();
//         if (!res?.success) return;
//         const { bookmarks } = res;
//         const isBookmarkedNow = (bookmarks || []).some((b: any) => String(b.articleNumber) === num);
//         setIsBookmarked(isBookmarkedNow);
//       } catch (e) {
//         console.error("Failed to load bookmark state:", e);
//       }
//     };
//     loadBookmarkState();
//   }, [article, articleNumber]);

//   // --- ADMIN EDIT HANDLERS ---

//   const handleEditClick = (section: string) => {
//     setIsEditing(section);
//     if (section === 'simplified') setEditData({ simplifiedDescription: article.simplifiedDescription });
//     if (section === 'historical') setEditData({ historicalContext: article.historicalContext });
//     if (section === 'keyPoints') setEditData({ keyPoints: [...(article.keyPoints || [])] });
//     if (section === 'landmark') setEditData({ landmarkCases: JSON.parse(JSON.stringify(article.landmarkCases || [])) });
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(null);
//     setEditData({});
//   };

//   const handleSaveEdit = async () => {
//     try {
//       setIsSaving(true);

//       // --- ROBUST ID EXTRACTION ---
//       // 1. Try to use the raw 'id' from backend (if available from my updated route)
//       // 2. Fallback to URL params (usually correct: "18", "0")
//       // 3. Fallback to extracting from Title (e.g. "Article 18" -> "18")
//       let rawNum = article.id || params.articleId;

//       if (!rawNum) {
//         if (article.articleNumber === 'Preamble') {
//            rawNum = '0';
//         } else {
//            // Removes "Article" and spaces, case insensitive
//            rawNum = article.articleNumber.replace(/Article\s*/i, '').trim();
//         }
//       }

//       console.log(`💾 Saving Article. Target ID: "${rawNum}"`);

//       const response: any = await articleAPI.updateArticle(rawNum, editData);

//       if (response?.success) {
//         setArticle((prev: any) => ({
//           ...prev,
//           ...editData
//         }));
//         setIsEditing(null);
//         setEditData({});
//       } else {
//         alert("Failed to save changes.");
//       }
//     } catch (error: any) {
//       console.error("Error saving article:", error);
//       alert(`Error: ${error.message || "Failed to save"}. Check console for details.`);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleListChange = (index: number, value: string) => {
//     const newList = [...editData.keyPoints];
//     newList[index] = value;
//     setEditData({ ...editData, keyPoints: newList });
//   };
//   const handleAddListItem = () => {
//     setEditData({ ...editData, keyPoints: [...editData.keyPoints, "New Point"] });
//   };
//   const handleRemoveListItem = (index: number) => {
//     const newList = [...editData.keyPoints];
//     newList.splice(index, 1);
//     setEditData({ ...editData, keyPoints: newList });
//   };

//   const handleCaseChange = (index: number, field: 'name' | 'significance', value: string) => {
//     const newCases = [...editData.landmarkCases];
//     newCases[index] = { ...newCases[index], [field]: value };
//     setEditData({ ...editData, landmarkCases: newCases });
//   };
//   const handleAddCase = () => {
//     setEditData({ ...editData, landmarkCases: [...editData.landmarkCases, { name: "New Case", significance: "Significance" }] });
//   };
//   const handleRemoveCase = (index: number) => {
//     const newCases = [...editData.landmarkCases];
//     newCases.splice(index, 1);
//     setEditData({ ...editData, landmarkCases: newCases });
//   };

//   // --- NAVIGATION HANDLERS ---
//   const handlePreviousArticle = () => {
//     if (currentIndex > 0) {
//       const prevArticle = allArticles[currentIndex - 1];
//       let artNum = "";
//       if (prevArticle.article === "Preamble") {
//         artNum = "0";
//       } else {
//         const match = prevArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
//         if (match) artNum = match[1];
//         else if (prevArticle.id) {
//           const idMatch = prevArticle.id.match(/article-(\d+[A-Za-z]*)/);
//           if (idMatch) artNum = idMatch[1];
//         }
//       }
//       if (artNum) navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum, allArticles, currentIndex: currentIndex - 1, partName: articleData?.partName, partTitle: articleData?.partTitle } });
//     }
//   };

//   const handleNextArticle = () => {
//     if (currentIndex < allArticles.length - 1) {
//       const nextArticle = allArticles[currentIndex + 1];
//       let artNum = "";
//       if (nextArticle.article === "Preamble") {
//         artNum = "0";
//       } else {
//         const match = nextArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
//         if (match) artNum = match[1];
//         else if (nextArticle.id) {
//           const idMatch = nextArticle.id.match(/article-(\d+[A-Za-z]*)/);
//           if (idMatch) artNum = idMatch[1];
//         }
//       }
//       if (artNum) navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum, allArticles, currentIndex: currentIndex + 1, partName: articleData?.partName, partTitle: articleData?.partTitle } });
//     }
//   };

//   const handleBackToPart = () => {
//     if (articleData?.partName) {
//       const partId = articleData.partName.toLowerCase().replace(/\s+/g, '-');
//       navigate(`/learn/part/${partId}`, { state: { partName: articleData.partName, partTitle: articleData.partTitle } });
//     } else if (article?.part?.name) {
//       const partId = article.part.name.toLowerCase().replace(/\s+/g, '-');
//       navigate(`/learn/part/${partId}`, { state: { partName: article.part.name, partTitle: article.part.name } });
//     } else {
//       navigate('/learn');
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     const colors: { [key: string]: string } = {
//       "fundamental-rights": "from-blue-500 to-cyan-500",
//       "directive-principles": "from-purple-500 to-pink-500",
//       union: "from-orange-500 to-red-500",
//       other: "from-green-500 to-emerald-500",
//     };
//     return colors[category] || "from-orange-500 to-red-500";
//   };

//   const handleToggleBookmark = async () => {
//     if (!article) return;
//     const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
//     if (!raw) return;
//     const num = normalizeArticleId(raw);
//     const partName = article.part?.name || articleData?.partName;
//     try {
//       const res: any = await progressAPI.toggleBookmark(num, partName);
//       if (res?.success) setIsBookmarked(res.bookmarked);
//     } catch (e) {
//       console.error("toggleBookmark failed", e);
//       alert("Failed to update bookmark");
//     }
//   };

//   const handleRelatedArticleClick = async (related: any) => {
//     let artNum = related.number;
//     if(related.number.includes('Article')) artNum = related.number.replace('Article', '').trim();
//     navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum } });
//   };

//   if (loading) {
//     return (
//       <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center justify-center py-20">
//         <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
//         <p className="text-slate-400 text-lg">Loading article...</p>
//       </div>
//     );
//   }

//   if (error || !article) {
//     return (
//       <div className="w-full max-w-6xl animate-fade-in">
//         <Card className="text-center py-16 border-red-500/50">
//           <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
//           <p className="text-slate-400 mb-6">{error || "The requested article could not be found."}</p>
//           <Button onClick={handleBackToPart}>Back to Part</Button>
//         </Card>
//       </div>
//     );
//   }

//   const hasPrevious = currentIndex > 0;
//   const hasNext = currentIndex < allArticles.length - 1;

//   return (
//     <div className="w-full max-w-6xl animate-fade-in pb-32">
//       {/* Back Button */}
//       <button onClick={handleBackToPart} className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group">
//         <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//         <span>Back to {articleData?.partTitle || article?.part?.name || "Part"}</span>
//       </button>

//       {/* Header Section */}
//       <div className="relative mb-8">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
//         <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//             <div className="flex-1">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
//                 <BookMarked className="w-4 h-4 text-orange-400" />
//                 <span className="text-orange-400 font-semibold text-sm">{article.part?.name || "Unknown Part"}</span>
//               </div>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(article.part?.category || "other")} rounded-2xl flex items-center justify-center shadow-lg`}>
//                   <Scale className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{article.articleNumber}</h1>
//                   <p className="text-slate-400 text-sm mt-1">Indian Constitution</p>
//                 </div>
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{article.articleName}</h2>
//               {article.subject && (
//                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
//                   <span className="text-blue-400 text-sm font-medium">{article.subject}</span>
//                 </div>
//               )}
//             </div>
//             <div className="flex md:flex-col gap-2">
//               <button
//                 onClick={handleToggleBookmark}
//                 className={`p-3 rounded-xl transition-all ${isBookmarked ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
//                 title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
//               >
//                 <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
//               </button>
//               <button className="p-3 bg-slate-700 text-slate-400 rounded-xl hover:bg-slate-600 transition-all" title="Share article">
//                 <Share2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Content Tabs */}
//       <div className="flex gap-2 mb-6">
//         <button
//           onClick={() => setActiveTab("simplified")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === "simplified" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
//           }`}
//         >
//           <Lightbulb className="w-5 h-5" />
//           Simplified Explanation
//         </button>
//         <button
//           onClick={() => setActiveTab("original")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === "original" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
//           }`}
//         >
//           <FileText className="w-5 h-5" />
//           Original Text
//         </button>
//       </div>

//       {/* SIMPLIFIED EXPLANATION TAB */}
//       {activeTab === "simplified" ? (
//         <Card className="mb-8 animate-fade-in relative group">
//           {isAdmin && !isEditing && (
//             <button 
//               onClick={() => handleEditClick('simplified')}
//               className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
//               title="Edit Content"
//             >
//               <Pencil className="w-4 h-4" />
//             </button>
//           )}

//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//               <Lightbulb className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Easy to Understand</h3>
//           </div>

//           {isEditing === 'simplified' ? (
//             <div className="space-y-4">
//               <textarea
//                 value={editData.simplifiedDescription}
//                 onChange={(e) => setEditData({...editData, simplifiedDescription: e.target.value})}
//                 className="w-full h-64 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-y"
//               />
//               <div className="flex justify-end gap-3">
//                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
//                  <Button onClick={handleSaveEdit} disabled={isSaving}>
//                     {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
//                  </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="prose prose-invert max-w-none">
//               {article.simplifiedDescription?.split("\n\n").map((paragraph: string, index: number) => (
//                 <p key={index} className="text-slate-300 leading-relaxed mb-4 text-lg">{paragraph}</p>
//               ))}
//             </div>
//           )}
//         </Card>
//       ) : (
//         <Card className="mb-8 animate-fade-in">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
//               <FileText className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Constitutional Text</h3>
//           </div>
//           <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-lg">
//             <p className="text-slate-200 text-xl leading-relaxed italic font-serif whitespace-pre-wrap">"{article.originalText}"</p>
//           </div>
//           <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
//             <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//             <p className="text-blue-200 text-sm">
//               This is the exact text as written in the Constitution of India. The simplified version explains this in everyday language.
//             </p>
//           </div>
//         </Card>
//       )}

//       {/* KEY POINTS */}
//       {(article.keyPoints?.length > 0 || isAdmin) && (
//         <Card className="mb-8 relative group">
//            {isAdmin && !isEditing && (
//             <button 
//               onClick={() => handleEditClick('keyPoints')}
//               className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
//               title="Edit Key Points"
//             >
//               <Pencil className="w-4 h-4" />
//             </button>
//           )}

//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
//               <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Key Points</h3>
//           </div>

//           {isEditing === 'keyPoints' ? (
//              <div className="space-y-4">
//                {editData.keyPoints.map((point: string, index: number) => (
//                  <div key={index} className="flex gap-2">
//                    <div className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-full">{index + 1}</div>
//                    <input
//                      value={point}
//                      onChange={(e) => handleListChange(index, e.target.value)}
//                      className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
//                    />
//                    <button onClick={() => handleRemoveListItem(index)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
//                      <Trash2 className="w-5 h-5" />
//                    </button>
//                  </div>
//                ))}
//                <Button variant="secondary" onClick={handleAddListItem} className="w-full border-dashed border-2 border-slate-600 hover:border-orange-500">
//                  <Plus className="w-4 h-4 mr-2" /> Add Key Point
//                </Button>
//                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
//                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
//                  <Button onClick={handleSaveEdit} disabled={isSaving}>
//                     {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
//                  </Button>
//                </div>
//              </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-4">
//               {article.keyPoints?.map((point: string, index: number) => (
//                 <div key={index} className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors group">
//                   <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <CheckCircle className="w-4 h-4 text-white" />
//                   </div>
//                   <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{point}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {/* HISTORICAL CONTEXT */}
//       {(article.historicalContext !== "Not available" || isAdmin) && (
//           <Card className="mb-8 relative group">
//             {isAdmin && !isEditing && (
//               <button 
//                 onClick={() => handleEditClick('historical')}
//                 className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
//                 title="Edit Historical Context"
//               >
//                 <Pencil className="w-4 h-4" />
//               </button>
//             )}

//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white">Historical Context</h3>
//             </div>

//             {isEditing === 'historical' ? (
//               <div className="space-y-4">
//                  <textarea
//                   value={editData.historicalContext}
//                   onChange={(e) => setEditData({...editData, historicalContext: e.target.value})}
//                   className="w-full h-48 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-300 focus:border-orange-500 outline-none resize-y"
//                 />
//                 <div className="flex justify-end gap-3">
//                   <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
//                   <Button onClick={handleSaveEdit} disabled={isSaving}>
//                     {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-slate-300 leading-relaxed text-lg">{article.historicalContext}</p>
//             )}
//           </Card>
//         )}

//       {/* LANDMARK CASES */}
//       {(article.landmarkCases?.length > 0 || isAdmin) && (
//         <Card className="mb-8 relative group">
//           {isAdmin && !isEditing && (
//             <button 
//               onClick={() => handleEditClick('landmark')}
//               className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
//               title="Edit Landmark Cases"
//             >
//               <Pencil className="w-4 h-4" />
//             </button>
//           )}

//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
//               <Scale className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Landmark Cases</h3>
//           </div>

//           {isEditing === 'landmark' ? (
//              <div className="space-y-6">
//                {editData.landmarkCases.map((caseItem: any, index: number) => (
//                  <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3 relative">
//                     <button 
//                       onClick={() => handleRemoveCase(index)} 
//                       className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                     <div>
//                       <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Case Name</label>
//                       <input
//                         value={caseItem.name}
//                         onChange={(e) => handleCaseChange(index, 'name', e.target.value)}
//                         className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Significance</label>
//                       <textarea
//                         value={caseItem.significance}
//                         onChange={(e) => handleCaseChange(index, 'significance', e.target.value)}
//                         className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 focus:border-orange-500 outline-none h-20"
//                       />
//                     </div>
//                  </div>
//                ))}
//                <Button variant="secondary" onClick={handleAddCase} className="w-full border-dashed border-2 border-slate-600 hover:border-orange-500">
//                  <Plus className="w-4 h-4 mr-2" /> Add Landmark Case
//                </Button>
//                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
//                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
//                  <Button onClick={handleSaveEdit} disabled={isSaving}>
//                     {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
//                  </Button>
//                </div>
//              </div>
//           ) : (
//             <div className="space-y-4">
//               {article.landmarkCases?.map((case_: any, index: number) => (
//                 <div key={index} className="p-5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors">
//                   <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
//                     <ChevronRight className="w-5 h-5 text-orange-400" />
//                     {case_.name}
//                   </h4>
//                   {case_.significance && <p className="text-slate-400 ml-7">{case_.significance}</p>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {/* RELATED ARTICLES */}
//       {article.relatedArticles && article.relatedArticles.length > 0 && (
//         <Card className="mb-8">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
//               <BookMarked className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Related Articles</h3>
//           </div>
//           <div className="grid md:grid-cols-3 gap-4">
//             {article.relatedArticles.map((related: any, index: number) => (
//               <button
//                 key={index}
//                 onClick={() => handleRelatedArticleClick(related)}
//                 className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all text-left group border border-slate-600 hover:border-orange-500/50 cursor-pointer"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="font-bold text-orange-400 group-hover:text-orange-300 transition-colors">{related.number}</div>
//                   <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
//                 </div>
//                 <div className="text-slate-300 text-sm group-hover:text-white transition-colors">{related.name}</div>
//                 <div className="mt-2 text-xs text-slate-500 group-hover:text-slate-400 flex items-center gap-1">
//                   <span>Click to view</span>
//                   <span>→</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* NAVIGATION CONTROL BAR */}
//       {allArticles.length > 0 && (
//         <Card className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700">
//           <div className="flex items-center justify-between gap-6 py-4">
//             <button
//               onClick={handlePreviousArticle}
//               disabled={!hasPrevious}
//               className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all border-2 ${
//                 hasPrevious ? "border-orange-500 text-orange-400 hover:bg-orange-500/10" : "border-slate-700 text-slate-600 cursor-not-allowed"
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5" />
//               <span>Previous</span>
//             </button>
//             <div className="text-center flex-1">
//               <div className="text-slate-300 font-semibold text-lg">Article {currentIndex + 1} of {allArticles.length}</div>
//               <div className="text-slate-500 text-sm mt-1">{article.part?.name || "Constitution"}</div>
//             </div>
//             <button
//               onClick={handleNextArticle}
//               disabled={!hasNext}
//               className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
//                 hasNext ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg" : "bg-slate-700 text-slate-600 cursor-not-allowed"
//               }`}
//             >
//               <span>Next</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="mt-4 pt-4 border-t border-slate-700">
//             <div className="w-full bg-slate-800 rounded-full h-2">
//               <div
//                 className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${((currentIndex + 1) / allArticles.length) * 100}%` }}
//               />
//             </div>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };













// frontend/src/pages/ArticlePage.tsx
// frontend/src/pages/ArticlePage.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Lightbulb,
  Scale,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Bookmark,
  ArrowLeft,
  Sparkles,
  Info,
  BookMarked,
  Loader,
  AlertCircle,
  Share2,
  Pencil,
  Save,
  Plus,
  Trash2,
  Volume2,
  VolumeX
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { articleAPI, progressAPI } from "../services/api";
import { normalizeArticleId } from "../utils/articleNumber";
import { UserData } from "../App";

interface ArticlePageProps {
  user?: UserData | null;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ user }) => {
  const navigate = useNavigate();
  const params = useParams<{ articleId: string }>();
  const location = useLocation();

  const articleData = location.state as any;
  const articleNumber = params.articleId || articleData?.articleNumber;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"simplified" | "original">("simplified");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Text-to-speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Editing state
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = user?.type === 'admin';

  useEffect(() => {
    if (articleNumber) {
      fetchArticle(articleNumber);
      if (articleData?.allArticles) {
        setAllArticles(articleData.allArticles);
        setCurrentIndex(articleData.currentIndex || 0);
      }
    } else {
      setError("No article number provided");
      setLoading(false);
    }
  }, [articleNumber, articleData]);

  const fetchArticle = async (artNum: string) => {
    try {
      setLoading(true);
      setError(null);

      const response: any = await articleAPI.getArticle(artNum);

      if (response?.success) {
        setArticle(response.data);

        if (response.data?.part?.name) {
          const partName = response.data.part.name;
          const partArticles: any = await articleAPI.getArticlesByPart(partName);

          if (partArticles?.success) {
            setAllArticles(partArticles.data);
            const normalize = (val: any) => String(val).replace("Article ", "").trim();
            const index = partArticles.data.findIndex(
              (a: any) => normalize(a.article) === normalize(artNum)
            );
            setCurrentIndex(index >= 0 ? index : 0);
          }
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Failed to load article data");
      }
    } catch (err: any) {
      console.error("❌ Error fetching article:", err);
      setError("Failed to load article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech Handler
  const handleTTS = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const element = document.getElementById("article-content");
    if (!element) return;

    const text = element.innerText;
    const utterance = new SpeechSynthesisUtterance(text);

    // Detect language based on characters
    if (/[\u0900-\u097F]/.test(text)) {
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
    } else if (/[\u0A80-\u0AFF]/.test(text)) {
      utterance.lang = "gu-IN";
      utterance.rate = 0.9;
    } else {
      utterance.lang = "en-IN";
      utterance.rate = 0.9;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Cleanup speech on component unmount or navigation
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop speech when navigating to another article
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [articleNumber]);

  useEffect(() => {
    if (!article) return;
    const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
    if (!raw) return;
    const num = normalizeArticleId(raw);
    const partName = article.part?.name || articleData?.partName;
    progressAPI.markArticleRead(num, partName).catch((e: any) => console.error("markArticleRead failed:", e));
  }, [article?.id]);

  useEffect(() => {
    const loadBookmarkState = async () => {
      if (!article) return;
      const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
      if (!raw) return;
      const num = normalizeArticleId(raw);
      try {
        const res: any = await progressAPI.getDashboard();
        if (!res?.success) return;
        const { bookmarks } = res;
        const isBookmarkedNow = (bookmarks || []).some((b: any) => String(b.articleNumber) === num);
        setIsBookmarked(isBookmarkedNow);
      } catch (e) {
        console.error("Failed to load bookmark state:", e);
      }
    };
    loadBookmarkState();
  }, [article, articleNumber]);

  // Admin edit handlers
  const handleEditClick = (section: string) => {
    setIsEditing(section);
    if (section === 'simplified') setEditData({ simplifiedDescription: article.simplifiedDescription });
    if (section === 'historical') setEditData({ historicalContext: article.historicalContext });
    if (section === 'keyPoints') setEditData({ keyPoints: [...(article.keyPoints || [])] });
    if (section === 'landmark') setEditData({ landmarkCases: JSON.parse(JSON.stringify(article.landmarkCases || [])) });
    if (section === 'related') setEditData({ relatedArticles: JSON.parse(JSON.stringify(article.relatedArticles || [])) });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditData({});
  };

  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);
      let rawNum = article.id || params.articleId;

      if (!rawNum) {
        if (article.articleNumber === 'Preamble') {
          rawNum = '0';
        } else {
          rawNum = article.articleNumber.replace(/Article\s*/i, '').trim();
        }
      }

      const response: any = await articleAPI.updateArticle(rawNum, editData);

      if (response?.success) {
        setArticle((prev: any) => ({ ...prev, ...editData }));
        setIsEditing(null);
        setEditData({});
      } else {
        alert("Failed to save changes.");
      }
    } catch (error: any) {
      console.error("Error saving article:", error);
      alert(`Error: ${error.message || "Failed to save"}. Check console for details.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleListChange = (index: number, value: string) => {
    const newList = [...editData.keyPoints];
    newList[index] = value;
    setEditData({ ...editData, keyPoints: newList });
  };

  const handleAddListItem = () => {
    setEditData({ ...editData, keyPoints: [...editData.keyPoints, "New Point"] });
  };

  const handleRemoveListItem = (index: number) => {
    const newList = [...editData.keyPoints];
    newList.splice(index, 1);
    setEditData({ ...editData, keyPoints: newList });
  };

  const handleCaseChange = (index: number, field: 'name' | 'significance', value: string) => {
    const newCases = [...editData.landmarkCases];
    newCases[index] = { ...newCases[index], [field]: value };
    setEditData({ ...editData, landmarkCases: newCases });
  };

  const handleAddCase = () => {
    setEditData({ ...editData, landmarkCases: [...editData.landmarkCases, { name: "New Case", significance: "Significance" }] });
  };

  const handleRemoveCase = (index: number) => {
    const newCases = [...editData.landmarkCases];
    newCases.splice(index, 1);
    setEditData({ ...editData, landmarkCases: newCases });
  };

  const handleRelatedChange = (index: number, field: 'number' | 'name', value: string) => {
    const newRelated = [...editData.relatedArticles];
    newRelated[index] = { ...newRelated[index], [field]: value };
    setEditData({ ...editData, relatedArticles: newRelated });
  };

  const handleAddRelated = () => {
    setEditData({ ...editData, relatedArticles: [...editData.relatedArticles, { number: "Article ", name: "" }] });
  };

  const handleRemoveRelated = (index: number) => {
    const newRelated = [...editData.relatedArticles];
    newRelated.splice(index, 1);
    setEditData({ ...editData, relatedArticles: newRelated });
  };

  const handlePreviousArticle = () => {
    if (currentIndex > 0) {
      const prevArticle = allArticles[currentIndex - 1];
      let artNum = "";
      if (prevArticle.article === "Preamble") {
        artNum = "0";
      } else {
        const match = prevArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
        if (match) artNum = match[1];
        else if (prevArticle.id) {
          const idMatch = prevArticle.id.match(/article-(\d+[A-Za-z]*)/);
          if (idMatch) artNum = idMatch[1];
        }
      }
      if (artNum) navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum, allArticles, currentIndex: currentIndex - 1, partName: articleData?.partName, partTitle: articleData?.partTitle } });
    }
  };

  const handleNextArticle = () => {
    if (currentIndex < allArticles.length - 1) {
      const nextArticle = allArticles[currentIndex + 1];
      let artNum = "";
      if (nextArticle.article === "Preamble") {
        artNum = "0";
      } else {
        const match = nextArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
        if (match) artNum = match[1];
        else if (nextArticle.id) {
          const idMatch = nextArticle.id.match(/article-(\d+[A-Za-z]*)/);
          if (idMatch) artNum = idMatch[1];
        }
      }
      if (artNum) navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum, allArticles, currentIndex: currentIndex + 1, partName: articleData?.partName, partTitle: articleData?.partTitle } });
    }
  };

  const handleBackToPart = () => {
    if (articleData?.partName) {
      const partId = articleData.partName.toLowerCase().replace(/\s+/g, '-');
      navigate(`/learn/part/${partId}`, { state: { partName: articleData.partName, partTitle: articleData.partTitle } });
    } else if (article?.part?.name) {
      const partId = article.part.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/learn/part/${partId}`, { state: { partName: article.part.name, partTitle: article.part.name } });
    } else {
      navigate('/learn');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "fundamental-rights": "from-blue-500 to-cyan-500",
      "directive-principles": "from-purple-500 to-pink-500",
      union: "from-orange-500 to-red-500",
      other: "from-green-500 to-emerald-500",
    };
    return colors[category] || "from-orange-500 to-red-500";
  };

  const handleToggleBookmark = async () => {
    if (!article) return;
    const raw = article.articleNumber != null ? String(article.articleNumber) : articleNumber;
    if (!raw) return;
    const num = normalizeArticleId(raw);
    const partName = article.part?.name || articleData?.partName;
    try {
      const res: any = await progressAPI.toggleBookmark(num, partName);
      if (res?.success) setIsBookmarked(res.bookmarked);
    } catch (e) {
      console.error("toggleBookmark failed", e);
      alert("Failed to update bookmark");
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: article.articleName,
        text: `Read ${article.articleNumber} - ${article.articleName}`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleRelatedArticleClick = async (related: any) => {
    let artNum = related.number;
    if (related.number.includes('Article')) artNum = related.number.replace('Article', '').trim();
    navigate(`/learn/article/${artNum}`, { state: { articleNumber: artNum } });
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center justify-center py-20">
        <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
        <p className="text-slate-400 text-lg">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full max-w-6xl animate-fade-in">
        <Card className="text-center py-16 border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
          <p className="text-slate-400 mb-6">{error || "The requested article could not be found."}</p>
          <Button onClick={handleBackToPart}>Back to Part</Button>
        </Card>
      </div>
    );
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allArticles.length - 1;

  return (
    <div className="w-full max-w-6xl animate-fade-in pb-32">
      {/* Back Button */}
      <button onClick={handleBackToPart} className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to {articleData?.partTitle || article?.part?.name || "Part"}</span>
      </button>

      {/* Header Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                <BookMarked className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-semibold text-sm">{article.part?.name || "Unknown Part"}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(article.part?.category || "other")} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{article.articleNumber}</h1>
                  <p className="text-slate-400 text-sm mt-1">Indian Constitution</p>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{article.articleName}</h2>
              {article.subject && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">{article.subject}</span>
                </div>
              )}
            </div>
            <div className="flex md:flex-col gap-2">
              <button
                onClick={handleToggleBookmark}
                className={`p-3 rounded-xl transition-all ${isBookmarked ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
                title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-slate-700 text-slate-400 rounded-xl hover:bg-slate-600 transition-all"
                title="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Tabs */}
      <div className="grid grid-cols-2 gap-3 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("simplified")}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base min-w-[160px] ${activeTab === "simplified" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
        >
          <Lightbulb className="w-5 h-5" />
          Simplified
        </button>
        <button
          onClick={() => setActiveTab("original")}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base min-w-[160px] ${activeTab === "original" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
        >
          <FileText className="w-5 h-5" />
          Original
        </button>
      </div>

      {/* SIMPLIFIED EXPLANATION TAB */}
      {activeTab === "simplified" ? (
        <Card className="mb-8 animate-fade-in relative group">
          {isAdmin && !isEditing && (
            <button
              onClick={() => handleEditClick('simplified')}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              title="Edit Content"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleTTS}
              className={`p-3 rounded-xl transition-all ${isSpeaking
                  ? "bg-green-500 text-white animate-pulse"
                  : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              title={isSpeaking ? "Stop reading" : "Listen to article"}
            >
              {isSpeaking ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <h3 className="text-2xl font-bold text-white">Easy to Understand</h3>
          </div>

          {isEditing === 'simplified' ? (
            <div className="space-y-4">
              <textarea
                value={editData.simplifiedDescription}
                onChange={(e) => setEditData({ ...editData, simplifiedDescription: e.target.value })}
                className="w-full h-64 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-y"
              />
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div id="article-content" className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                {article.simplifiedDescription}
              </ReactMarkdown>
            </div>
          )}
        </Card>
      ) : (
        <Card className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Constitutional Text</h3>
          </div>
          <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-lg">
            <p className="text-slate-200 text-xl leading-relaxed italic font-serif whitespace-pre-wrap">"{article.originalText}"</p>
          </div>
          <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-200 text-sm">
              This is the exact text as written in the Constitution of India. The simplified version explains this in everyday language.
            </p>
          </div>
        </Card>
      )}

      {/* KEY POINTS */}
      {(article.keyPoints?.length > 0 || isAdmin) && (
        <Card className="mb-8 relative group">
          {isAdmin && !isEditing && (
            <button
              onClick={() => handleEditClick('keyPoints')}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              title="Edit Key Points"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Key Points</h3>
          </div>

          {isEditing === 'keyPoints' ? (
            <div className="space-y-4">
              {editData.keyPoints.map((point: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-full">{index + 1}</div>
                  <input
                    value={point}
                    onChange={(e) => handleListChange(index, e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                  />
                  <button onClick={() => handleRemoveListItem(index)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddListItem} className="w-full border-dashed border-2 border-slate-600 hover:border-orange-500">
                <Plus className="w-4 h-4 mr-2" /> Add Key Point
              </Button>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {article.keyPoints?.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors group">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{point}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* HISTORICAL CONTEXT */}
      {(article.historicalContext !== "Not available" || isAdmin) && (
        <Card className="mb-8 relative group">
          {isAdmin && !isEditing && (
            <button
              onClick={() => handleEditClick('historical')}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              title="Edit Historical Context"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Historical Context</h3>
          </div>

          {isEditing === 'historical' ? (
            <div className="space-y-4">
              <textarea
                value={editData.historicalContext}
                onChange={(e) => setEditData({ ...editData, historicalContext: e.target.value })}
                className="w-full h-48 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-300 focus:border-orange-500 outline-none resize-y"
              />
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-slate-300 leading-relaxed text-lg">{article.historicalContext}</p>
          )}
        </Card>
      )}

      {/* LANDMARK CASES */}
      {(article.landmarkCases?.length > 0 || isAdmin) && (
        <Card className="mb-8 relative group">
          {isAdmin && !isEditing && (
            <button
              onClick={() => handleEditClick('landmark')}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              title="Edit Landmark Cases"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Landmark Cases</h3>
          </div>

          {isEditing === 'landmark' ? (
            <div className="space-y-6">
              {editData.landmarkCases.map((caseItem: any, index: number) => (
                <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3 relative">
                  <button
                    onClick={() => handleRemoveCase(index)}
                    className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Case Name</label>
                    <input
                      value={caseItem.name}
                      onChange={(e) => handleCaseChange(index, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Significance</label>
                    <textarea
                      value={caseItem.significance}
                      onChange={(e) => handleCaseChange(index, 'significance', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 focus:border-orange-500 outline-none h-20"
                    />
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddCase} className="w-full border-dashed border-2 border-slate-600 hover:border-orange-500">
                <Plus className="w-4 h-4 mr-2" /> Add Landmark Case
              </Button>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {article.landmarkCases?.map((case_: any, index: number) => (
                <div key={index} className="p-5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors">
                  <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-orange-400" />
                    {case_.name}
                  </h4>
                  {case_.significance && <p className="text-slate-400 ml-7">{case_.significance}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* RELATED ARTICLES */}
      {(article.relatedArticles?.length > 0 || isAdmin) && (
        <Card className="mb-8 relative group">
          {isAdmin && !isEditing && (
            <button
              onClick={() => handleEditClick('related')}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              title="Edit Related Articles"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Related Articles</h3>
          </div>

          {isEditing === 'related' ? (
            <div className="space-y-6">
              {editData.relatedArticles.map((relatedItem: any, index: number) => (
                <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3 relative">
                  <button
                    onClick={() => handleRemoveRelated(index)}
                    className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Article Number</label>
                      <input
                        value={relatedItem.number}
                        onChange={(e) => handleRelatedChange(index, 'number', e.target.value)}
                        placeholder="e.g. Article 14"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Article Name</label>
                      <input
                        value={relatedItem.name}
                        onChange={(e) => handleRelatedChange(index, 'name', e.target.value)}
                        placeholder="e.g. Right to Equality"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddRelated} className="w-full border-dashed border-2 border-slate-600 hover:border-orange-500">
                <Plus className="w-4 h-4 mr-2" /> Add Related Article
              </Button>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {article.relatedArticles?.map((related: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleRelatedArticleClick(related)}
                  className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all text-left group border border-slate-600 hover:border-orange-500/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-orange-400 group-hover:text-orange-300 transition-colors">{related.number}</div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <div className="text-slate-300 text-sm group-hover:text-white transition-colors">{related.name}</div>
                  <div className="mt-2 text-xs text-slate-500 group-hover:text-slate-400 flex items-center gap-1">
                    <span>Click to view</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* NAVIGATION CONTROL BAR */}
      {allArticles.length > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
            <button
              onClick={handlePreviousArticle}
              disabled={!hasPrevious}
              className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all border-2 text-sm sm:text-base ${hasPrevious
                  ? "border-orange-500 text-orange-400 hover:bg-orange-500/10"
                  : "border-slate-700 text-slate-600 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <div className="text-center flex-1">
              <div className="text-slate-300 font-semibold text-lg">Article {currentIndex + 1} of {allArticles.length}</div>
              <div className="text-slate-500 text-sm mt-1">{article.part?.name || "Constitution"}</div>
            </div>
            <button
              onClick={handleNextArticle}
              disabled={!hasNext}
              className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${hasNext
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg"
                  : "bg-slate-700 text-slate-600 cursor-not-allowed"
                }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / allArticles.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};