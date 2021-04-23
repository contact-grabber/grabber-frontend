import json
from bs4 import BeautifulSoup
from scraper_api import ScraperAPIClient
import os

def handler(event, context):
    class job:
        def __init__(self, title, summary):
            self.title = title
            self.summary = summary

    search_string = event['queryStringParameters']['search']
    location = event['queryStringParameters']['state']
    
    client = ScraperAPIClient(os.environ.get('API_KEY'))
    monster_url = f'https://www.monster.com/jobs/search?q={search_string}&where={location}&page=1'
    page = client.get(url=monster_url, render=True)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(class_='results-page')
    job_elems = results.find_all('div', class_='results-card')
    jobs = {
        "jobs": []
    }
    for job_elem in job_elems:
        title_elem = job_elem.find('div', class_='title-company-location')
        summary_elem = job_elem.find('div', class_='results-card-description')
        jobs['jobs'].append( job(title_elem.text.strip(), summary_elem.text.strip()))
    result = json.dumps(jobs, default = lambda x: x.__dict__)
    # result = jobs
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': result
    }