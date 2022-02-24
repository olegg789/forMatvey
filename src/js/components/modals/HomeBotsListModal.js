import React, {useState} from 'react';

import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    withPlatform,
    IOS,
    FormLayout,
    FormItem,
    Textarea,
    Input,
    Div,
    Button,
} from "@vkontakte/vkui";
import {
    Icon24Dismiss,
    Icon24Cancel,
    Icon28CheckCircleOutline,
    Icon28CancelCircleOutline,
} from '@vkontakte/icons'

function BotsListModal({id, platform, router, openSnackbar, getNotes}) {
    const [note, setNote] = useState('')
    const [value, setValue] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')

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

    async function addNote() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.createNote&access_token=${token}&name=${note.replace(/&/gi, '¦')}&value=${value.replace(/&/gi, '¦')}&status=${status}&priority=${priority}`)
            //console.log(response)
            // eslint-disable-next-line
            let responseJSON = await response.json()
            console.log(responseJSON)
            if (response.ok) {
                router.toBack()
                getNotes()
                openSnackbar('Заметка создана!', <Icon28CheckCircleOutline/>)
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
        catch(err) {
            console.log(err)
        }
    }

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton
                            onClick={
                                () => router.toBack()
                            }
                        >
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton
                            onClick={
                                () => router.toBack()
                            }
                        >
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Создать заметку
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <FormLayout>
                <FormItem
                    top='Введите имя заметки'
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
                    top='Введите текст заметки'
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
                    top='Введите статус заметки'
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
                    top='Введите приоритет заметки'
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
                        onClick={() => addNote()}
                   >
                        Создать
                    </Button>
                </Div>
            </FormLayout>
        </ModalPage>
    );
}

export default withPlatform(BotsListModal);