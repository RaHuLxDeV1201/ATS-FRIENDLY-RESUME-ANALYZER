import { useState, useMemo } from 'react';

export default function GrammarChecker() {
  const [text, setText] = useState("");

  const sampleBullets = [
    "Worked on developing web applications using Python and React.",
    "Responsible for managing customer database systems and fixing bugs.",
    "Helped with optimizing API query performance across microservices."
  ];

  // Weak phrase dictionary to primary replacement recommendations
  const weakPhraseMap = {
    "worked on": ["Spearheaded", "Engineered", "Architected"],
    "worked": ["Engineered", "Developed", "Constructed"],
    "responsible for": ["Directed", "Orchestrated", "Oversaw"],
    "helped with": ["Collaborated on", "Accelerated", "Enhanced"],
    "helped": ["Assisted", "Facilitated", "Boosted"],
    "assisted in": ["Co-authored", "Facilitated", "Streamlined"],
    "assisted": ["Supported", "Facilitated", "Co-directed"],
    "handled": ["Administered", "Executed", "Resolved"],
    "tasked with": ["Commissioned to", "Appointed to lead", "Assigned to"],
    "involved in": ["Pioneered", "Catalyzed", "Drove"],
    "did": ["Executed", "Performed", "Completed"],
    "made": ["Fabricated", "Generated", "Created"],
    "managed": ["Directed", "Supervised", "Helmed"],
    "used": ["Utilized", "Leveraged", "Deployed"],
    "looked after": ["Maintained", "Monitored", "Safeguarded"]
  };

  // Filler words dictionary
  const fillerWordMap = {
    "very": "Omit or use 'Exceptional'",
    "basically": "Omit for professional tone",
    "really": "Omit or use 'Substantially'",
    "stuff": "Replace with 'Assets' or 'Components'",
    "things": "Replace with 'Deliverables' or 'Modules'",
    "various": "Replace with specific count or 'Diverse'",
    "many": "Replace with exact metric (e.g. '15+')",
    "lots of": "Replace with quantifiable metrics",
    "a lot of": "Replace with 'Substantial'",
    "etc": "Omit and specify concrete examples"
  };

  // Strong power verbs
  const powerVerbs = new Set([
    "spearheaded", "engineered", "architected", "orchestrated", "directed", 
    "pioneered", "catalyzed", "drove", "executed", "maximized", "accelerated", 
    "streamlined", "automated", "launched", "formulated", "transformed", "boosted"
  ]);

  // Technical keywords
  const techKeywords = new Set([
    "react", "python", "javascript", "typescript", "node", "fastapi", "sql", 
    "aws", "docker", "kubernetes", "rest", "api", "graphql", "git", "ci/cd", 
    "mongodb", "postgresql", "express", "tailwind", "next.js", "html", "css"
  ]);

  // Word-by-Word Analysis Engine
  const wordAnalysis = useMemo(() => {
    if (!text.trim()) return null;

    const rawWords = text.trim().split(/\s+/);
    const analyzedTokens = [];
    const textLower = text.toLowerCase();

    let weakCount = 0;
    let fillerCount = 0;
    let powerCount = 0;
    let techCount = 0;

    // Check multi-word weak phrases first
    let i = 0;
    while (i < rawWords.length) {
      const cleanWord = rawWords[i].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const nextWord = i + 1 < rawWords.length ? rawWords[i + 1].replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : "";
      const twoWordPhrase = `${cleanWord} ${nextWord}`;

      if (weakPhraseMap[twoWordPhrase]) {
        weakCount++;
        analyzedTokens.push({
          original: `${rawWords[i]} ${rawWords[i + 1]}`,
          clean: twoWordPhrase,
          type: "weak_phrase",
          label: "Weak Phrase",
          suggestions: weakPhraseMap[twoWordPhrase],
          startIndex: i
        });
        i += 2;
        continue;
      }

      if (weakPhraseMap[cleanWord]) {
        weakCount++;
        analyzedTokens.push({
          original: rawWords[i],
          clean: cleanWord,
          type: "weak_verb",
          label: "Weak Verb",
          suggestions: weakPhraseMap[cleanWord],
          startIndex: i
        });
      } else if (fillerWordMap[cleanWord]) {
        fillerCount++;
        analyzedTokens.push({
          original: rawWords[i],
          clean: cleanWord,
          type: "filler",
          label: "Filler Word",
          suggestion: fillerWordMap[cleanWord],
          startIndex: i
        });
      } else if (powerVerbs.has(cleanWord)) {
        powerCount++;
        analyzedTokens.push({
          original: rawWords[i],
          clean: cleanWord,
          type: "power",
          label: "Strong Action Verb",
          startIndex: i
        });
      } else if (techKeywords.has(cleanWord)) {
        techCount++;
        analyzedTokens.push({
          original: rawWords[i],
          clean: cleanWord,
          type: "tech",
          label: "ATS Tech Keyword",
          startIndex: i
        });
      } else {
        analyzedTokens.push({
          original: rawWords[i],
          clean: cleanWord,
          type: "standard",
          label: "Standard Word",
          startIndex: i
        });
      }
      i++;
    }

    const totalWords = rawWords.length;
    const impactScore = Math.min(100, Math.max(30, Math.round(((powerCount * 15 + techCount * 10 + (totalWords - weakCount - fillerCount)) / (totalWords || 1)) * 50)));

    return {
      totalWords,
      weakCount,
      fillerCount,
      powerCount,
      techCount,
      impactScore,
      tokens: analyzedTokens
    };
  }, [text]);

  // Replace word/phrase in text area on click
  const handleReplace = (originalStr, replacement) => {
    const regex = new RegExp(`\\b${originalStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    setText(text.replace(regex, replacement));
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 space-y-8">
        
        {/* Header */}
        <div className="text-center sm:text-left space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200/80 text-blue-900 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <span>✍️ WORD-BY-WORD AI OPTIMIZER</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight pt-1">
            Grammar & Action Verb Checker
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Get an instant word-by-word evaluation of your resume text. Replace weak phrasing, eliminate filler words, and highlight ATS technical keywords.
          </p>
        </div>

        {/* Text Area & Presets */}
        <div className="space-y-4">
          
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-[#0F172A] uppercase tracking-wider text-[11px] mr-1">Quick Sample Presets:</span>
            {sampleBullets.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setText(sample)}
                className="bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 hover:border-cyan-300 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer text-left truncate max-w-xs"
              >
                "{sample.substring(0, 35)}..."
              </button>
            ))}
          </div>

          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume bullet points here (e.g. Worked on developing web applications using Python and React...)"
            className="w-full p-4 border border-slate-300 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-white transition-all leading-relaxed font-sans"
          />

          {text && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setText("")}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear Text
              </button>
            </div>
          )}
        </div>

        {/* Word-by-Word Live Suggestions Dashboard */}
        {wordAnalysis && (
          <div className="space-y-8 pt-4 border-t border-slate-100">
            
            {/* Impact Score Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-950 text-white rounded-2xl shadow-lg border border-slate-800 text-center">
              <div className="p-2">
                <span className="text-2xl font-black text-cyan-400">{wordAnalysis.totalWords}</span>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Words</span>
              </div>
              <div className="p-2">
                <span className="text-2xl font-black text-red-400">{wordAnalysis.weakCount}</span>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Weak Verbs</span>
              </div>
              <div className="p-2">
                <span className="text-2xl font-black text-amber-400">{wordAnalysis.fillerCount}</span>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Filler Words</span>
              </div>
              <div className="p-2">
                <span className="text-2xl font-black text-emerald-400">{wordAnalysis.powerCount}</span>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Power Verbs</span>
              </div>
              <div className="p-2 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-slate-800">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {wordAnalysis.impactScore}%
                </span>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Impact Score</span>
              </div>
            </div>

            {/* Interactive Word-by-Word Tokenized View */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-[#0F172A]">Interactive Word-by-Word Breakdown</h3>
              <p className="text-xs text-slate-500">Click any highlighted word below to view or apply high-impact suggestions live:</p>
              
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl leading-relaxed flex flex-wrap gap-2 text-sm sm:text-base font-medium">
                {wordAnalysis.tokens.map((token, idx) => {
                  if (token.type === "weak_phrase" || token.type === "weak_verb") {
                    return (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded-xl font-bold text-xs sm:text-sm shadow-xs"
                      >
                        <span className="line-through">{token.original}</span>
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Weak</span>
                      </span>
                    );
                  }
                  if (token.type === "filler") {
                    return (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xl font-bold text-xs sm:text-sm"
                      >
                        <span>{token.original}</span>
                        <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Filler</span>
                      </span>
                    );
                  }
                  if (token.type === "power") {
                    return (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-xl font-extrabold text-xs sm:text-sm"
                      >
                        <span>{token.original}</span>
                        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase">⚡ Power</span>
                      </span>
                    );
                  }
                  if (token.type === "tech") {
                    return (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 py-1 rounded-xl font-extrabold text-xs sm:text-sm"
                      >
                        <span>{token.original}</span>
                        <span className="text-[10px] bg-cyan-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase">🎯 Tech</span>
                      </span>
                    );
                  }
                  return <span key={idx} className="text-slate-800 py-1">{token.original}</span>;
                })}
              </div>
            </div>

            {/* Word & Phrase Recommendations Cards Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#0F172A]">Individual Word Suggestions & Fixes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wordAnalysis.tokens.map((token, idx) => {
                  if (token.type === "weak_phrase" || token.type === "weak_verb") {
                    return (
                      <div key={idx} className="p-5 bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 rounded-2xl space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full uppercase border border-red-200">
                            {token.label}
                          </span>
                          <span className="text-xs text-red-500 font-bold">Replace Phrasing</span>
                        </div>
                        <p className="text-sm font-extrabold text-slate-900">
                          Detected weak word: <span className="text-red-600 underline">{token.original}</span>
                        </p>
                        
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-600 block">Click a strong verb to replace automatically:</span>
                          <div className="flex flex-wrap gap-2">
                            {token.suggestions.map((sugg, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => handleReplace(token.original, sugg)}
                                className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs transition-all cursor-pointer"
                              >
                                Replace with "{sugg}" →
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (token.type === "filler") {
                    return (
                      <div key={idx} className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase border border-amber-200">
                            Filler Word
                          </span>
                          <span className="text-xs text-amber-600 font-bold">Tone Fix</span>
                        </div>
                        <p className="text-sm font-extrabold text-slate-900">
                          Word: <span className="text-amber-700 underline">{token.original}</span>
                        </p>
                        <p className="text-xs text-slate-600 font-semibold bg-white p-2.5 rounded-xl border border-amber-200">
                          Recommendation: <span className="text-amber-800 font-bold">{token.suggestion}</span>
                        </p>
                      </div>
                    );
                  }

                  return null;
                })}

                {wordAnalysis.weakCount === 0 && wordAnalysis.fillerCount === 0 && (
                  <div className="md:col-span-2 p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <span>Every word in your text is strong, concise, and professional! No weak verbs or filler words detected.</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
