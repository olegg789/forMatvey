import React from "react";
import { useEffect, useState } from "react";
import { SimpleCell, Switch, Spinner } from "@vkontakte/vkui";
import { Icon28MoonOutline } from "@vkontakte/icons";

let isDarkScheme = false

function ThemeControllers() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1);
  }, []);

  function changeScheme() {
    let schemeAttribute = document.createAttribute('scheme');
    isDarkScheme = !isDarkScheme
    schemeAttribute.value = isDarkScheme ? 'space_gray' : 'bright_light'
    document.body.attributes.setNamedItem(schemeAttribute)
  }

  return (
      <SimpleCell
        before={<Icon28MoonOutline />}
        disabled
        after={
          loaded ? (
            <Switch
              onChange={() => changeScheme()}
              aria-label="Тёмная тема"
            />
          ) : (
            <Spinner size="regular" />
          )
        }
      >
        Тёмная тема
      </SimpleCell>
  );
};

export default ThemeControllers;