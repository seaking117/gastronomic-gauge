import axios from 'axios';
import cheerio from 'cheerio';
import OpenAI from 'openai';


export async function scrapeIngredientsAndCalculateCalories(inputUrl) {
    const openai = new OpenAI({
        apiKey: 'API_KEY',
        dangerouslyAllowBrowser: true
    });

    try {
        const { data, status } = await axios.get(inputUrl);
        if (status === 200) {
            const $ = cheerio.load(data);
            const ingredientsList = $(".structured-ingredients__list.text-passage");
            let ingredientsText = '';

            ingredientsList.each((_, element) => {
                const ingredients = $(element).text().replace(/\n/g, ' ').trim();
                ingredientsText += ' ' + ingredients;
            });

            const messages = [{
                role: "system",
                content: `Calculate the total calorie count of the ingredients in this recipe:${ingredientsText} and return the result as a table in HTML code with the ingredient name, calorie count, and the total calorie count. Respond with just the code and do not include any linebreaks.`
            }];

            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: messages,
            });

            console.log(JSON.stringify(response, null, 2));
        } else {
            console.log(`Failed to retrieve webpage. Status code: ${status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};
