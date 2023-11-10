import os

with open('airlines.txt', 'r', encoding='utf-16') as f:
    airlines = f.read()
    
arr = list((''.join(airlines)).split(";"))
airlines = []
countries = {}
for i in range(len(arr)):
    arr[i] = arr[i].strip()
    if arr[i] != "":
        temp = arr[i].split(",")
        for j in range(len(temp)):
            temp[j] = temp[j].strip().lower()
        temp[2] = temp[2].replace(" ", "_").title()

        if temp[2] not in countries:
            countries[temp[2]] = []
        countries[temp[2]].append(temp)

for country in countries:
    if len(countries[country]) > 1:
        if not os.path.exists('new'):
            os.makedirs('new')

        if country == "":
            with open(f"new/_inne.txt", 'w', encoding='utf-8') as f:
                for airline in countries[country]:
                    f.write(f"{airline[0]}, {airline[1]}, {airline[3]}\n")
        else:
            with open(f"new/{country}.txt", 'w', encoding='utf-8') as f:
                for airline in countries[country]:
                    f.write(f"{airline[0]}, {airline[1]}, {airline[3]}\n")

print("----------- 2 -----------")
count = {}
for country in countries:
    if country == "":
        count["_inne"] = len(countries[country])
    else:
        count[country] = len(countries[country])

count = {k: v for k, v in sorted(count.items(), key=lambda item: item[1], reverse=True)}
for k, v in count.items():
    print(f"{k}: {v}")

print("\n----------- 3 -----------")
no_callsign = 0
for country in countries:
    for airline in countries[country]:
        if airline[1] == "":
            no_callsign += 1
print(f"Linie lotnicze bez znaku wywoławczego: {no_callsign}")

print("\n----------- 4 -----------")
longest_name = ""
for country in countries:
    for airline in countries[country]:
        if len(airline[0].replace(" ", "").replace("-", "")) > len(longest_name):
            longest_name = airline[0]
print(f"Nazwa: {longest_name} ({len(longest_name.replace(' ', ''))})")
for country in countries:
    for airline in countries[country]:
        if airline[0].replace(" ", "").replace("-", "") == longest_name.replace(" ", "").replace("-", ""):
            print(f"Znak wywoławczy: {airline[1]}")
            print(f"Kraj: {country}")
            print(f"Aktywna: {airline[3]}")

print("\n----------- 5 -----------")
inactive_lines = {}
for country in countries:
    if (country != ""):
        for airline in countries[country]:
            if airline[3] == "n":
                if country not in inactive_lines:
                    inactive_lines[country] = []
                inactive_lines[country].append(airline)

inactive_lines = {k: sorted(v, key=lambda x: x[0]) for k, v in sorted(inactive_lines.items(), key=lambda item: len(item[1]), reverse=True)}
most = inactive_lines[list(inactive_lines.keys())[0]]
print(most[0][2],len(most))
