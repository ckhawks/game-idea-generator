output = []
with open('places-raw.txt', 'r') as placesFile:
    places = placesFile.readlines()

    for place in places:
        output.append(''.join([i for i in place[3:] if not i.isdigit()]))
    
with open('places.txt', 'w') as f:
    f.writelines(output)