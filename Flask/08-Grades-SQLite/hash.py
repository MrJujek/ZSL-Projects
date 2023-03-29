import hashlib

passwd = 'julo'.encode()
print(hashlib.sha256(passwd).hexdigest())
