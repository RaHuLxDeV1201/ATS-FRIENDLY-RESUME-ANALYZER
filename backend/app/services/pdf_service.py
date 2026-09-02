from pypdf import PdfReader
from io import BytesIO


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract text from uploaded PDF.
    """

    pdf_file = BytesIO(file_bytes)

    reader = PdfReader(pdf_file)

    extracted_text = ""

    for page in reader.pages:

        text = page.extract_text()

        if text:
            extracted_text += text + "\n"

    return extracted_text.strip()