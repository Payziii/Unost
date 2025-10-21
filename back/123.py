import secrets
 
# Создание 16-байтового токена в шестнадцатеричном формате
token = secrets.token_hex(256)
print(token)
