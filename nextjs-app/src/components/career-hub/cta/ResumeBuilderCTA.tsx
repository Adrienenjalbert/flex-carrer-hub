import { FileText, ArrowRight, Sparkles } from "lucide-react";

const RESUME_BUILDER_URL = "https://indeedflex.com/resume-builder/ai-resume-generator/build-your-resume/";

interface ResumeBuilderCTAProps {
  variant?: "banner" | "card";
  roleName?: string;
  industry?: string;
  className?: string;
}

export default function ResumeBuilderCTA({
  variant = "banner",
  roleName,
  industry,
  className = "",
}: ResumeBuilderCTAProps) {
  const heading = roleName
    ? `Build Your ${roleName} Resume for Free`
    : industry
      ? `Build Your ${industry.charAt(0).toUpperCase() + industry.slice(1)} Resume`
      : "Build Your Resume with AI";

  const buttonText = roleName
    ? `Build ${roleName} Resume`
    : "Build Your Resume for Free";

  if (variant === "card") {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">AI Resume Builder</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Create a polished, ATS-friendly resume in minutes with our free AI-powered tool.
        </p>
        <a
          href={RESUME_BUILDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <FileText className="h-4 w-4" />
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="h-7 w-7" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-1">{heading}</h2>
          <p className="text-blue-100 text-sm md:text-base">
            Our free AI-powered tool creates a polished, ATS-friendly resume in minutes — no formatting needed.
          </p>
        </div>
        <a
          href={RESUME_BUILDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          <FileText className="h-5 w-5" />
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
