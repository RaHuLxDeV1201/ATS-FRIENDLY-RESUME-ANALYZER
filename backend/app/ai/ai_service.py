def generate_resume_suggestions(resume_text: str) -> dict:

    if not resume_text:

        return {
            "suggestions": [],
            "message": "Resume text is empty."
        }

    suggestions = []

    word_count = len(
        resume_text.split()
    )

    if word_count < 300:

        suggestions.append(
            "Add more relevant details to your resume."
        )

    if "skills" not in resume_text.lower():

        suggestions.append(
            "Add a dedicated Skills section."
        )

    if "projects" not in resume_text.lower():

        suggestions.append(
            "Add relevant projects."
        )

    return {
        "suggestions": suggestions
    }