import React, {useEffect, useRef, useState} from 'react';

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    Search,
    Footer,
    FormLayout,
    FormItem,
    Headline,
    Card,
    Div,
    Alert,
    ScreenSpinner, ActionSheet, ActionSheetItem, Link, Header
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline,
    Icon28CopyOutline,
    Icon28DeleteOutline,
    Icon28EditOutline, Icon28MoreHorizontal
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import declOfNum from "../../functions/delcOfNum";

function SearchNotes({
      isDesktop,
      router,
    allNotes,
    openSnackbar,
    editNote,
    getNotes,
    setSnackbar, scheme, setPopout, platform, offline
}) {

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

    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState(allNotes.items)

    useEffect(() => {setSnackbar(null)})

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
                    action: () => {deleteNote(id, index); router.toBack()}
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить эту заметку?'
            />
        )
    }

    async function deleteNote(id, index) {
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
            let arr = allNotes
            arr.items.splice(index, 1);
            arr.count -= 1
            getNotes(arr, false)

            return
        }
        catch (err) {
            console.log(err)
        }
    }

    function onChange(e) {
        const {name, value} = e.currentTarget;

        if (name === 'search') {
            setSearch(value)
            const res = allNotes.items.filter(({ name }) => name.toLowerCase().indexOf(value) > -1)
            setNotes(res)
            if (value === '') {
                setNotes(allNotes.items)
            }
        }
    }

    return(
        <>
            <PanelHeader
                separator
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Поиск
            </PanelHeader>

            <Group>
                <Search
                    value={search}
                    onChange={(e) => onChange(e)}
                    name='search'
                />
            </Group>

            <Group>
                {notes.length !== 0 ?
                    <>
                    {notes.map((el, index) => {
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
                    <Footer>Всего {notes.length} {declOfNum(notes.length, ['заметка', 'заметки', 'заметок'])}</Footer>
                    </>
                    :
                    <Footer>Ничего не найдено</Footer>
                }
            </Group>
        </>
    )
}

export default SearchNotes;