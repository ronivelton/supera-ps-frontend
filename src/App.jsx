import { useState } from 'react';
import { TransfersTable } from './components/TransfersTable'
import axios from 'axios';

import { InputDate } from './components/InputDate';
import { Button } from './components/Button';

import {container, formAccount, formFilter, balanceContainer} from  './App.module.css'

function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operatorName, setOperatorName] = useState();
  const [accountNumber, setAccountNumber] = useState("")
  const [totalBalance, setTotalBalance] = useState(0.0)
  const [filterBalance, setFilterBalance] = useState(0.0)

  const handleSubmitFilter = async (e) => {
    e.preventDefault()
    const response = await axios.get(`http://localhost:8080/api/transactions/accounts/${accountNumber}`, {
      params: {
        "startDate": startDate == "" ? null : startDate,
        'endDate': endDate == "" ? null : endDate,
        'transferOperatorName': operatorName == "" ? null : operatorName
      }
    })
    calculateFilterBalance(response.data)
    setData(response.data)
  }

  const handleSubmitAccount = async (e) => {
    e.preventDefault()
    const response = await axios.get(`http://localhost:8080/api/transactions/accounts/${accountNumber}`, {
      params: {
        "startDate": startDate == "" ? null : startDate,
        'endDate': endDate == "" ? null : endDate,
        'transferOperatorName': operatorName == "" ? null : operatorName
      }
    })
    calculateTotalBalance(response.data)
    setData(response.data)
  }

  const calculateFilterBalance = (data) => {
    let sumAllValues = data.reduce((accumulator, current) => accumulator + current.value, 0).toLocaleString('pt-BR')

    setFilterBalance(sumAllValues)
  }

  const calculateTotalBalance = (data) => {
    let sumAllValues = data.reduce((accumulator, current) => accumulator + current.value, 0).toLocaleString('pt-BR')

    setTotalBalance(sumAllValues)
    setFilterBalance(sumAllValues)
  }

  const formatData = (data) => {
    if (data.length == 0) return data

    const formatData = data.map((each) => {
      console.log(each)
      return {
        ...each,
        value: `R$ ${each.value.toLocaleString('pt-BR')}`
      }
    })

    return formatData
  }

  return (
    <main className={container}>
      <form className={formAccount} onSubmit={handleSubmitAccount}>
        <input type="number" placeholder='Numero da conta' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        <Button type={"type"}>Buscar</Button>
      </form>

      <form className={formFilter} onSubmit={handleSubmitFilter}>
          <InputDate placeholder="Data de inicio" date={startDate} setDate={setStartDate}/>
          <InputDate placeholder="Data de fim" date={endDate} setDate={setEndDate}/>
          <input type="text" placeholder='Nome do operador' value={operatorName} onChange={(e) => setOperatorName(e.target.value)} />
          <Button type={"type"}>Filtrar</Button>
      </form>

      <div className={balanceContainer}>
        <span><strong>Saldo total:</strong> R$ {totalBalance}</span>
        <span><strong>Saldo no período:</strong> R$ {filterBalance}</span>
      </div>

      <TransfersTable data={formatData(data)}/>
    </main>
  )
}

export default App
