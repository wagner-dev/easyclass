import { object, string, array } from 'yup'

const AUTHORIZATION_CONFIG_SCHEMA = object({
  username: string().optional(),
  email: string().email('Email inválido').required('Email não informado'),
  password: string().required('Senha não informada')
})
const DAY_CONFIG_SCHEMA = object({
  matter: string().required('Nome de matéria não informado'),
  beginning: string().required('Tempo de início da sala não informado').matches(/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/, 'Tempo de início da sala inválido'),
  end: string().required('Tempo do final da sala não informado').matches(/^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/, 'Tempo do final da sala inválido'),
  code: string().required('Código da sala não informado').matches(/^[a-z]{3}-[a-z]{4}-[a-z]{3}$/, 'Código da sala inválido')
})
const SCHEDULE_CONFIG_SCHEMA = object({
  monday: array(DAY_CONFIG_SCHEMA).min(1, 'Horário da segunda-feira não informado'),
  tuesday: array(DAY_CONFIG_SCHEMA).min(1, 'Horário da terça-feira não informado'),
  wednesday: array(DAY_CONFIG_SCHEMA).min(1, 'Horário da quarta-feira não informado'),
  thursday: array(DAY_CONFIG_SCHEMA).min(1, 'Horário da quinta-feira não informado'),
  friday: array(DAY_CONFIG_SCHEMA).min(1, 'Horário da sexta-feira não informado')
})
const validationSchema = object({
  authorization: AUTHORIZATION_CONFIG_SCHEMA,
  schedule: SCHEDULE_CONFIG_SCHEMA
})

export { validationSchema }
