import { Formik, Form } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'
import Input from './Input'
import Button from './Button'
import Container from './Container'
import Section from './Section'
import Balance from './Balance'
import { useState } from 'react'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-Us', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    )
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <H1>Calcule su interés</H1>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required('Obligatotio')
              .typeError('Debe ser un numero'),
            contribution: Yup.number()
              .required('Obligatotio')
              .typeError('Debe ser un numero'),
            years: Yup.number()
              .required('Obligatotio')
              .typeError('Debe ser un numero'),
            rate: Yup.number()
              .required('Obligatotio')
              .typeError('Debe ser un numero')
              .min(0, 'El valor minimo es cero')
              .max(1, 'El valor maximo es de 1'),
          })}
        >
          <Form>
            <Input name='deposit' label='Depósito Inicial' />
            <Input name='contribution' label='Contribución Anual' />
            <Input name='years' label='Años' />
            <Input name='rate' label='Interés Estimado' />
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance> Balance final: {balance} </Balance> : null}
      </Section>
    </Container>
  )
}

const H1 = styled.h1`
  text-align: center;
  color: palevioletred;
`

export default App
