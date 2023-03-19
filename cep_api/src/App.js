import { useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import './components/style.css'
import api from './components/api.js'
function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function eventClick() {
    if (input === '') {
      alert('Preencha algum CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro ao buscar')
      setInput('')
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite seu CEP..."
        ></input>

        <button onClick={eventClick} className="buttonBuscar">
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP:{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
