# 1. Usamos uma imagem oficial do Haskell como base
FROM haskell:9.4

# 2. Definimos a pasta de trabalho dentro do servidor
WORKDIR /app

# 3. Atualizamos o índice do Cabal (para ele achar as bibliotecas)
RUN cabal update

# 4. Copiamos todos os seus arquivos para dentro do servidor
COPY . .

# 5. Compilamos o projeto
# O comando 'cabal build' vai ler o cabeçalho do seu main.hs e baixar tudo
# O "|| true" é um truque para ele não falhar se não achar um arquivo .cabal, 
# pois estamos usando o modo script
RUN cabal build --allow-newer backend/main.hs || true

# 6. COMANDO DE INICIALIZAÇÃO
# Dizemos ao Railway: "Para ligar o site, rode este comando"
CMD ["cabal", "run", "backend/main.hs"]