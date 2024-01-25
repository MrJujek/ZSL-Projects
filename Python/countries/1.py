with open('countries.txt', 'r') as f:
    countries = f.readlines()
    
arr = ((''.join(countries)).split("\n"))

# print(arr)
polnoce = 0
poludniowe = 0
islands = 0
max_name = ['','', '', '']
names = []
with open('new_countries.txt', 'w', encoding='utf-8') as f:
    for i in range(len(arr)):
        if arr[i] == "":
            continue
        row = arr[i][:-1].split(",")
        
        to_save = []
        for j in range(len(row)):
            # print(row[j].strip())
            to_save.append(row[j].strip())
        # print(to_save)
        f.write(f"{to_save[0]}, {to_save[3]}, {to_save[1]}, {to_save[2]}\n")
        
        if (float(to_save[1]) > 0):
            polnoce += 1
        elif float(to_save[1]) < 0:
            poludniowe += 1
            
        if len(to_save[3].replace(" ", "")) > len(max_name[3].replace(" ", "")):
            max_name = to_save
            
        if 'island' in to_save[3].lower():
            islands += 1
            
        names.append(to_save[3].lower().capitalize())
   
print(f"{polnoce = }\n{poludniowe = }")         

print(f"{max_name[3].lower().capitalize()} ({len(max_name[3].replace(' ', ''))} znaków), {max_name[1]}, {max_name[2]}")

print(f"{islands = }")

names.sort()
print(names)
