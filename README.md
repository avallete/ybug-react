# Ybug-react

A simple wrapper of ybug.io widget to easily integrate with React applications.

## Install

```
npm install --save ybug-react
```

## Usage

Simply wrap your app within the provided `YbugProvider` component

```tsx
<YbugProvider ybugId="my-ybug-id" >
    <MyApp>
</YbugProvider>
```

Then in the rest of the app lifecycle, you can interact with the ybug instance by using the `useYbugApi` hook

## Examples

### Autofilling the Ybug forms with user infos

```tsx
import {useYbugApi} from 'ybug-react';

function useUserConnection(props: {userId: string}) {
    const YbugContext = useYbugApi();
    const {data} = useUserDataFetching(props.userId);

    const currentUser = data?.user;
    React.useEffect(() => {
        if (currentUser && YbugContext.Ybug) {
            YbugContext.init({
                feedback: {
                    // Autofill feedback forms with user email and name
                    email: currentUser.contact?.email ?? "",
                    name: currentUser.full_name ?? "",
                },
                // Make ybug use the user language
                language_override: currentUser.language,
                // Add custom user infos
                user: {
                    email: currentUser.contact?.email ?? "",
                    ...
                },
            });
        }
    }, [currentUser, YbugContext])
}
```

### Programatically trigger ybug report pop-up

```tsx
import * as React from "react";
import { useYbugApi } from "~/config/ybug/YbugContext";

function ErrorPage() {
  const YbugContext = useYbugApi();
  const YbugApi = YbugContext?.Ybug;

  const openYbugReport = () => {
    if (YbugApi) {
      YbugApi.open("feedback");
    }
  };

  return (
    <div>
        <span>
            An error happened. Please contact our team
        </span>
        <button onClick={actions.openYbugReport}>
            Tell us more
        </button>
    </div>
  );
}

export { ErrorPage };
```

## Demo

[![Edit ybug-react-usage-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pensive-breeze-7boxt8?fontsize=14&hidenavigation=1&theme=dark)

For more info visit [https://ybug.io](https://ybug.io/docs/installation)
