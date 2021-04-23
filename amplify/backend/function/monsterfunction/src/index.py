import json
from bs4 import BeautifulSoup
from scraper_api import ScraperAPIClient
import os

def handler(event, context):
    client = ScraperAPIClient(os.environ.get('API_KEY'))
    monster_url = "https://www.monster.com/jobs/search?q=Software+Engineer&where=Nashville%2C+TN&page=6"
    page = client.get(url=monster_url, render=True)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(class_='results-page')
    job_elems = results.find_all('div', class_='results-card')
    titles = []
    summaries = []
    for job_elem in job_elems:
        title_elem = job_elem.find('div', class_='title-company-location')
        summary_elem = job_elem.find('div', class_='results-card-description')
        titles.append(title_elem.text.strip())
        summaries.append(summary_elem.text.strip())
    response = {
        "titles": titles,
        "summaries": summaries
    }
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response)
    }