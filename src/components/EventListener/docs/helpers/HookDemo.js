/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button } from 'components/Button';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { useEventListener } from '../../useEventListener';

export function HookDemo() {
  const [eventStates, setEventStates] = useState({});
  const { addListener: addFirstListener, removeListener: removeFirstListener } = useEventListener({
    eventType: 'dblclick',
    listener: event => {
      console.log('First event', event);
    },
  });

  const { addListener: addSecondListener, removeListener: removeSecondListener } = useEventListener({
    eventType: 'dblclick',
    listener: event => {
      console.log('Second event', event);
    },
  });

  const { addListener: addThirdListener, removeListener: removeThirdListener } = useEventListener({
    eventType: 'dblclick',
    listener: event => {
      console.log('Third event', event);
    },
  });

  const { addListener: addZerothListener, removeListener: removeZerothListener } = useEventListener({
    eventType: 'dblclick',
    listener: event => {
      console.log('Zeroth event', event);
    },
    precedeOtherEvents: true,
  });

  const renderAddButton = (id, callback) => (
    <Button
      color="success"
      onClick={() => {
        callback();
        setEventStates({ ...eventStates, [id]: true });
      }}
    >
      {`Add ${id} event listener`}
    </Button>
  );
  const renderRemoveButton = (id, callback) => (
    <Button
      color="danger"
      onClick={() => {
        callback();
        setEventStates({ ...eventStates, [id]: false });
      }}
    >
      {`Remove ${id} event listener`}
    </Button>
  );
  const renderButton = (id, add, remove) =>
    eventStates[id] ? renderRemoveButton(id, remove) : renderAddButton(id, add);

  return (
    <Rhythm m={1}>
      <Rhythm mb={3}>
        <Typography heading="h5">Double click the body to trigger the events</Typography>
      </Rhythm>
      <div>{renderButton('first', addFirstListener, removeFirstListener)}</div>
      <div>{renderButton('second', addSecondListener, removeSecondListener)}</div>
      <div>{renderButton('third', addThirdListener, removeThirdListener)}</div>
      <div>{renderButton('zeroth', addZerothListener, removeZerothListener)}</div>
    </Rhythm>
  );
}
