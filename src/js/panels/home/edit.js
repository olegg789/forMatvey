import React, {useEffect, useState} from 'react';

import {
    withPlatform,
    FormItem,
    Textarea,
    Div,
    Button,
    FormLayout,
    PanelHeader,
    Group,
    PanelHeaderBack,
    CustomSelect,
    CustomSelectOption,
    ScreenSpinner, Alert
} from "@vkontakte/vkui";
import {Icon28CheckCircleOutline, Icon28CancelCircleOutline} from '@vkontakte/icons'

function EditNote({
      getMinorNotes,
      getMiddleNotes,
      getMajorNotes,
      getCriticalNotes,
      platform,
      getNotes,
      openSnackbar,
      router,
      noteId,
      noteName,
      noteValue,
      noteStatus,
      notePriority,
      scheme,
      setSnackbar
}) {

    const [note, setNote] = useState(noteName)
    const [value, setValue] = useState(noteValue)
    const [status, setStatus] = useState(noteStatus)
    const [priority, setPriority] = useState(notePriority)
    const [countName, setCountName] = useState(`${noteName.length}/100`)
    const [countValue, setCountValue] = useState(`${noteValue.length}/300`)

    const statuses = [
        {value: '0', status: 'Открыт'},
        {value: '1', status: 'В работе'},
        {value: '2', status: 'Завершен'},
        {value: '3', status: 'На рассмотрении'}
    ]

    const priorities = [
        {value: '0', priority: 'Низкий'},
        {value: '1', priority: 'Средний'},
        {value: '2', priority: 'Высокий'},
        {value: '3', priority: 'Критический'}
    ]

    useEffect(() => {setSnackbar(null)}, [])

    async function oncChange(e) {

        const {name, value} = e.currentTarget;

        if (name === 'name') {
            setNote(value)
            setCountName(`${value.length}/100`)
        }

        else if (name === 'value') {
            setValue(value)
            setCountValue(`${value.length}/300`)
        }

        else if (name === 'status') {
            setStatus(value)
        }

        else if (name === 'priority') {
            setPriority(value)
        }
    }

    async function edit() {
        try {
            router.toPopout(<ScreenSpinner/>)
            let token = window.location.search.slice(1)
            let params = {
                method: 'notes.editNote',
                access_token: token,
                name: note,
                value: value,
                priority: Number(priority),
                status: Number(status),
                noteId: Number(noteId)

            };

            let response = await fetch(
                'https://sab.wan-group.ru/notes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(params)
                }
            )
            let responseJSON = await response.json()

            if (response.ok) {
                router.toBack()
                getNotes()
                openSnackbar('Заметка отредактирована!', <Icon28CheckCircleOutline/>)
            }
            else if (responseJSON.error) {
                if (responseJSON.code === '12') {
                    openSnackbar('Произошла ошибка, вы ввели некорректное имя. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '10') {
                    openSnackbar('Произошла ошибка, вы ввели некорректный статус. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '11') {
                    openSnackbar('Произошла ошибка, вы ввели некорректный приоритет. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '13') {
                    openSnackbar('Произошла ошибка, вы ввели некорректное значение заметки. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '14') {
                    openSnackbar('Произошла ошибка, некорректный айди заметки. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '7') {
                    openSnackbar('Кто-то флудит, ай-яй!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === 50) {
                    openSnackbar('Заметка не найдена. Возможно, она была удалена', <Icon28CancelCircleOutline/>)
                }
            }
            router.toBack()
        }
        catch (err) {
            console.log(err)
        }
    }

    function openAlert() {
        router.toPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    mode: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    mode: 'destructive',
                    action: () => {router.toBack(); router.toBack()}
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите выйти? Введённые значения не сохранятся.'
            />
        )
    }

    return (
        <>
            <PanelHeader
                separator
                left={<PanelHeaderBack onClick={() => openAlert()}/>}
            >
                Редактирование
            </PanelHeader>

            <Group>
                <FormLayout>
                    <FormItem
                        top='Имя заметки'
                        bottom={countName}
                    >
                        <Textarea
                            name='name'
                            placeholder='Введите значение...'
                            maxLength={100}
                            value={note}
                            onChange={(e) => oncChange(e)}
                        />
                    </FormItem>
                    <FormItem
                        top='Текст заметки'
                        bottom={countValue}
                    >
                        <Textarea
                            value={value}
                            name='value'
                            placeholder='Введите значение...'
                            maxLength={300}
                            onChange={(e) => oncChange(e)}
                        />
                    </FormItem>
                    <FormItem
                        top='Введите статус заметки'
                    >
                        <CustomSelect
                            name='status'
                            placeholder={<span className={scheme === 'space_gray' || scheme === 'vkcom_dark' ? 'plch_blck' : 'plch_wht'}>{statuses[status].status}</span>}
                            onChange={(e) => oncChange(e)}
                            options={statuses.map((el) => ({
                                label: el.status,
                                value: el.value,
                            }))}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption
                                    {...restProps}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        top='Введите приоритет заметки'
                    >
                        <CustomSelect
                            name='priority'
                            placeholder={<span className={scheme === 'space_gray' || scheme === 'vkcom_dark' ? 'plch_blck' : 'plch_wht'}>{priorities[priority].priority}</span>}
                            onChange={(e) => oncChange(e)}
                            options={priorities.map((el) => ({
                                label: el.priority,
                                value: el.value,
                            }))}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption
                                    {...restProps}
                                />
                            )}
                        />
                    </FormItem>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => edit()}
                        >
                            Сохранить
                        </Button>
                    </Div>
                </FormLayout>
            </Group>
        </>
    );
}

export default withPlatform(EditNote);