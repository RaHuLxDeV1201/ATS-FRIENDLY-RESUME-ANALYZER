import re

# Comprehensive list of weak phrases & better action verb replacements
WEAK_PHRASES = {
    "worked on": "Developed, Engineered, or Implemented",
    "responsible for": "Spearheaded, Managed, or Directed",
    "helped with": "Collaborated on, Assisted in optimizing, or Contributed to",
    "assisted in": "Co-authored, Facilitated, or Supported",
    "handled": "Administered, Executed, or Resolved",
    "tasked with": "Appointed to lead, Assigned to engineer",
    "involved in": "Participated in designing, Drove",
    "did": "Executed, Completed, or Conducted",
    "made": "Constructed, Created, or Formulated",
    "looked after": "Maintained, Supervised, or Overseen",
    "in order to": "To (simplify wording)",
    "due to the fact that": "Because (simplify wording)",
    "utilized": "Used or Leveraged",
    "at this point in time": "Currently",
}

# Common spelling mistakes found in tech resumes
COMMON_TYPOS = {
    r"\brecieve\b": ("recieve", "receive"),
    r"\bseperate\b": ("seperate", "separate"),
    r"\bmanagment\b": ("managment", "management"),
    r"\bexperiance\b": ("experiance", "experience"),
    r"\bdevelopper\b": ("developper", "developer"),
    r"\btechincal\b": ("techincal", "technical"),
    r"\bprograming\b": ("programing", "programming"),
    r"\bknowlege\b": ("knowlege", "knowledge"),
    r"\bresponsiable\b": ("responsiable", "responsible"),
    r"\bachive\b": ("achive", "achieve"),
    r"\benviroment\b": ("enviroment", "environment"),
    r"\bmaintenence\b": ("maintenence", "maintenance"),
    r"\bdatabasea\b": ("databasea", "database"),
    r"\bimpliment\b": ("impliment", "implement"),
}

def check_grammar(resume_text: str) -> dict:
    """
    Analyzes resume text for grammar, writing style, action verbs, typos, and formatting issues.
    """
    if not resume_text or not resume_text.strip():
        return {
            "total_mistakes": 0,
            "grammar_score": 100,
            "mistakes": []
        }

    mistakes = []
    text_lower = resume_text.lower()

    # 1. Weak Action Verbs / Phrasing
    for phrase, suggestion in WEAK_PHRASES.items():
        if phrase in text_lower:
            mistakes.append({
                "type": "Action Verb / Style",
                "message": f"Weak phrasing '{phrase}' detected.",
                "original": phrase,
                "suggestion": suggestion
            })

    # 2. Common Spelling & Typo Checks
    for pattern, (wrong, correct) in COMMON_TYPOS.items():
        if re.search(pattern, resume_text, re.IGNORECASE):
            mistakes.append({
                "type": "Spelling / Typo",
                "message": f"Possible typo '{wrong}'.",
                "original": wrong,
                "suggestion": f"Did you mean '{correct}'?"
            })

    # 3. Formatting & Spacing Checks
    if re.search(r"[a-zA-Z],[a-zA-Z]", resume_text):
        mistakes.append({
            "type": "Formatting",
            "message": "Missing space after comma.",
            "original": "comma spacing",
            "suggestion": "Add a space after commas (e.g. 'Python, React' instead of 'Python,React')."
        })

    if re.search(r"\s{3,}", resume_text):
        mistakes.append({
            "type": "Formatting",
            "message": "Excessive spaces detected.",
            "original": "multiple spaces",
            "suggestion": "Use single spaces between words."
        })

    # 4. Overly Long Sentences
    sentences = re.split(r"[.!?]\s+", resume_text)
    for sentence in sentences:
        words = sentence.strip().split()
        if len(words) > 35:
            preview = " ".join(words[:6]) + "..."
            mistakes.append({
                "type": "Sentence Structure",
                "message": f"Long sentence detected ({len(words)} words): '{preview}'",
                "original": preview,
                "suggestion": "Keep bullet points under 25-30 words for better ATS readability."
            })

    # Calculate Grammar Sub-score
    total_mistakes = len(mistakes)
    grammar_score = max(50, 100 - (total_mistakes * 5))

    return {
        "total_mistakes": total_mistakes,
        "grammar_score": grammar_score,
        "mistakes": mistakes
    }