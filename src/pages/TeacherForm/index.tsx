import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

function TeacherForm() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [bio, setBio] = useState('')
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '00:00', to: '00:00' },
  ])
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  function addNewScheduleItem() {
    const scheduleItem = {
      week_day: 0,
      from: '',
      to: ''
    }

    setScheduleItems([...scheduleItems, scheduleItem])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro')
    })
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }
      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário"
      />

      <main>
        <form onSubmit={handleCreateClass}>

          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name"
              label="Nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={e => setWhatsApp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação física', label: 'Educação física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Português', label: 'Português' }
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={e => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem} >
                + Novo horário
              </button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' }
                      ]}
                    />
                    <Input
                      name="from"
                      label="Das"
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                      type="time"
                    />
                    <Input
                      name="to"
                      label="Até"
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                      type="time"
                    />
                  </div>
                )
              })
            }
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>

      </main>
    </div>
  )
}

export default TeacherForm