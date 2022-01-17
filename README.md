<div align="center">
     <img style="width: 25%;" src="https://user-images.githubusercontent.com/63814295/149837280-73fac270-b377-4762-a338-fed47ca7bd85.png" />
      <h3>
          Automatize suas aulas onlines do google meet. Tenha uma ferramenta para entrar em todas suas aulas onlines sozinha e para procurar palavras-chaves(customizáveis) no bate-papo. Nunca mais perca uma chamada.
      </h3>
</div>


## Funcionalidades📖

* #### Assim que você configurar seu horário no arquivo easyclassconfig, o sistema entrará em todas as suas aulas automaticamente.
* * #### O sistema ler seu horário(verificando o dia e tempo de início de cada aula configurada) e a cada segundo verificará se existe aula disponível para ser inicialiazada, caso encontrar: o sistema entrará na aula de forma automática.
* #### Procura por palavras-chaves(é possível customizar no arquivo easyclassconfig) em cada mensagem enviada no bate-papo e se encontrar: emite um som de notificação e lhe alertará com uma mensagem na tela.
* * #### Se caso quiser ser alertado sobre o início da chamada, configure às palavras-chaves para palavras que são relacionadas à chamada. Ex: presente, chamada e etc.

## começando⚙️
````
1.Instale às dependencias:
      npm i 
        or
      yarn install
      
2.Configure seu horário, credenciais de login de sua conta do google e suas preferências. 
no arquivo easyclassconfig.

3.Inicialize:
      npm run start
        or
      yarn start
 ````
 
## Visualização
video(youtube): https://www.youtube.com/watch?v=trbRzr1ly4c

imagens(figma): https://www.figma.com/file/fjcUsGHROOAYEpgGdM4llR/Untitled?node-id=0%3A1

## Perguntas Frequentes

#### Q: Estou com problemas com o error: "No node found for selector"
* Verifique se todos dados do arquivo easyclassconfig estão preenchidos
* Certifique-se de que você esteja em uma boa conexão com à internet. Existe um intervalo de tempo entre 2 ações(3000 milisegundos). Se à pagina tiver uma demora para responder, ultrapassando 3000 milisegundos, o sistema tentará executar a próxima ação e falhará, pois a página ultrapassou os 3000 milisegundos.

#### Q: Onde configuro minhas credenciais de login, horário e palavras-chaves?
* No diretório principal, procure pelo o arquivo `easyclassconfig` e abra. Nele, terá às variáveis para autenticação no google(email, password("senha")), schedule("horário") e keyword("palavra-chave"). Configure com seus dados.

## Suporte
Entre em contato pelo endereço de e-mail `wagnerleandro.developer@gmail.com`.

 ## tecnologias🚀
<div align="left">
    <img style="width:12%;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
    <img style="width:12%;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" />
    <img style="width:7%;" src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" />
    <img style="width:12%;" src="https://avatars.githubusercontent.com/u/14921202?s=200&v=4" />
    <img style="width:12%;" src="https://user-images.githubusercontent.com/63814295/149678085-21e860ea-07e4-4945-bba3-b83528d688fe.png" />
</div>

## Autor
 Feito por Wagner Leandro(@wagner-dev).