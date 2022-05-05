import React, {useRef, useState} from "react";
import {
    ActionSheet, ActionSheetItem,
    Alert,
    Card,
    Div,
    Footer,
    FormItem,
    FormLayout, Header, Headline, Link, ScreenSpinner,
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline, Icon28CopyOutline,
    Icon28DeleteOutline,
    Icon28EditOutline, Icon28MoreHorizontal
} from "@vkontakte/icons";
import declOfNum from '../../functions/delcOfNum';
import bridge from "@vkontakte/vk-bridge";

function CriticalNotes({criticalNotes, router, isDesktop, editNote, openSnackbar, allNotes, getNotes, openSnackbarDel, scheme, setPopout, platform, offline}) {
    // eslint-disable-next-line
    const [snackbarDel, setSnackbarDel] = useState(null)
    const TargetRef = useRef();

    const statuses = [
        'Открыт',
        'В работе',
        'Завершен',
        'На рассмотрении',
    ]

    const priorites = [
        'Низкий',
        "Средний",
        "Высокий",
        "Критический"
    ]

    function openDropdown(name, value, status, priority, id, index, stat, prior, ref) {
        setPopout(
            <ActionSheet
                onClose={() => setPopout(null)}
                iosCloseItem={
                    <ActionSheetItem autoclose mode="cancel">
                        Отменить
                    </ActionSheetItem>
                }
                toggleRef={ref}
            >
                <ActionSheetItem
                    autoclose
                    before={<Icon28EditOutline/>}
                    onClick={() => editNote(id, name, value, stat, prior)}
                >
                    Редактировать
                </ActionSheetItem>
                <ActionSheetItem
                    autoclose
                    before={<Icon28CopyOutline/>}
                    onClick={() => {
                        bridge.send(
                            "VKWebAppCopyText",
                            {
                                text: `${name}\n\n${value}\n\nСтатус: ${status}\n\nПриоритет: ${priority}`});
                        openSnackbar('Заметка скопирована!', <Icon28CheckCircleOutline/>)
                    }}
                >
                    Скопировать
                </ActionSheetItem>
                <ActionSheetItem
                    mode='destructive'
                    autoclose
                    before={<Icon28DeleteOutline/>}
                    onClick={() => openAlert(id, index)}
                >
                    Удалить
                </ActionSheetItem>
            </ActionSheet>
        )
    }

    function openAlert(id, index) {
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
                    action: () => deleteNote(id)
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить эту заметку?'
            />
        )
    }

    async function deleteNote(id) {
        try {
            router.toPopout(<ScreenSpinner/>)
            let token = window.location.search.slice(1)
            let params = {
                access_token: token,
                method: 'notes.deleteNote',
                noteId: Number(id),
            }
            await fetch(
                'https://sab.wan-group.ru/notes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(params)
                }
            )

            allNotes.items.forEach((el, index) => {
                if (el.noteId === id) {
                    let arr = allNotes
                    arr.items.splice(index, 1);
                    arr.count -= 1
                    getNotes(arr, false)

                    router.toBack()
                    openSnackbar('Заметка удалена!', <Icon28DeleteOutline/>);
                    return
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {criticalNotes.items.map((el, index) => {
                return (
                    <Div>
                        <Card mode='outline'>
                            <FormLayout>
                                <FormItem
                                    style={{whiteSpace: 'pre-line'}}
                                    top={
                                        <Header
                                            className='more'
                                            aside={!offline &&
                                            <Link
                                                onClick={(e) => {
                                                    openDropdown(
                                                        el.name,
                                                        el.value,
                                                        statuses[el.status],
                                                        priorites[el.priority],
                                                        el.noteId,
                                                        index,
                                                        el.status,
                                                        el.priority,
                                                        e.currentTarget
                                                    );
                                                }}
                                                getRootRef={TargetRef}
                                                className={scheme === 'space_gray' || scheme === 'vkcom_dark' ? 'search_blck' : 'search_wht'}
                                            >
                                                <Icon28MoreHorizontal/>
                                            </Link>
                                            }
                                        >
                                            <Headline
                                                style={{whiteSpace: 'pre-line', color: '#828282'}}
                                                weight='semibold'
                                            >
                                                {el.name}
                                            </Headline>
                                        </Header>
                                    }
                                    bottom={
                                        <>
                                            Статус: {statuses[el.status]} <br/>
                                            Приоритет: <span className={el.priority === 3 && 'critical'}>{priorites[el.priority]}</span> <br/>
                                            Создано: {el.time} <br/>
                                            Отредактировано: {el.timeEdit}
                                        </>
                                    }
                                >
                                    {el.value}
                                </FormItem>
                            </FormLayout>
                        </Card>
                    </Div>
                )
            })}
            <Footer>
                {criticalNotes.count !== 0 ?
                    `Всего ${criticalNotes.count} ${declOfNum(criticalNotes.count, ['заметка', 'заметки', 'заметок'])}`
                    :
                    'Тут нет заметок'
                }
            </Footer>

            {snackbarDel}
        </>
    )
};

export default CriticalNotes;
