with open('dane.txt') as f:
    lines = f.read().strip().split('\n')

f.close()

def isPalindrome(n):
    return str(n) == str(n)[::-1]


def dec_to_custom(n, base):
    b = []
    letters = ['A', 'B', 'C', 'D', 'E', 'F']
    if n == 0:
        return '0'
    while n > 0:
        rest = n % base
        if base == 16 and rest > 9:
            b.append(letters[rest - 10])
        else:
            b.append(str(rest))
        n //= base
    return "".join(b[::-1])


################ 1 ################
count = 0
for line in lines:
    b = dec_to_custom(int(line), 2)
    if isPalindrome(b):
        count += 1
print(f'1: {str(count)}')


################ 2 ################
count = 0
for line in lines:
    b = dec_to_custom(int(line), 16)
    if isPalindrome(b):
        count += 1
print(f'\n2: {str(count)}')


################ 3 ################
count_in_systems = {
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0
}

for line in lines:
    for key in count_in_systems.keys():
        new = dec_to_custom(int(line), int(key))
        if isPalindrome(new):
            count_in_systems[key] += 1
print(f'\n3: {str(count_in_systems)}')


################ 4 ################
numbers = {}
for line in lines:
    p_count = 0
    palindromes = []
    for key in range(2, 17):
        new = dec_to_custom(int(line), int(key))
        if isPalindrome(new):
            p_count += 1
            palindromes.append(key)
    numbers[line] = {
        'p_count': p_count,
        'palindromes': palindromes
    }

max_p = 0
for key in numbers.keys():
    if numbers[key]['p_count'] > max_p:
        max_p = numbers[key]['p_count']

sorted_numbers = sorted(numbers.items(), key=lambda x: x[1]['p_count'], reverse=True)

print(f'\n4:')
for i in sorted_numbers[:3]:
    print(f'{i[0]} {i[1]["p_count"]} {i[1]["palindromes"].__str__().replace("[", "").replace("]", "").replace(",", "")}')