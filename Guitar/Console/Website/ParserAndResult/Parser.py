import codecs
import re
import json, io

song = "Alan Walker - Alone (Feerum) [Easy].osu"

# Dictionary of hitobjects
hit_object_dict = {}

colors = {
    64:  'R',
    192: 'Y',
    320: 'G',
    448: 'B'
}

# Tries to open the given file
def open_file(file):
    try:
        file = codecs.open(file, encoding='utf-8')
        return file
    except IOError:
        print("File doesn't exist")


# Looks for the [HitObjects] header in the given file
def parse(file):
    lines = file.readlines()
    lines = list(map(str.strip, lines))
    category = ""
    for index, line in enumerate(lines):
        regex = re.compile(r'[\[(a-zA-Z)]*\]')
        result = re.search(regex, line)
        if result:
            category = result.group()
            print(result.group())
        elif category == "[HitObjects]":
            hitobjects(index, lines)


# Saves the hitobjects (values) and their time (keys) to the dictionary
def hitobjects(index, lines):
    temp = lines[index].split(",")
    value = colors[int((temp[0]))]
    key = str(temp[2])
    if not(int(temp[3]) == 128):
        tempd = {}
        tempd[key] = value
        hit_object_dict.update(tempd)


# Executes the total parser, dumping the dictionary in a json file after it's done
filename = open_file(song)
if not (filename is None):
    parse(filename)
    with io.open('Song.json', 'w', encoding='utf-8') as outfile:
        (json.dump(hit_object_dict, outfile))
