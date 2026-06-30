import requests, sys
s = requests.Session()
register_data = {'name':'E2E User','email':'e2e+user@example.com','password':'password123','role':'job_seeker'}
try:
    r = s.post('http://localhost:5000/api/auth/register', json=register_data)
    print('REGISTER', r.status_code)
    print(r.text[:1000])
except Exception as e:
    print('REGISTER ERROR', e)

try:
    r2 = s.get('http://localhost:5000/api/profile')
    print('\nPROFILE', r2.status_code)
    print(r2.text[:1000])
except Exception as e:
    print('PROFILE ERROR', e)

try:
    files = {'resume': open('resume.pdf','rb')}
    data = {'jobSkills': 'Python,React,Node'}
    r3 = s.post('http://localhost:5000/api/profile/upload-resume', files=files, data=data)
    print('\nUPLOAD', r3.status_code)
    print(r3.text[:2000])
except Exception as e:
    print('UPLOAD ERROR', e)
