import styles from './TransfersTable.module.css';

export const TransfersTable = ({data}) => {
  const formatDate = (time) => {
    const date = new Date(time)

    return date.toLocaleString("pt-BR", {
      year: "numeric",
      day: "numeric",
      month: "short"
    })
  }

  console.log(data)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Data</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Nome do Operador</th>
        </tr>
      </thead>
      <tbody>
      {data.length == 0 ? <tr><td colSpan={4} style={{textAlign:'center', verticalAlign:'middle'}}>Busque por uma conta</td></tr> : data.map((value) => {
          return (
            <tr key={value.id}>
              <td data-cell="Data" >{formatDate(Date.parse(value.transferDate))}</td>
              <td data-cell="Valor" >{value.value}</td>
              <td data-cell="Tipo" >{value.type}</td>
              <td data-cell="Nome do Operador" >{value.transferOperatorName}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}