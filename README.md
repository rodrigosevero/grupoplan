Procedimento para testar o código:

Instalação do backend:

1 - clonar o repositório:<br>
git clone https://github.com/rodrigosevero/grupoplan.git

2 - entrar no diretorio:<br>
cd gruplan

3 - entrar no diretorio backend rodar o composer:<br>
cd backend<br>
composer install

4 - acessar o dciretorio backend e renomer .env.example para .env e alterar o os dados de acesso ao banco de dados :<br>
DB_CONNECTION=mysql<br>
DB_HOST=127.0.0.1<br>
DB_PORT=3306<br>
DB_DATABASE=<nome do banco><br>
DB_USERNAME=<usuario do banco><br>
DB_PASSWORD=<senha do banco><br>

4 - ainda no diretorio backend rodar o composer:<br>
php artisan migrate

5 - rodar o backend:<br>
php artisan key:generate<br>
php artisan serve

6: acessar backend:<br>
http://127.0.0.1:8000

Testa a api via postman:

1 - Listar produtos:
GET - http://127.0.0.1:8000/api/products/

2 - Cadastrar produtos:
POST - http://127.0.0.1:8000/api/products/store


3 - Atualizar produtos:
POST - http://127.0.0.1:8000/api/products/{id}<BR>

para atualizar e cadastrar enviar:
{
    "name": "produto teste",
    "description": "descricao",
    "voltage": "220",
    "brand" "Eletrolux"
}

3 - deletar produtos:
DELETE - http://127.0.0.1:8000/api/products/{id}

Levantar o frontend:

1 - acessar o diretorio /frontend:<br>

cd frontend<br>
npm install<br>
npm start<br>

2 - acessar:
http://localhost:3000
