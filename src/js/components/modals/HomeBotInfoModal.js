import React, {useState} from 'react';

import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    withPlatform,
    IOS, FormItem, Textarea, Input, Div, Button, FormLayout
} from "@vkontakte/vkui";
import {Icon24Dismiss, Icon24Cancel, Icon28CheckCircleOutline, Icon28CancelCircleOutline} from '@vkontakte/icons'

function BotsListModal({id, platform, getNotes, openSnackbar, router, noteId, noteName, noteValue, noteStatus, notePriority}) {

    const [note, setNote] = useState(noteName)
    const [value, setValue] = useState(noteValue)
    const [status, setStatus] = useState(noteStatus)
    const [priority, setPriority] = useState(notePriority)

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
                openSnackbar('Заметка отредактирована!', <Icon28CheckCircleOutline/>)
            }
            else if (!response.ok) {
                if (responseJSON.code === 12) {
                    router.toBack()
                    openSnackbar('Произошла ошибка, вы ввели некорректное имя. Попробуйте снова!', <Icon28CancelCircleOutline/>)
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
                    bottom='string'
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
                    bottom='string'
                >
                    <Textarea
                        value={value}
                        name='value'
                        placeholder='Введите значение...'
                        maxLength={100}
                        onChange={(e) => oncChange(e)}
                    />
                </FormItem>
                <FormItem
                    top='Статус заметки'
                    bottom={`Возможные значения:
                    0 - открыт,
                    1 - в работе,
                    2 - завершен,
                    3 - на рассмотрении`}
                >
                    <Input
                        value={status}
                        name='status'
                        placeholder='Введите значение...'
                        type='number'
                        onChange={(e) => oncChange(e)}
                    />
                </FormItem>
                <FormItem
                    top='Приоритет заметки'
                    bottom='Возможные значения:
                    0 - низкий,
                    1 - средний,
                    2 - высокий,
                    3 - критический
                '>
                    <Input
                        value={priority}
                        name='priority'
                        placeholder='Введите значение...'
                        type='number'
                        onChange={(e) => oncChange(e)}
                    />
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