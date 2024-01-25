import string
import random

chars = string.ascii_letters + string.digits + string.punctuation

passLength = 10

passwords = []
for i in range(10):
    password = ''.join(random.sample(chars, passLength))
    print(password)
    passwords.append(password)

with open('passwords.txt', 'w') as f:
    for password in passwords:
        f.write(''.join(random.sample(password, len(password))) + '\n')
        

