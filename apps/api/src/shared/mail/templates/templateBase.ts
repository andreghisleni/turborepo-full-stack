const css = `
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;

  font-family: sans-serif;
  font-size: 14px;
  color: #000;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  
  align-items: center;


  padding-top: 20px;

  gap: 16px;
  background-color: #f6f6f6;
}

div.container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;

  background-color: #fff;

  padding: 24px;

  border-radius: 10px;

  gap: 16px;
}

div.container button {
    border: solid 1px #3498db;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: capitalize;
    background-color: #3498db;
    border-color: #3498db;
    color: #ffffff;

    max-width: 200px;
}

div.container h1{
  font-size: 24px;
  font-weight: bold;
}

div.container h2{
  font-size: 20px;
  font-weight: bold;
}
div.container h3{
  font-size: 18px;
  font-weight: bold;
}

div.container a {
  text-decoration: none;
  color: #000;
}

div.container:hover a{
  text-decoration: underline;
}

div.container a:hover{
  font-weight: 600;
}


div.footer{
  margin-top: 16px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 12px
}

div.footer p {
  color: #999;
}

div.footer a {
  text-decoration: none;
  color: #999;
}

div.footer:hover a{
  text-decoration: underline;
}

div.footer a:hover{
  font-weight: 600;
}


`;

const footer = `
<div class="footer">
  <p>G Colecionáveis LTDA, Rua Onde Judas perdeu as botas, 123 </p>
  <p>Envidado por G-Colecionáveis.</p>
</div>
`;

export const baseHtml = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{email_title}}</title>
    <style>
      ${css}
    </style>
  </head>
  <body>
    <div class="container">
      ${content}
    </div>
    
    ${footer}
  </body>
</html>
`;
