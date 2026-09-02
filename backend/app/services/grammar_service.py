import re


def check_grammar(resume_text: str) -> dict:

    if not resume_text:
        return {
            "total_mistakes": 0,
            "mistakes": []
        }

    mistakes = []

    # Multiple spaces
    if re.search(r"\s{2,}", resume_text):

        mistakes.append({
            "type": "Formatting",
            "message": "Multiple spaces found.",
            "suggestion": "Use a single space."
        })

    # Very long sentences
    sentences = re.split(
        r"[.!?]",
        resume_text
    )

    for sentence in sentences:

        words = sentence.strip().split()

        if len(words) > 35:

            mistakes.append({
                "type": "Sentence Length",
                "message": "Very long sentence detected.",
                "suggestion": "Break it into shorter sentences."
            })

    # Common resume writing problems
    common_phrases = {
        "worked on": "Use a stronger action verb such as Developed or Implemented.",
        "responsible for": "Use a stronger action verb.",
        "helped": "Describe your specific contribution."
    }

    lower_text = resume_text.lower()

    for phrase, suggestion in common_phrases.items():

        if phrase in lower_text:

            mistakes.append({
                "type": "Writing Style",
                "message": f"Phrase '{phrase}' found.",
                "suggestion": suggestion
            })

    return {
        "total_mistakes": len(mistakes),
        "mistakes": mistakes
    }