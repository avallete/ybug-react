# Ybug-react

A simple implemetation of ybug.io widget to easily integrate with React applications.

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

### For autofilling the Ybug forms with user infos

```tsx
import {useYbugApi} from 'ybug-react';

function useUserConnection(props: {userId: string}) {
    const YbugContext = useYbugApi();
    const {data} = useUserDataFetching(props.userId);

    const currentUser = data?.user;
    React.useEffect(() => {
        if (currentUser && YbugContext.Ybug) {
            YbugContext.init({
                close_countdown: 3,
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
                    id: currentUser.id,
                    name: currentUser.full_name ?? "",
                    org_id: currentUser.org.id,
                    org_name: currentUser.org.name,
                    phone: currentUser.contact?.phone ?? "",
                },
            });
        }
    }, [currentUser, YbugContext])
}
```

### For programatically trigger ybug report pop-up

```tsx
import * as React from "react";
import { useYbugApi } from "~/config/ybug/YbugContext";

const useError = () => {
  const YbugContext = useYbugApi();
  const YbugApi = YbugContext?.Ybug;

  const openYbugReport = () => {
    if (YbugApi) {
      YbugApi.open("feedback");
    }
  };

  return {
    actions: {
      openYbugReport,
    },
    state: {
      isYbugSetup: !!YbugApi,
    },
    t,
  };
};

function ErrorPage() {
  const { actions, state, t } = useError();

  return (
    <div>
        <span>
            An error happened. Please contact our team
        </span>
        {state.isYbugSetup && (
            <button onClick={actions.openYbugReport}>
                Tell us more
            </button>
        )}
    </div>
  );
}

export { ErrorPage };
```