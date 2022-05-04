import { useField } from 'formik'
import styled from 'styled-components'

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <Control>
      <Label>{label}</Label>
      <MyInput type='text' {...field} {...props} />
      {meta.touched && meta.error ? <ErrorMsg>{meta.error}</ErrorMsg> : null}
    </Control>
  )
}

const Control = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  color: #000;
  display: block;
  margin-bottom: 5px;
`

const MyInput = styled.input`
  outline: none;
  padding: 8px;
  border: solid 1px #b1b3b5;
  border-radius: 4px;
  width: 100%;
`

const ErrorMsg = styled.div`
  color: #f00;
`

export default Input
