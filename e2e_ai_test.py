import requests
files = {'file': open('resume.pdf','rb')}
data = {'jobSkills': 'Python,React,Node'}
try:
    r = requests.post('http://localhost:8000/api/ai/parse-and-score', files=files, data=data)
    print('AI STATUS', r.status_code)
    print(r.text)
except Exception as e:
    print('ERROR', e)
