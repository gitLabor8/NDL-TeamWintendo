import codecs
import re
import json, io

filenametry = "Alan Walker - Alone (Feerum) [Easy].osu"

x_co = []
hit_object_dict = {}

colors = {
    64:  'R',
    192: 'Y',
    320: 'G',
    448: 'B'
}

# General variables
audio_filename = ""
audio_lead_in = ""
preview_time = ""
countdown = ""


def open_file(file):
    try:
        file = codecs.open(file, encoding='utf-8')
        return file
    except IOError:
        print("File doesn't exist")


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


def hitobjects(index, lines):
    temp = lines[index].split(",")
    value = colors[int((temp[0]))]
    print("Value: ", value, "\tIndex: ", index)
    key = str(temp[2])
    if not(int(temp[3]) == 128):
        tempd = {}
        if value not in x_co:
            x_co.append(value)
        if value is 271:
            print(index, " here")
        tempd[key] = value
        hit_object_dict.update(tempd)





filename = open_file(filenametry)
if not (filename is None):
    print("Yay")
    parse(filename)
    print("Yo")
    #for k, v in hit_object_dict.items():
    #    print(k, v)
    for i in x_co:
        print(i)
    with io.open('Song.json', 'w', encoding='utf-8') as outfile:
        (json.dump(hit_object_dict, outfile))
else:
    print("Boo")
