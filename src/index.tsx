import * as React from "react";
import type {YbugApi, SetUserType, YbugSettings } from "./ybug";

type YbugContextType = {
  Ybug: YbugApi | null;
  init: (settings: Partial<YbugSettings>) => void;
};
  
type YbugProviderProps = {
  ybugId: string;
  /*
    If you need for some reason to load the widget from another url than the default widget.ybug.io one
    you can pass the url here. You must ensure that the script at this url will match your ybugId
    eg: https://my.custom.domain/assets/scripts/ybug.js
  */
  url?: string;
  children: React.ReactNode;
  settings?: YbugSettings & { [key: string]: string };
};

const YbugContext = React.createContext<YbugContextType | null>(null);

function useYbugApi(): YbugContextType | null {
  return React.useContext(YbugContext);
}

function YbugProvider({ ybugId, url, children, settings }: YbugProviderProps): JSX.Element {
  const YBUG_DEFAULT_SCRIPT_URL = `https://widget.ybug.io/button/${ybugId}.js`;
  const [ybugApi, setYbugApi] = React.useState<YbugApi | null>(null);

  React.useEffect(() => {
    // @ts-expect-error will not be defined in window
    window.ybug_settings = {
      ...settings,
      hide_launcher: true,
      id: ybugId,
      onload: () => {
        // @ts-expect-error will not be defined in window
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setYbugApi(window.Ybug);
        settings?.onload?.();
      },
    };
    const script = document.createElement("script");
    script.defer = true;
    script.src = url ?? YBUG_DEFAULT_SCRIPT_URL;
    document.head.appendChild(script);

    return () => {
      if (ybugApi) {
        ybugApi.destroy();
      }
      script.remove();
    };
  }, []);

  const initYbug: YbugContextType["init"] = (settings) => {
    // @ts-expect-error will not be defined in window
    window.ybug_settings = {
      ...settings,
      id: ybugId,
      onload: () => {
        // @ts-expect-error will not be defined in window
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setYbugApi(window.Ybug);
        settings?.onload?.();
      },
    };
    if (ybugApi) {
      ybugApi.destroy();
      ybugApi.boot();
    }
  };

  return (
    <YbugContext.Provider value={{ Ybug: ybugApi, init: initYbug }}>
      {children}
    </YbugContext.Provider>
  );
}

export type { YbugApi, YbugSettings, SetUserType, YbugContextType, YbugProviderProps };
export { useYbugApi, YbugProvider };
