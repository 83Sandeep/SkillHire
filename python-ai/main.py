from fastapi import FastAPI, UploadFile, File, HTTPException
import pdfplumber
import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import tempfile
import os

app = FastAPI()

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z\s]", " ", text)
    return text

def ats_score(resume_text: str, job_skills: list) -> dict:
    resume_text = normalize_text(resume_text)
    vectorizer = CountVectorizer().fit_transform([resume_text, " ".join(job_skills)])
    vectors = vectorizer.toarray()
    score = cosine_similarity([vectors[0]], [vectors[1]])[0][0] * 100

    matched = [skill for skill in job_skills if skill.lower() in resume_text]
    missing = [skill for skill in job_skills if skill.lower() not in resume_text]

    return {
        "atsScore": round(score, 2),
        "matchedSkills": matched,
        "missingSkills": missing
    }

@app.post("/api/ai/parse-and-score")
async def parse_and_score(file: UploadFile = File(...), jobSkills: str = ""):
    try:
        # Save temp file
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        resume_text = extract_text_from_pdf(tmp_path)
        os.remove(tmp_path)

        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="No text extracted from resume")

        job_skills = jobSkills.split(",") if jobSkills else []
        result = ats_score(resume_text, job_skills)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing resume: {str(e)}")

