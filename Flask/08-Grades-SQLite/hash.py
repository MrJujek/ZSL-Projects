import hashlib

passwd = 'zaq1'.encode()
print(hashlib.sha256(passwd).hexdigest())
