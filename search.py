import requests
import string
from lxml import html
from googlesearch import search
from bs4 import BeautifulSoup

def chatbot_query(query, index=0):
    fallback = 'Sorry, I do not understand.'
    result = ''

    try:
        print("try try try")
        search_result_list = list(search(query, tld="co.in", num=10, stop=3, pause=1))
        print("try")
        page = requests.get(search_result_list[index])
        print("try2")
        tree = html.fromstring(page.content)
        print("try3")
        soup = BeautifulSoup(page.content, features="lxml")
        print("try4")
        article_text = ''
        article = soup.findAll('p')
        print("try5")
        for element in article:
            article_text += '\n' + ''.join(element.findAll(text = True))
        article_text = article_text.replace('\n', '')
        first_sentence = article_text.split('.')
        first_sentence = first_sentence[0].split('?')[0]

        chars_without_whitespace = first_sentence.translate(
            { ord(c): None for c in string.whitespace }
        )

        print("trying again")

        if len(chars_without_whitespace) > 0:
            result = first_sentence
            print("how old is samuel :(")

        else:
            result = fallback
            print("how old is ol sammy")

        return result
    except:
        if len(result) == 0: result = fallback
        print("ashleigh needs a charger")
        return result
