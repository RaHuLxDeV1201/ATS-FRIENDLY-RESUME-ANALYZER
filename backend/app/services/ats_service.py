def calculate_ats_score(resume_text: str) -> dict:

    if not resume_text:
        return {
            "overall_score": 0,
            "missing_keywords": [],
            "suggestions": []
        }

    text = resume_text.lower()

    score = 0
    suggestions = []

    # ---------------------------------
    # Resume length
    # ---------------------------------

    word_count = len(text.split())

    if word_count >= 300:
        score += 20
    else:
        suggestions.append(
            "Resume content is too short."
        )

    # ---------------------------------
    # Resume sections
    # ---------------------------------

    sections = [
        "education",
        "experience",
        "skills",
        "projects",
        "contact"
    ]

    for section in sections:

        if section in text:
            score += 10

        else:
            suggestions.append(
                f"Add a clear {section} section."
            )

    # ---------------------------------
    # Technical keywords
    # ---------------------------------

    keywords = [
        "python",
        "java",
        "javascript",
        "c++",
        "c",
        "sql",
        "react",
        "node",
        "fastapi",
        "django",
        "html",
        "css",
        "git",
        "github"
    ]

    found_keywords = []

    for keyword in keywords:

        if keyword in text:
            found_keywords.append(keyword)

    if len(found_keywords) >= 5:
        score += 20

    elif len(found_keywords) >= 2:
        score += 10

    else:
        suggestions.append(
            "Add relevant technical skills."
        )

    score = min(score, 100)

    return {
        "overall_score": score,
        "found_keywords": found_keywords,
        "suggestions": suggestions
    }