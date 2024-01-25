# with open('text1.txt', 'r') as f1:
#     text = f1.read()

# decoded_text = text.encode('utf-8').decode('unicode_escape')

with open('tekst1.txt', 'r') as f1:
    text = f1.read()
    
decoded = ""
splitted = text.split("\n")
# print(splitted)

for i in range(len(splitted)):
    arr = splitted[i].split(",")
    # print(arr)
    
    for j in range(len(arr)):
        print(arr[j])
        if arr[j] == '':
            continue
        decoded+= chr(int(arr[j]))
        
    decoded += "\n"
    # if len(arr) >= 1:
    #     print(''.join(chr(int(i)) for i in L))
    #     for j in range(len(arr)):
    #         # print(chr(int(arr[j])))
    #         decoded += chr(int(arr[j]))
    # else:
    #     decoded += "\n"
# decoded = ""
# for i in range(len(splitted)):
#     if len(splitted[i].split("\n"))>1:
#         for j in range(len(splitted[i].split("\n"))):
#             if splitted[i].split("\n")[j] == "":
#                 continue
            
#             decoded = decoded + chr(int(splitted[i].split("\n")[j]))
#     else:
#         decoded = decoded + chr(int(splitted[i]))
    
print(decoded)

with open('text2.txt', 'w', encoding='utf-8') as f2:
    f2.write(decoded)
# print(decoded)
# for i in range(len(text.split(","))):
    # print(i)
# ''.join(chr(int(text.split(",")[i])) for i in range(len(text.split(","))))