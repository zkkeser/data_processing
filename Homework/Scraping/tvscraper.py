#!/usr/bin/env python
# Name: Kubilay Keser
# Student number: 10610286
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    tvseries = []
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    for e in dom.by_tag("td.title")[:5]: # Top 5 reddit entries.
        sublist = []
        #Title
        for a in e.by_tag("a")[:1]: # First <a class="title"> in entry.
            title = str(plaintext(a.content))
            sublist.append(title)
            print title
        #Rating
        for a in e.by_tag("div.user_rating")[:1]: # First <a class="title"> in entry.
            user_rating =str(plaintext(a.content))[11:-4]
            sublist.append(user_rating)
        #Genre
        for a in e.by_tag("span.genre")[:1]: # First <a class="title"> in entry.
            bad_genre =str(plaintext(a.content))
            good_genre = bad_genre.replace("|",",")
            sublist.append(good_genre)
        #Actors
        for a in e.by_tag("span.credit")[:1]: # First <a class="title"> in entry.
            actors = str(plaintext(a.content))[6:]
            sublist.append(actors)
        #Runtime
        for a in e.by_tag("span.runtime")[:1]:
            runtime = int(plaintext(a.content)[:-6])
            sublist.append(runtime)
        tvseries.append(sublist)
    #print tvseries
    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    return tvseries # replace this line as well as appropriate

    

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])
    writer.writerows(tvseries)
    

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
