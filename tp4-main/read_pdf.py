from pathlib import Path
from PyPDF2 import PdfReader

pdf_path = Path(r'C:/Users/Hp/Downloads/TP4-MERN.pdf')
output_path = Path(r'C:/Users/Hp/Desktop/tp4/pdf_text.txt')
reader = PdfReader(str(pdf_path))
with output_path.open('w', encoding='utf-8') as out:
    out.write(f'TOTAL PAGES: {len(reader.pages)}\n')
    for i, page in enumerate(reader.pages):
        out.write(f'---PAGE {i+1}---\n')
        out.write((page.extract_text() or '') + '\n')
print('written', output_path)
