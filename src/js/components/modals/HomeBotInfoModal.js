import React, {useState} from 'react';

import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    withPlatform,
    IOS, FormItem, Textarea, Div, Button, FormLayout, NativeSelect
} from "@vkontakte/vkui";
import {Icon24Dismiss, Icon24Cancel, Icon28CheckCircleOutline, Icon28CancelCircleOutline} from '@vkontakte/icons'

function BotsListModal({id, getMinorNotes, getMiddleNotes, getMajorNotes, getCriticalNotes, platform, getNotes, openSnackbar, router, noteId, noteName, noteValue, noteStatus, notePriority}) {

    const [note, setNote] = useState(noteName)
    const [value, setValue] = useState(noteValue)
    const [status, setStatus] = useState(noteStatus)
    const [priority, setPriority] = useState(notePriority)

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


    async function oncChange(e) {

        const {name, value} = e.currentTarget;

        if (name === 'name') {
            setNote(value)
        }

        else if (name === 'value') {
            setValue(value)
        }

        else if (name === 'status') {
            setStatus(value)
        }

        else if (name === 'priority') {
            setPriority(value)
        }
    }

    async function editNOTE() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.editNote&access_token=${token}&name=${note.replace(/&/gi, '¦')}&value=${value.replace(/&/gi, '¦')}&status=${status}&priority=${priority}&noteId=${noteId}`)
            // eslint-disable-next-line
            let responseJSON = await response.json()
            if (response.ok) {
                router.toBack()
                getNotes()
                getMinorNotes()
                getMiddleNotes()
                getMajorNotes()
                getCriticalNotes()
                openSnackbar('Заметка отредактирована!', <Icon28CheckCircleOutline/>)
            }
            else if (responseJSON.error) {
                if (responseJSON.code === '12') {
                    router.toBack()
                    openSnackbar('Произошла ошибка, вы ввели некорректное имя. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '10') {
                    router.toBack()
                    openSnackbar('Произошла ошибка, вы ввели некорректный статус. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '11') {
                    router.toBack()
                    openSnackbar('Произошла ошибка, вы ввели некорректный приоритет. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '13') {
                    router.toBack()
                    openSnackbar('Произошла ошибка, вы ввели некорректное значение заметки. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
                else if (responseJSON.code === '14') {
                    router.toBack()
                    openSnackbar('Произошла ошибка, некорректный айди заметки. Попробуйте снова!', <Icon28CancelCircleOutline/>)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Редактирование заметки
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <FormLayout>
                <FormItem
                    top='Имя заметки'
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
                    <NativeSelect
                        name='status'
                        placeholder='Не выбран'
                        value={status}
                        onChange={(e) => oncChange(e)}
                    >
                        {statuses.map((el) => {
                            return(
                                <option value={el.value}>{el.status}</option>
                            )

                        })}
                    </NativeSelect>
                </FormItem>
                <FormItem
                    top='Введите приоритет заметки'
                >
                    <NativeSelect
                        name='priority'
                        placeholder='Не выбран'
                        value={priority}
                        onChange={(e) => oncChange(e)}
                    >
                        {priorities.map((el) => {
                            return(
                                <option value={el.value}>{el.priority}</option>
                            )
                        })}
                    </NativeSelect>
                </FormItem>
                <Div>
                    <Button
                        size='l'
                        stretched
                        onClick={() => editNOTE()}
                    >
                        Сохранить
                    </Button>
                </Div>
            </FormLayout>
        </ModalPage>
    );
}

export default withPlatform(BotsListModal);