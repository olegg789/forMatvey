import {Button, Card, Div, Footer, FormItem, FormLayout} from "@vkontakte/vkui";
import {Icon28DeleteOutline, Icon28EditOutline} from "@vkontakte/icons";
import React from "react";

{
    allNotes.items.map((el) => {
        return(
            <Div>
                <Card mode='outline' className={el.priority === 3 && 'critical'}>
                    <FormLayout>
                        <FormItem
                            top={
                                el.name
                            }
                            bottom={
                                `Статус: ${statuses[el.status]}, приоритет: ${priorites[el.priority]}`
                            }
                        >
                            {el.value}
                        </FormItem>
                        <FormItem>
                            <Button
                                className='btnNote'
                                mode='outline'
                                onClick={() => editNote(el.noteId, el.name, el.value, el.status, el.priority)}
                                sizeY='regular'
                            >
                                <Icon28EditOutline/>
                            </Button>
                            <Button
                                className='btnNote'
                                mode='outline'
                                appearance='negative'
                                sizeY='regular'
                                onClick={() => openAlert(el.noteId)}
                            >
                                <Icon28DeleteOutline/>
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Card>
            </Div>
        )
    })}
<Footer>{`Всего заметок: ${allNotes.count}`}</Footer>
