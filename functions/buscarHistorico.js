import axios from 'axios';
import { React, useState } from 'react'

export const buscarHistorico = async () => {
  let resposta;
  const oracleUrl = "https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/"

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