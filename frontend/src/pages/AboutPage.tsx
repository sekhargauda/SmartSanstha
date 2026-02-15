import React from "react";
import {
  BookOpen,
  Target,
  Heart,
  Users,
  Sparkles,
  TrendingUp,
  Shield,
  Brain,
  Zap,
  Award,
  Globe,
  CheckCircle,
  Calendar,
  Scale,
  Flag,
  FileText,
} from "lucide-react";
import { Card } from "../components/common/Card";

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: "1947",
      event: "Constituent Assembly formed",
      icon: <Users className="w-5 h-5" />,
    },
    {
      year: "1949",
      event: "Constitution adopted on Nov 26",
      icon: <Award className="w-5 h-5" />,
    },
    {
      year: "1950",
      event: "Constitution came into force on Jan 26",
      icon: <Flag className="w-5 h-5" />,
    },
    {
      year: "2024",
      event: "SmartSanstha launched",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const team = [
    {
      name: "Waseem Khan",
      id: "22104050",
      role: "Full Stack Developer",
      initials: "WK",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Siddhant Gaikwad",
      id: "22104083",
      role: "UI/UX Designer",
      initials: "SG",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Harsh Gajera",
      id: "22104099",
      role: "Frontend Developer",
      initials: "HG",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Sekhar Gauda",
      id: "22104044",
      role: "Backend & AI Specialist",
      initials: "SG",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Accessibility",
      description:
        "Constitutional education should be free and accessible to every Indian citizen.",
      color: "bg-red-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Simplicity",
      description:
        "Complex legal language simplified without losing accuracy or meaning.",
      color: "bg-blue-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Engagement",
      description:
        "Learning should be fun, interactive, and memorable through gamification.",
      color: "bg-purple-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Accuracy",
      description:
        "All content verified and updated to reflect the latest constitutional amendments.",
      color: "bg-green-500",
    },
  ];

  const achievements = [
    {
      number: "10,000+",
      label: "Active Learners",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "470+",
      label: "Articles Explained",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      number: "50,000+",
      label: "Quizzes Completed",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "User Satisfaction",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const platformStats = [
    {
      number: "470+",
      label: "Articles Covered",
      icon: <FileText className="w-6 h-6" />,
      color: "text-orange-400",
    },
    {
      number: "100%",
      label: "Free Access",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-400",
    },
    {
      number: "24/7",
      label: "AI Assistance",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-400",
    },
    {
      number: "10+",
      label: "Interactive Games",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-400",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400 font-semibold text-xs sm:text-sm">
            About SmartSanstha
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Making Constitutional Learning
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
            {" "}
            Accessible
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto">
          SmartSanstha is on a mission to democratize constitutional education
          in India through technology, gamification, and AI-powered learning
          experiences.
        </p>
      </div>

      {/* What is SmartSanstha Section */}
      <Card className="mb-20 bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-semibold text-xs sm:text-sm">
                What is SmartSanstha?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              India's Gamified Constitutional Learning Platform
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
              SmartSanstha is India's first{" "}
              <span className="text-orange-400 font-semibold">
                gamified constitutional learning platform
              </span>{" "}
              that makes understanding the Constitution of India fun,
              interactive, and accessible to everyone.
            </p>
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
              Whether you're a student, competitive exam aspirant, or a curious
              citizen, we provide simplified content, engaging games, and AI
              assistance to help you master constitutional knowledge.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Our platform breaks down complex constitutional concepts into
              bite-sized, easy-to-understand lessons, supplemented with
              interactive quizzes and games that make learning enjoyable and
              effective.
            </p>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-orange-500/50 transition-all transform hover:scale-105"
              >
                <div className={`flex justify-center mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-center">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm text-center leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Mission Section - Alternative with Visual Progress */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-semibold text-xs sm:text-sm">
              Our Mission
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Empowering Citizens Through Knowledge
          </h2>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <div className="text-center max-w-3xl mx-auto py-8">
            {/* <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div> */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Our Core Mission
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
              We believe that every Indian citizen should understand their
              rights, duties, and the foundational principles that govern our
              democracy. The Constitution is not just a legal document—it's the
              bedrock of our nation's identity.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              SmartSanstha bridges the gap between complex constitutional
              language and everyday understanding, making this crucial knowledge
              accessible, engaging, and actionable for everyone.
            </p>
          </div>
        </Card>

        {/* Platform Coverage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-blue-500/30">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">450+</div>
              <div className="text-slate-400 text-sm mb-3">
                Articles Covered
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Complete Coverage</div>
          </Card>

          <Card className="text-center border-purple-500/30">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">27</div>
              <div className="text-slate-400 text-sm mb-3">Parts Explained</div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              All Parts Available
            </div>
          </Card>

          <Card className="text-center border-orange-500/30">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-slate-400 text-sm mb-3">
                Interactive Games
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">More Coming Soon</div>
          </Card>

          <Card className="text-center border-green-500/30">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400 text-sm mb-3">Free Forever</div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Always Free</div>
          </Card>
        </div>

        {/* Mission Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            hover
            className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border-blue-500/30"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Know Your Rights
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every citizen deserves to understand their fundamental rights
                and constitutional protections.
              </p>
            </div>
          </Card>

          <Card
            hover
            className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 border-purple-500/30"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Learn Effectively
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Interactive methods and gamification make complex constitutional
                concepts simple and memorable.
              </p>
            </div>
          </Card>

          <Card
            hover
            className="bg-gradient-to-br from-green-900/20 to-green-900/10 border-green-500/30"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Build Community
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Join a growing community of learners becoming informed, active
                citizens of India.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Why We Exist */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-semibold text-xs sm:text-sm">
              Why We Exist
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Problem We're Solving
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto">
            Despite its importance, most Indians find the Constitution difficult
            to understand and access
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card hover>
            <div className="text-red-400 mb-4">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Complex Language
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Legal jargon and formal language make the Constitution
              intimidating and hard to comprehend for average citizens.
            </p>
          </Card>
          <Card hover>
            <div className="text-yellow-400 mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Limited Accessibility
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Quality constitutional education resources are scarce, expensive,
              or not available in engaging formats.
            </p>
          </Card>
          <Card hover>
            <div className="text-purple-400 mb-4">
              <TrendingUp className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Boring Learning
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Traditional methods of teaching civics and constitutional law are
              dry and fail to engage modern learners.
            </p>
          </Card>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold text-xs sm:text-sm">
              Our Values
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What We Stand For
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} hover className="text-center">
              <div
                className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <div className="text-white">{value.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-xs sm:text-sm">
              Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            From Independence to Digital Learning
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <Card key={index} hover className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {milestone.icon}
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {milestone.year}
              </div>
              <p className="text-slate-300 text-sm">{milestone.event}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
            <Users className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm">
              Our Team
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Meet the Team
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-2">
            A passionate team of students building the future of constitutional
            education
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-full mt-4">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-slate-300 text-sm font-medium">
              Students of A.P. Shah Institute of Technology, Thane
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} hover className="text-center group">
              {/* Avatar with Gradient */}
              <div
                className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
              >
                {member.initials}
              </div>

              {/* Name */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {member.name}
              </h3>

              {/* Student ID */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/50 rounded-full mb-3">
                <span className="text-slate-400 text-xs font-mono">
                  {member.id}
                </span>
              </div>

              {/* Role */}
              <p className="text-orange-400 text-sm font-semibold">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Guidance Section - Alternative Single Card */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold text-xs sm:text-sm">
              Guidance
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Under the Guidance of
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            Expert mentorship from experienced faculty members
          </p>
        </div>

        <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 max-w-4xl mx-auto">
          <div className="text-center py-8">
            {/* Header Icon */}
            {/* <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div> */}

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Project Guide */}
              <div className="group">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Dr. Vaibhav Yawalkar
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full mb-3">
                  <Award className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 text-xs font-semibold">
                    Project Guide
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  Providing expert guidance and mentorship throughout the project development
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

              {/* Project Co-Guide */}
              <div className="group">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  Ms. Charul Singh
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full mb-3">
                  <Award className="w-3 h-3 text-blue-400" />
                  <span className="text-blue-400 text-xs font-semibold">
                    Project Co-Guide
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  Providing technical insights and support throughout the project development
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};













// import React from 'react';
// import { Users, ShieldCheck, Target, Brain, Heart, Rocket } from 'lucide-react';
// import { Card } from '../components/common/Card';

// export const AboutPage: React.FC = () => {
//   const team = [
//     { name: 'Mohammad Waseem Khan', id: '22104050', role: 'Full Stack Developer' },
//     { name: 'Siddhant Gaikwad', id: '22104083', role: 'UI/UX Designer' },
//     { name: 'Harsh Gajera', id: '22104099', role: 'Frontend Developer' },
//     { name: 'Sekhar Gauda', id: '22104044', role: 'Backend & AI Specialist' },
//   ];

//   return (
//     <div className="w-full max-w-7xl animate-fade-in">
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
//           <Users className="w-10 h-10 text-white" />
//         </div>
//         <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//           About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Us</span>
//         </h1>
//         <p className="text-xl text-slate-400 max-w-3xl mx-auto">
//           Passionate about making constitutional literacy accessible to every Indian citizen
//         </p>
//       </div>

//       {/* Mission, Vision, Values */}
//       <div className="grid md:grid-cols-3 gap-8 mb-16">
//         <Card hover className="text-center">
//           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Target className="w-8 h-8 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
//           <p className="text-slate-400 leading-relaxed">
//             To create high-quality, educational experiences that make constitutional learning engaging, accessible, and impactful for all.
//           </p>
//         </Card>

//         <Card hover className="text-center">
//           <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <ShieldCheck className="w-8 h-8 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
//           <p className="text-slate-400 leading-relaxed">
//             To be the leading platform for gamified constitutional literacy, where knowledge is not just consumed, but experienced.
//           </p>
//         </Card>

//         <Card hover className="text-center">
//           <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Heart className="w-8 h-8 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-3">Our Values</h3>
//           <p className="text-slate-400 leading-relaxed">
//             Accessibility, accuracy, engagement, and empowerment through technology-driven education.
//           </p>
//         </Card>
//       </div>

//       {/* Story */}
//       <Card className="mb-16">
//         <div className="flex items-center gap-3 mb-6">
//           <Rocket className="w-6 h-6 text-orange-400" />
//           <h2 className="text-3xl font-bold text-white">Our Story</h2>
//         </div>
//         <div className="space-y-4 text-slate-300 leading-relaxed">
//           <p>
//             SmartSanstha was born from a simple observation: the Indian Constitution, while being the supreme law of our land, remains inaccessible to most citizens due to its complex legal language and dense structure.
//           </p>
//           <p>
//             As students at A.P. Shah Institute of Technology, we recognized this gap and decided to leverage modern technology to bridge it. Our team combined expertise in full-stack development, artificial intelligence, UI/UX design, and gamification to create a platform that transforms constitutional learning.
//           </p>
//           <p>
//             What started as an academic project has evolved into a comprehensive platform that uses AI, interactive games, and adaptive learning to make the Constitution accessible to students, professionals, and curious citizens alike.
//           </p>
//         </div>
//       </Card>

//       {/* Team */}
//       <div className="mb-16">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
//           <p className="text-slate-400">Students of A.P. Shah Institute of Technology, Thane</p>
//         </div>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {team.map((member, index) => (
//             <Card key={index} hover className="text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
//                 {member.name.split(' ').map(n => n[0]).join('')}
//               </div>
//               <h3 className="font-bold text-white text-lg mb-1">{member.name}</h3>
//               <p className="text-slate-500 text-sm mb-2">{member.id}</p>
//               <p className="text-orange-400 text-sm font-semibold">{member.role}</p>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Guidance */}
//       <Card className="text-center bg-gradient-to-br from-slate-800 to-slate-700">
//         <Brain className="w-16 h-16 text-orange-400 mx-auto mb-4" />
//         <h3 className="text-2xl font-bold text-white mb-4">Under the Guidance of</h3>
//         <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//           <div>
//             <p className="text-xl font-bold text-white">Dr. Vaibhav Yawalkar</p>
//             <p className="text-slate-400">Project Guide</p>
//           </div>
//           <div>
//             <p className="text-xl font-bold text-white">Ms. Charul Singh</p>
//             <p className="text-slate-400">Project Co-Guide</p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };
