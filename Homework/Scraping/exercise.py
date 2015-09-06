# Name :
# Student number :
'''
This module contains an implementation of split_string.
'''

# You are not allowed to use the standard string.split() function, use of the
# regular expression module, however, is allowed.
# To test your implementation use the test-exercise.py script.

# A note about the proper programming style in Python:
#
# Python uses indentation to define blocks and thus is sensitive to the
# whitespace you use. It is convention to use 4 spaces to indent your
# code. Never, ever mix tabs and spaces - that is a source of bugs and
# failures in Python programs.

"""
X =
Y = []     <--- dit is de lijst die als laatst geprint wordt

je hebt een woord = alabama
je seperatoren zijn b en m


kijk naar de eerste letter = a
is het een b ? is het een m?
nee

voeg toe aan X

volgende letter is L ook geen b of m dus voeg toe aan X
volgende letter is A ook geen b of m dus voeg toe aan X

X is nu dus ala

volgende letter is b, het is wel een b of een m dus:
voeg X toe aan de lijst Y      <--- Y wordt dan Y = [ala]
maak X leeg door te zeggen X = 0
en ga door tot alle letters zijn geweest.


laatste letter is a: geen b of m dus voeg toe aan X
einde loop want er zijn geen letters meer

laatste check:
x=true ? (dus zit er wat in?)
zo ja: voeg wat er in X zit toe aan Y

uiteindelijk is je Y dan Y = [ala,a,a]
 
"""

def split_string(source, separators):
    x= []
    y=[]
    '''
    Split a string <source> on any of the characters in <separators>.

    The ouput of this function should be a list of strings split at the
    positions of each of the separator characters.
    '''
    # PROVIDE YOUR IMPLEMENTATION HERE
    for letter in source:
        if letter not in separators:
            x.append(letter)
        else:
            squashedx= ''.join(x)
            y.append(squashedx)
            x=[]
    squashedx= ''.join(x)
    y.append(squashedx)
    y = [d for d in y if d != ''] #removes all empty strings from list.
                                  # source: http://stackoverflow.com/questions/
                                  # 13138978/remove-empty-string-from-list
    return y
                

if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.
    print split_string('abacadabra', 'ba')  # should print: ['c', 'd', 'r']

