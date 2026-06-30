from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
c = canvas.Canvas('resume.pdf', pagesize=letter)
c.drawString(100, 750, 'Resume: E2E User')
c.drawString(100, 730, 'Skills: Python, React, Node')
c.save()
print('PDF created')
