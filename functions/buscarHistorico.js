import axios from 'axios';
import { React, useState } from 'react'

export const buscarHistorico = async () => {
  let resposta;
  const oracleUrl = "INSERIR"

  axios(oracleUrl)
    .then(response => {
      if (response.status === 200) {
        setResposta(response.data)
      }
    })
    .then(console.log(resposta.items))
    .catch(erro => console.log(erro));

    return resposta.items;
};