---
{
  "title": "PreJoinProps interface",
  "linkToSource": "https://github.com/livekit/components-js/blob/main/packages/react/src/prefabs/PreJoin.tsx"
}
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

# PreJoinProps interface

**Signature:**

```typescript
export interface PreJoinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onError'>
```

**Extends:** Omit&lt;React.HTMLAttributes&lt;HTMLDivElement&gt;, 'onSubmit' \| 'onError'&gt;

{% partial file="p_usage.md" variables={exampleCount: 0} /%}

## Properties

| Property                                                    | Type                                                                            | Description                                                                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [camLabel?](./react/prejoinprops.camlabel.md)               | string                                                                          | _(Optional)_                                                                                                                               |
| [debug?](./react/prejoinprops.debug.md)                     | boolean                                                                         | _(Optional)_ Display a debug window for your convenience.                                                                                  |
| [defaults?](./react/prejoinprops.defaults.md)               | Partial&lt;[LocalUserChoices](./react/localuserchoices.md)<!-- -->&gt;          | _(Optional)_ Prefill the input form with initial values.                                                                                   |
| [joinLabel?](./react/prejoinprops.joinlabel.md)             | string                                                                          | _(Optional)_                                                                                                                               |
| [micLabel?](./react/prejoinprops.miclabel.md)               | string                                                                          | _(Optional)_                                                                                                                               |
| [onError?](./react/prejoinprops.onerror.md)                 | (error: Error) =&gt; void                                                       | _(Optional)_                                                                                                                               |
| [onSubmit?](./react/prejoinprops.onsubmit.md)               | (values: [LocalUserChoices](./react/localuserchoices.md)<!-- -->) =&gt; void    | _(Optional)_ This function is called with the <code>LocalUserChoices</code> if validation is passed.                                       |
| [onValidate?](./react/prejoinprops.onvalidate.md)           | (values: [LocalUserChoices](./react/localuserchoices.md)<!-- -->) =&gt; boolean | _(Optional)_ Provide your custom validation function. Only if validation is successful the user choices are past to the onSubmit callback. |
| [showE2EEOptions?](./react/prejoinprops.showe2eeoptions.md) | boolean                                                                         | _(Optional)_                                                                                                                               |
| [userLabel?](./react/prejoinprops.userlabel.md)             | string                                                                          | _(Optional)_                                                                                                                               |
