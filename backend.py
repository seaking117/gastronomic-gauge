import requests
from bs4 import BeautifulSoup
import openai
import os
import sys

# The URL of the webpage you want to scrape
url = 'https://www.simplyrecipes.com/jalapeno-popper-grilled-cheese-sandwich-recipe-7971060'

# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
  # Parse the HTML content of the page
  soup = BeautifulSoup(response.text, 'html.parser')

  # Find the element(s) with the specified class
  ingredients_list = soup.find_all(class_="structured-ingredients__list text-passage")

  for ingredients in ingredients_list:
      # Extract text for each ingredient, replacing line breaks with a space
      ingredients_text = ' '.join(ingredients.stripped_strings)
else:
  print(f"Failed to retrieve webpage. Status code: {response.status_code}")

openai.api_key = os.environ['OPENAI_API_KEY']

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "system",
        "content": "Calculate the total calorie count of the ingredients in this recipe:" + ingredients_text +" and return the result as a table in HTML code with the ingredient name, calorie count, and the total calorie count. Respond with just the code and do not include any linebreaks."
    }])
  
print(response)
