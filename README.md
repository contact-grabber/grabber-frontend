# DISCLAIMER: THIS IS FOR EDUCATIONAL PURPOSES ONLY 

## Dynamic Job Web Scraper
This is a multi-scraper set up. Using AWS Lambda, API GateWay, CloudFormation, S3, Cognito, and Amplify, this scraper lives in the cloud. We used Indeed.com and Monster.com to pull our job listings from. Using our search bar you can search for a job and location on both websites at the same time! 

## How To Use
If you click [here](https://main.d3r7d6c4tw4h5f.amplifyapp.com/) it will take you to the front-end of the app! It will default load searches for Software Developer. To find what you're looking for search something new! 

If you care to look at what the backend is producting feel free to look at what [Indeed](https://gjgml13loc.execute-api.us-west-2.amazonaws.com/staging/jobs) and [Monster](https://gjgml13loc.execute-api.us-west-2.amazonaws.com/staging/monster) produce! 

## How Does It Work??
When you call one of the backend endpoints, it will trigger lambda functions to run. These functions are made from python and will take what your search information was via query parameters and input them into the url string for each site. From there our scraper will grab the info from the page and parse the data that we want to see. 

From there it will transform that data into JSON and send it back to the frontend for presentation. 

![Screen Shot 2021-04-25 at 9 48 35 AM](https://user-images.githubusercontent.com/77935828/115999954-69537580-a5ab-11eb-933f-2cd5c154bc17.png)


## Technologies Used
- React.js
- React Boostrap
- Styled Components 
- Axios
- Python
- ScraperAPI
- BeautifulSoup
- AWS:
  - Amplify
  - Cognito
  - API GateWay
  - S3
  - Lambda
  - CloudFormation
  - Hosted UI


## RoadBlocks/ Favorite Code

As we only had 5 days to build this fullstack app, we originially wanted to use Selenium for our webcrawler. However we found that getting past CAPTCHA would take too much time so we opted to use SCRAPERAPI instead. Cheating I know, But time constraints 🤷‍♂️ 

Dynamically using one component to render both websites. The challenge that appeared for this was when submitting new queries. To fix this solution, we attached a new state called 'refresh' to the useEffect. This makes it so we can manually refresh state and make axios calls with the new states.
```react

	useEffect(() => {
		getJobs();
		//Putting refresh here so that when it is called manually it will rerender and get the new state for the searching.
	}, [refresh]);
  ```
  
  While building out our scraper for the backend. Amplify would occasionally not be able to find python 3.8. To fix this, we had to manually change the amplify.yml so that it would download and build a python 3.8 env during the build process to deploy:
```bash
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - export BASE_PATH=$(pwd)
        - yum install -y gcc openssl-devel bzip2-devel libffi-devel python3.8-pip
        - cd /opt && wget https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tgz
        - cd /opt && tar xzf Python-3.8.2.tgz 
        - cd /opt/Python-3.8.2 && ./configure --enable-optimizations
        - cd /opt/Python-3.8.2 && make altinstall
        - pip3.8 install --user pipenv
        - ln -fs /usr/local/bin/python3.8 /usr/bin/python3
        - ln -fs /usr/local/bin/pip3.8 /usr/bin/pip3
        - cd $BASE_PATH
        - amplifyPush --simple
```
  
 Amplify letting only one contributer work on the project. This one is probably user(s) error. However, while trying to use two IAM, even one, Amplify would wipe our project every time one of us would push an addition. So the commits may look from one person, but the work was spread equally between Ford and Jordan.
 
 
 
 ## Stretch Goals:
 - Using authenticated users to save favorite jobs
 - Adding links to original posts
 - Adding additional websites
