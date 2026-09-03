import re
from .grammar_service import check_grammar

# Extensive database of technical and professional skills
TECH_SKILLS = [
    # Languages
    "python", "javascript", "typescript", "java", "c++", "c#", "c", "go", "golang", "rust", 
    "ruby", "php", "swift", "kotlin", "r", "html", "css", "html5", "css3", "sql", "bash", "powershell",
    # Frontend
    "react", "react.js", "vue", "vue.js", "angular", "next.js", "nuxt", "svelte", "tailwind", 
    "tailwindcss", "bootstrap", "redux", "webpack", "vite", "sass", "less",
    # Backend
    "node", "node.js", "express", "express.js", "fastapi", "django", "flask", "spring", 
    "spring boot", "asp.net", "laravel", "graphql", "rest api", "microservices",
    # Databases & Cloud
    "postgresql", "mysql", "mongodb", "sqlite", "redis", "elasticsearch", "dynamodb", 
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci/cd", "git", "github", 
    "gitlab", "nginx", "apache", "linux",
    # Data & AI
    "machine learning", "deep learning", "data analysis", "pandas", "numpy", "scikit-learn", 
    "tensorflow", "pytorch", "opencv", "nlp", "power bi", "tableau", "spark", "hadoop",
    # Core & Methodologies
    "agile", "scrum", "jira", "unit testing", "jest", "pytest", "cypress", "system design",
    "oop", "data structures", "algorithms"
]

REQUIRED_SECTIONS = {
    "contact": [r"\bcontact\b", r"\bemail\b", r"\bphone\b", r"\blinkedin\b", r"\bgithub\b"],
    "experience": [r"\bexperience\b", r"\bwork history\b", r"\bemployment\b", r"\binternship\b"],
    "education": [r"\beducation\b", r"\bacademics\b", r"\buniversity\b", r"\bdegree\b", r"\bcollege\b"],
    "skills": [r"\bskills\b", r"\btechnical skills\b", r"\btechnologies\b", r"\bproficiencies\b"],
    "projects": [r"\bprojects\b", r"\bkey projects\b", r"\bpersonal projects\b"]
}


def extract_skills(text: str) -> list:
    """Extract known technical skills from text."""
    text_lower = text.lower()
    found = set()
    for skill in TECH_SKILLS:
        # Use word boundary or exact matching
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found.add(skill.capitalize() if len(skill) <= 4 else skill.title())
    return sorted(list(found))


def calculate_ats_score(resume_text: str, job_description: str = "") -> dict:
    """
    Computes comprehensive ATS compatibility score, skill gap, section checks,
    grammar analysis, and actionable improvement suggestions.
    """
    if not resume_text or not resume_text.strip():
        return {
            "overall_score": 0,
            "grade": "F",
            "category_scores": {
                "skills_score": 0,
                "sections_score": 0,
                "grammar_score": 0,
                "formatting_score": 0
            },
            "skills_analysis": {
                "matched_skills": [],
                "missing_skills": [],
                "all_detected_skills": []
            },
            "sections_status": {sec: False for sec in REQUIRED_SECTIONS},
            "grammar_result": {"total_mistakes": 0, "mistakes": []},
            "suggestions": ["Uploaded resume appears to be empty or unreadable. Please check the PDF file."]
        }

    text_lower = resume_text.lower()
    word_count = len(resume_text.split())
    suggestions = []

    # 1. Skill Extraction & Skill Gap Analysis
    detected_skills = extract_skills(resume_text)
    
    matched_skills = []
    missing_skills = []

    if job_description and job_description.strip():
        jd_skills = extract_skills(job_description)
        if jd_skills:
            detected_skills_lower = [s.lower() for s in detected_skills]
            for skill in jd_skills:
                if skill.lower() in detected_skills_lower:
                    matched_skills.append(skill)
                else:
                    missing_skills.append(skill)
            
            skills_score = int((len(matched_skills) / len(jd_skills)) * 100) if jd_skills else 50
        else:
            # Fallback if no skills parsed from JD
            skills_score = min(100, len(detected_skills) * 10)
            missing_skills = ["Docker", "TypeScript", "CI/CD", "Unit Testing"]
    else:
        # No job description provided: evaluate based on absolute skill count
        matched_skills = detected_skills
        if len(detected_skills) >= 10:
            skills_score = 95
        elif len(detected_skills) >= 6:
            skills_score = 80
        elif len(detected_skills) >= 3:
            skills_score = 60
        else:
            skills_score = 40
            
        # Recommend standard high-demand skills missing from resume
        popular_defaults = ["Git", "Docker", "SQL", "REST API", "Unit Testing", "CI/CD"]
        missing_skills = [s for s in popular_defaults if s.lower() not in [d.lower() for d in detected_skills]]

    if len(detected_skills) < 4:
        suggestions.append("Add more industry-relevant technical skills and frameworks to increase keywords match.")
    if missing_skills:
        suggestions.append(f"Skill Gap Identified: Consider adding key skills such as {', '.join(missing_skills[:4])}.")

    # 2. Section Detection
    sections_status = {}
    sections_found_count = 0
    for section, patterns in REQUIRED_SECTIONS.items():
        found = any(re.search(pat, text_lower) for pat in patterns)
        sections_status[section] = found
        if found:
            sections_found_count += 1
        else:
            suggestions.append(f"Missing section header: Include an explicit '{section.capitalize()}' section.")

    sections_score = int((sections_found_count / len(REQUIRED_SECTIONS)) * 100)

    # 3. Formatting & Length Check
    formatting_score = 100
    if word_count < 250:
        formatting_score -= 30
        suggestions.append("Resume content is short (under 250 words). Expand bullet points with metrics and achievements.")
    elif word_count > 1200:
        formatting_score -= 15
        suggestions.append("Resume is long (over 1200 words). Try to condense to 1-2 pages for standard ATS parsing.")

    # Check for email contact
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    if not re.search(email_pattern, resume_text):
        formatting_score -= 20
        suggestions.append("No valid email address detected. Ensure your email is clearly visible.")

    formatting_score = max(30, formatting_score)

    # 4. Grammar & Style Analysis
    grammar_result = check_grammar(resume_text)
    grammar_score = grammar_result["grammar_score"]
    if grammar_result["total_mistakes"] > 0:
        suggestions.append(f"Found {grammar_result['total_mistakes']} writing/grammar suggestion(s). Review action verbs and formatting.")

    # 5. Composite Overall ATS Score Calculation
    # Weights: Skills (40%), Sections (25%), Grammar (20%), Formatting (15%)
    overall_score = round(
        (skills_score * 0.40) +
        (sections_score * 0.25) +
        (grammar_score * 0.20) +
        (formatting_score * 0.15)
    )
    overall_score = max(0, min(100, overall_score))

    # Grade determination
    if overall_score >= 85:
        grade = "Excellent"
    elif overall_score >= 70:
        grade = "Good"
    elif overall_score >= 55:
        grade = "Needs Work"
    else:
        grade = "Poor"

    return {
        "overall_score": overall_score,
        "grade": grade,
        "category_scores": {
            "skills_score": skills_score,
            "sections_score": sections_score,
            "grammar_score": grammar_score,
            "formatting_score": formatting_score
        },
        "skills_analysis": {
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "all_detected_skills": detected_skills
        },
        "sections_status": sections_status,
        "grammar_result": grammar_result,
        "suggestions": suggestions
    }