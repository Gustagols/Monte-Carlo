{- cabal:
build-depends: base, scotty, random, text
-}

{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty
import System.Random.Stateful (uniformRM, globalStdGen)
import Control.Monad (replicateM)

-- Gera ponto aleatório no quadrado (-1,1)
randomPoint :: IO (Double, Double)
randomPoint = do
    x <- uniformRM (-1.0, 1.0) globalStdGen
    y <- uniformRM (-1.0, 1.0) globalStdGen
    return (x, y)

-- Função auxiliar para gerar a lista de pontos
genPoints :: Int -> IO [(Double, Double)]
genPoints n = replicateM n randomPoint

main :: IO ()
main = scotty 3001 $ do
    get "/" $ do
        file "public/index.html"

    get "/styles/:filename" $ do
        filename <- pathParam "filename"
        setHeader "Content-Type" "text/css"
        file $ "public/styles/" ++ filename

    get "/scripts/:filename" $ do
         filename <- pathParam "filename"
         setHeader "Content-Type" "application/javascript"
         file $ "public/scripts/" ++ filename

    get "/images/icons/:filename" $ do
        filename <- pathParam "filename"
        file $ "public/images/icons/" ++ filename

    get "/points" $ do
        n <- queryParam "n"
        points <- liftIO (genPoints n)
        json points
