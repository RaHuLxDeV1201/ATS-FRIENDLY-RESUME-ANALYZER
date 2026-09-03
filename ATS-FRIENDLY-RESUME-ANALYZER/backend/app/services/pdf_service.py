from pypdf import PdfReader
from io import BytesIO
import re


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract clean text from uploaded PDF bytes.
    """
    try:
        pdf_file = BytesIO(file_bytes)
        reader = PdfReader(pdf_file)

        extracted_pages = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_pages.append(text)

        full_text = "\n".join(extracted_pages)
        # Clean weird non-printable control characters
        full_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', full_text)
        return full_text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""