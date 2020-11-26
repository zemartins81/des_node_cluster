# Problema:

Precisamos de uma API para receber a atualização de dados cadastrais de produtos. Ela deve receber um corpo no formato JSON, onde o tamanho varia desde alguns poucos Kb até alguns Gb.
Experiências anteriores mostram que alguns clientes costumam enviar o mesmo corpo repetidas vezes ao longo de um curto espaço de tempo.
Isso nos causou alguns problemas, como o fato de ter que escalar nossos bancos de dados muito além do necessário afim de aguentar a carga extra desnecessária.
Para evitar que isto ocorra, precisamos que esta API negue requisições que tem o mesmo corpo num intervalo de 10 minutos.

Aqui está um exemplo do comportamento esperado:
- 2018-03-01T13:00:00 - primeira requisição, durante 10 minutos requests com o mesmo corpo serão negadas
> curl -XPOST http://your-api.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK

- 2018-03-01T13:09:59 - mesmo corpo que a request anterior.
> curl -XPOST http://your-api.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 403 Forbidden

- 2018-03-01T13:10:00 - agora a API deve voltar a aceitar o corpo
> curl -XPOST http://your-api.com.br/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK

Como esta API atenderá milhares de requisições simultâneas, ela precisa funcionar em um cluster.
É esperado que o comportamento descrito acima se mantenha, independente do nó que receber a requisição.

# Solução:

Para Rodar o Redis em um container docker:

> docker pull redis

> docker run --name redis13 -p 6379:6379 -d redis redis-server --appendonly no

No VSCode:

> yarn install

> yarn start

Para testar a solução, usei 4 instancias do insomnia, lançando requisições a cada 0,1s


