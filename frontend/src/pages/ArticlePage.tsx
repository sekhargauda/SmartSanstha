// frontend/src/pages/ArticlePage.tsx

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Lightbulb,
  Scale,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  Share2,
  Bookmark,
  ArrowLeft,
  Sparkles,
  Info,
  BookMarked,
  Brain,
  Target,
  Loader,
  AlertCircle,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import { articleAPI, quizAPI, progressAPI } from "../services/api";
import { normalizeArticleId } from "../utils/articleNumber";

interface ArticlePageProps {
  onNavigate: (page: string, data?: any) => void;
  articleData?: {
    articleNumber: string;
    allArticles?: any[]; // All articles in the current part
    currentIndex?: number; // Current article index in the part
    partName?: string; // Add this
    partTitle?: string; // Add this
  };
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  onNavigate,
  articleData,
}) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"simplified" | "original">(
    "simplified"
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Navigation state
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- NEW ADAPTIVE QUIZ STATE ---
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [quizId, setQuizId] = useState<string | null>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<any>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- END NEW QUIZ STATE ---

  useEffect(() => {
    if (articleData?.articleNumber) {
      fetchArticle(articleData.articleNumber);

      // Set up navigation data if provided
      if (articleData.allArticles) {
        setAllArticles(articleData.allArticles);
        setCurrentIndex(articleData.currentIndex || 0);
      }
    } else {
      setError("No article number provided");
      setLoading(false);
    }
  }, [articleData]);

  const fetchArticle = async (articleNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📄 Fetching article ${articleNumber}...`);

      const response: any = await articleAPI.getArticle(articleNumber);

      if (response?.success) {
        setArticle(response.data);
        console.log("✅ Article loaded:", response.data.articleName);
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

  // --- NEW: mark article as read when loaded ---

  useEffect(() => {
    if (!article) return;

    const raw =
      article.articleNumber != null
        ? String(article.articleNumber)
        : articleData?.articleNumber;
    if (!raw) return;

    const num = normalizeArticleId(raw);
    const partName = article.part?.name || articleData?.partName;

    progressAPI
      .markArticleRead(num, partName)
      .catch((e: any) => console.error("markArticleRead failed:", e));
  }, [article, articleData]);

  // --- NEW: load bookmark state when article loads ---
useEffect(() => {
  const loadBookmarkState = async () => {
    if (!article) return;

    const raw =
      article.articleNumber != null
        ? String(article.articleNumber)
        : articleData?.articleNumber;
    if (!raw) return;

    const num = normalizeArticleId(raw);

    try {
      const res: any = await progressAPI.getDashboard();
      if (!res?.success) return;

      const { bookmarks } = res;

      const isBookmarkedNow = (bookmarks || []).some(
        (b: any) => String(b.articleNumber) === num
      );

      setIsBookmarked(isBookmarkedNow);
    } catch (e) {
      console.error("Failed to load bookmark state:", e);
    }
  };

  loadBookmarkState();
}, [article, articleData]);
  

  const handlePreviousArticle = () => {
    if (currentIndex > 0) {
      const prevArticle = allArticles[currentIndex - 1];
      let articleNumber = "";
      if (prevArticle.article === "Preamble") {
        articleNumber = "0";
      } else {
        const match = prevArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
        if (match) articleNumber = match[1];
        else if (prevArticle.id) {
          const idMatch = prevArticle.id.match(/article-(\d+[A-Za-z]*)/);
          if (idMatch) articleNumber = idMatch[1];
        }
      }
      if (articleNumber) {
        onNavigate("article", {
          articleNumber,
          allArticles: allArticles,
          currentIndex: currentIndex - 1,
          partName: articleData?.partName,
          partTitle: articleData?.partTitle,
        });
      }
    }
  };

  const handleNextArticle = () => {
    if (currentIndex < allArticles.length - 1) {
      const nextArticle = allArticles[currentIndex + 1];
      let articleNumber = "";
      if (nextArticle.article === "Preamble") {
        articleNumber = "0";
      } else {
        const match = nextArticle.article?.match(/Article\s+(\d+[A-Za-z]*)/);
        if (match) articleNumber = match[1];
        else if (nextArticle.id) {
          const idMatch = nextArticle.id.match(/article-(\d+[A-Za-z]*)/);
          if (idMatch) articleNumber = idMatch[1];
        }
      }
      if (articleNumber) {
        onNavigate("article", {
          articleNumber,
          allArticles: allArticles,
          currentIndex: currentIndex + 1,
          partName: articleData?.partName,
          partTitle: articleData?.partTitle,
        });
      }
    }
  };

  // --- UPDATED QUIZ HANDLERS ---

  const handleStartQuiz = async () => {
    try {
      setQuizLoading(true);
      // Use the article's part name as the topic
      const topic = article?.part?.name || articleData?.partName || "General";
      console.log(`🎯 Starting quiz for topic: ${topic}...`);

      const response: any = await quizAPI.startQuiz(topic);

      if (response?.success) {
        setQuizId(response.quizId);
        setCurrentQuizQuestion(response.question);
        setQuestionNumber(response.questionNumber);
        setTotalQuestions(response.totalQuestions);

        setShowQuiz(true);
        setShowResults(false);
        setSelectedAnswer(null);
        setLastResult(null);
        setQuizHistory([]); // Clear history
        setFinalScore(0);

        console.log("✅ Quiz started with ID:", response.quizId);
      } else {
        alert(
          "Failed to start quiz. This feature requires Google Gemini API configuration."
        );
      }
    } catch (err: any) {
      console.error("❌ Error starting quiz:", err);
      alert(
        "Quiz generation is not available yet. Please configure Google Gemini API in the backend."
      );
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    // Only set the single selected answer
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !quizId || !currentQuizQuestion?.id) return;
    if (isSubmitting) return; // Prevent double submit

    try {
      setIsSubmitting(true);
      const response: any = await quizAPI.submitAnswer(
        quizId,
        currentQuizQuestion.id,
        selectedAnswer
      );

      if (response?.success) {
        // Store history for the results page
        setQuizHistory((prev) => [
          ...prev,
          {
            question: currentQuizQuestion,
            answer: selectedAnswer,
            result: response.result,
          },
        ]);
        setLastResult(response.result); // Store for immediate feedback (if needed)

        if (response.quizOver) {
          console.log("✅ Quiz finished. Final Score:", response.finalScore);
          setFinalScore(response.finalScore);
          setShowResults(true);
          setCurrentQuizQuestion(null);
        } else {
          // Load next question
          setCurrentQuizQuestion(response.question);
          setQuestionNumber(response.questionNumber);
          setTotalQuestions(response.totalQuestions);
          setSelectedAnswer(null); // Reset selection for the new question
        }
      } else {
        alert("Failed to submit answer.");
      }
    } catch (err: any) {
      console.error("❌ Error submitting answer:", err);
      alert("An error occurred while submitting your answer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setShowResults(false);
    setQuizId(null);
    setCurrentQuizQuestion(null);
    setSelectedAnswer(null);
    setLastResult(null);
    setQuizHistory([]);
    setFinalScore(0);
    setQuestionNumber(0);
  };

  // --- END UPDATED QUIZ HANDLERS ---

  const handleBackToPart = () => {
    // Navigate back to the part articles page
    if (articleData?.partName && articleData?.partTitle) {
      onNavigate("part-articles", {
        partName: articleData.partName,
        partTitle: articleData.partTitle,
      });
    } else if (article?.part?.name) {
      // Fallback to article's part name if not provided
      onNavigate("part-articles", {
        partName: article.part.name,
        partTitle: article.part.name,
      });
    } else {
      // If no part info, go to learn page
      onNavigate("learn");
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

  // --- NEW: bookmark handler using backend ---
  const handleToggleBookmark = async () => {
    if (!article) return;

    const raw =
      article.articleNumber != null
        ? String(article.articleNumber)
        : articleData?.articleNumber;
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

  // -------------------------------------------------

  const extractArticleNumberFromRelated = (
    relatedNumber: string
  ): string | null => {
    if (relatedNumber.toLowerCase().includes("preamble")) return "0";
    const articleMatch = relatedNumber.match(/Article\s+(\d+[A-Za-z]*)/i);
    if (articleMatch) return articleMatch[1];
    const partMatch = relatedNumber.match(
      /Part\s+[IVXLCDM]+\s*\(Articles?\s+(\d+)/i
    );
    if (partMatch) return partMatch[1];
    if (/^\d+[A-Za-z]*$/.test(relatedNumber.trim())) return relatedNumber.trim();
    return null;
  };

  const handleRelatedArticleClick = async (related: any) => {
    const articleNumber = extractArticleNumberFromRelated(related.number);
    if (!articleNumber) {
      alert("Unable to navigate to this article. Invalid article reference.");
      return;
    }
    onNavigate("article", {
      articleNumber: articleNumber,
    });
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
          <h2 className="text-2xl font-bold text-white mb-4">
            Article Not Found
          </h2>
          <p className="text-slate-400 mb-6">
            {error || "The requested article could not be found."}
          </p>
          <Button onClick={handleBackToPart}>Back to Part</Button>
        </Card>
      </div>
    );
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allArticles.length - 1;

  // WARNING: Your original file was missing the Quiz UI.
  // You need to add the quiz JSX here, similar to what's in
  // PartArticlesPage.tsx, to make the `handleStartQuiz` button
  // and quiz modal appear.

  return (
    <div className="w-full max-w-6xl animate-fade-in pb-32">
      {/* Back Button */}
      <button
        onClick={handleBackToPart}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>
          Back to {articleData?.partTitle || article?.part?.name || "Part"}
        </span>
      </button>

      {/* Header Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Part Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                <BookMarked className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-semibold text-sm">
                  {article.part?.name || "Unknown Part"}
                </span>
              </div>

              {/* Article Number */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(
                    article.part?.category || "other"
                  )} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                    {article.articleNumber}
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Indian Constitution
                  </p>
                </div>
              </div>

              {/* Article Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {article.articleName}
              </h2>

              {/* Subject Badge */}
              {article.subject && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">
                    {article.subject}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex md:flex-col gap-2">
              <button
                onClick={handleToggleBookmark}
                className={`p-3 rounded-xl transition-all ${isBookmarked
                  ? "bg-orange-500 text-white"
                  : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
              <button
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
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("simplified")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "simplified"
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
        >
          <Lightbulb className="w-5 h-5" />
          Simplified Explanation
        </button>
        <button
          onClick={() => setActiveTab("original")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "original"
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
        >
          <FileText className="w-5 h-5" />
          Original Text
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "simplified" ? (
        <Card className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Easy to Understand
            </h3>
          </div>
          <div className="prose prose-invert max-w-none">
            {article.simplifiedDescription
              ?.split("\n\n")
              .map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-slate-300 leading-relaxed mb-4 text-lg"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </Card>
      ) : (
        <Card className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Constitutional Text
            </h3>
          </div>
          <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-lg">
            <p className="text-slate-200 text-xl leading-relaxed italic font-serif whitespace-pre-wrap">
              "{article.originalText}"
            </p>
          </div>
          <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-200 text-sm">
              This is the exact text as written in the Constitution of India.
              The simplified version explains this in everyday language.
            </p>
          </div>
        </Card>
      )}

      {/* Key Points */}
      {article.keyPoints && article.keyPoints.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Key Points</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {article.keyPoints.map((point: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Historical Context */}
      {article.historicalContext &&
        article.historicalContext !== "Not available" && (
          <Card className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Historical Context
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              {article.historicalContext}
            </p>
          </Card>
        )}

      {/* Landmark Cases */}
      {article.landmarkCases && article.landmarkCases.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Landmark Cases</h3>
          </div>
          <div className="space-y-4">
            {article.landmarkCases.map((case_: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors"
              >
                <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-orange-400" />
                  {case_.name}
                </h4>
                {case_.significance && (
                  <p className="text-slate-400 ml-7">{case_.significance}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Related Articles - UPDATED WITH CLICK HANDLERS */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Related Articles</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {article.relatedArticles.map((related: any, index: number) => (
              <button
                key={index}
                onClick={() => handleRelatedArticleClick(related)}
                className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all text-left group border border-slate-600 hover:border-orange-500/50 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                    {related.number}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
                </div>
                <div className="text-slate-300 text-sm group-hover:text-white transition-colors">
                  {related.name}
                </div>
                <div className="mt-2 text-xs text-slate-500 group-hover:text-slate-400 flex items-center gap-1">
                  <span>Click to view</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Inline Navigation Control Bar - NEW DESIGN */}
      {allArticles.length > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700">
          <div className="flex items-center justify-between gap-6 py-4">
            {/* Previous Button */}
            <button
              onClick={handlePreviousArticle}
              disabled={!hasPrevious}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all border-2 ${hasPrevious
                ? "border-orange-500 text-orange-400 hover:bg-orange-500/10"
                : "border-slate-700 text-slate-600 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Center Text */}
            <div className="text-center flex-1">
              <div className="text-slate-300 font-semibold text-lg">
                Article {currentIndex + 1} of {allArticles.length}
              </div>
              <div className="text-slate-500 text-sm mt-1">
                {article.part?.name || "Constitution"}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextArticle}
              disabled={!hasNext}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${hasNext
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg"
                : "bg-slate-700 text-slate-600 cursor-not-allowed"
                }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / allArticles.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};