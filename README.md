# skyProject
API Criada em nojeJS para atender os requisitos de uma aplicação de Signup, Signin e consulta por cliente

##Métodos e exemplos de chamadas

GET Listar usuário: https://skyproj.herokuapp.com/api/user/{id}
Exemplo: https://skyproj.herokuapp.com/api/user/5cd4c2a619feba00174357de

POST SignUp: https://skyproj.herokuapp.com/api/user
Exemplo Body:
{
"nome": "alexandre",
"email":"alexandresp_novaes@hotmail.com",
"senha":"123456",
"telefones":[ 
 {
  "ddd":"16",
  "numero":"991778969"
 }
]
}

POST SignIn: https://skyproj.herokuapp.com/api/signin
Exemplo Body:
{
"email":"alexandresp_novaes@hotmail.com",
"senha":"123456"
}
