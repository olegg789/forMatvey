import React, {useEffect, useState} from 'react';

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    FormLayout,
    FormItem,
    SimpleCell,
    Avatar,
    ScreenSpinner,
    Title,
    Gradient,
    Text,
} from "@vkontakte/vkui";
import ThemeControllers from "../../components/navigation/themeControllers";
import {Icon28Users3Outline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

let isInfoUser = false
let infoUser = ['Загрузка...']

function HomePanelPlaceholder({router, isDesktop}) {
    const [infoUsers, setInfoUser] = useState(infoUser)

    useEffect(() => {
        if (!isInfoUser) {
            getInfoUser()
        }
    })

    async function getInfoUser() {
        router.toPopout(<ScreenSpinner/>)

        let user_info = await bridge.send('VKWebAppGetUserInfo');
        infoUser[0] = user_info.first_name + ' ' + user_info.last_name
        infoUser.push(user_info.photo_200)
        infoUser.push(user_info.id)

        setInfoUser(infoUser)
        isInfoUser = true

        router.toPopout()
    }

    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Настройки
            </PanelHeader>

            <Group>
                <Gradient className={isDesktop ? 'ProfileUserWeb' : 'ProfileUserMobail'}>
                    <Avatar size={96} src={infoUsers[1]}/>

                    <Title
                        className='NameUser'
                        level="2"
                        weight="2"
                    >
                        {infoUsers[0]}
                    </Title>

                    <Text className='SubheaderUser'>
                        Олег Чикелев лучший разработчик
                    </Text>
                </Gradient>
                <FormLayout>
                    {isDesktop &&
                    <FormItem>
                        <ThemeControllers/>
                    </FormItem>
                    }
                    <FormItem>
                        <SimpleCell
                            before={<Icon28Users3Outline/>}
                            href='https://vk.com/sab_t'
                            target='_blank'
                        >
                            Группа разработчика
                        </SimpleCell>
                    </FormItem>
                </FormLayout>
            </Group>
        </>
    )
}

export default HomePanelPlaceholder;