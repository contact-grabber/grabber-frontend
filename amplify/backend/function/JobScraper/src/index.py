import json
from bs4 import BeautifulSoup
from scraper_api import ScraperAPIClient
import os


def handler(event, context):

    class job:
        def __init__(self, title, company, summary):
            self.title = title
            self.company = company
            self.summary = summary

    client = ScraperAPIClient(os.environ.get('API_KEY'))
    URL = "https://www.indeed.com/jobs?q=Entry+Level+Software+Engineer&l=Remote"
    page = client.get(url=URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id='resultsCol') 
    job_elems = results.find_all('div', class_='jobsearch-SerpJobCard')

    jobs = {
        "jobs" : []
    }
    for job_elem in job_elems:
        title_elem = job_elem.find('h2', class_='title')
        company_elem = job_elem.find('div', class_='sjcl')
        summary_elem = job_elem.find('div', class_='summary')
        jobs['jobs'].append( job(title_elem.text.strip(), company_elem.text.strip(), summary_elem.text.strip()))

    result = json.dumps(jobs, default = lambda x: x.__dict__ )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': result.replace("\\n"," ")
    }
