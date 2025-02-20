import os
import openai
from PyPDF2 import PdfReader

openai.api_key = os.environ['OPENAI_API_KEY']

def extract_text_from_pdf(file):
    """Extract text from a PDF file."""
    # file_path = "Kush_Gadhvi_Resume_1.pdf"
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def analyze_text_with_openai(file, job_description):
    text = extract_text_from_pdf(file)
    
    prompt = f"""
Analyze the following resume and job description to identify the following:

1. *Missing Skills*: Compare the skills mentioned in the job description with those in the resume and list any skills or requirements missing from the resume.

2. *Suggestions*: Provide actionable suggestions to improve the resume to better align with the job description.

3. *Formatting Tips*: Provide formatting tips in two categories:
   - *Do's*: List positive practices that improve the resume's readability and professional appearance.
   - *Don'ts*: Highlight common mistakes or formatting issues that should be avoided.

4. *Skill Match Percentage*: Calculate a percentage value representing how well the resume matches the job description based on skills and qualifications.

5. *Mock Interview Questions*: Generate 3 relevant mock interview questions based on the job description.

#### Input:
- *Resume Content*: 
${text} // Insert the parsed resume content here

- *Job Description*:
${job_description} // Insert the job description content here

#### Output:
Provide the result in the following JSON format:
/
  "missingSkills": [array of all missing skills],
  "suggestions": [list of actionable suggestions to improve the resume],
  "formattingTips": 
    "do": [list of positive practices for resume formatting],
    "dont": [list of mistakes to avoid in resume formatting]
  ,
  "skillMatch": % value of skills match for resume and job description,
  "mockInterviewQuestions": [list of 3 relevant mock interview questions]
/

#### Additional Notes:
#- Use precise analysis for skills and qualifications matching.
#- Provide concise and actionable suggestions and tips.
#- Ensure the mock interview questions align with the job description and are relevant to the role.
#- Include both "Do's" and "Don'ts" to improve the overall professionalism of the resume.
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {"role": "system", "content": "You are an AI assistant."},
            {"role": "user", "content": prompt}
        ]
      )
    
    return response.choices[0].message['content']