import React, {useState, useContext, createContext} from 'react';

const CounterContext = createContext();

export function CounterProvider(props) {
  const [state, setState] = useState({
    edited: false,
    hot: false
  });
  return (
    <CounterContext.Provider
      value={{
        state,
        setState
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
}

export function CounterSamples(props) {
  const {state} = useContext(CounterContext);
  return props.children[Number(state.edited)];
}

function CounterButtonInner(props) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <button onClick={increment} style={{ fontSize: '1em' }}>
      {props.edited ? 'Pressed' : 'Clicked'} {count} times
    </button>
  );
}

export function CounterButton() {
  const {state} = useContext(CounterContext);
  return (
    <CounterButtonInner
      key={!state.hot && state.edited}
      {...state}
    />
  );
}

export function CounterEdit() {
  const {setState} = useContext(CounterContext);

  function toggleEdited() {
    setState(prevState => ({
      ...prevState,
      edited: !prevState.edited
    }));
  }

  return (
    <button onClick={toggleEdited} style={{fontSize: '1em'}}>
      Edit file
    </button>
  );
}

export function CounterHot() {
  const {state, setState} = useContext(CounterContext);

  function toggleHot(event) {
    setState(prevState => ({
      ...prevState,
      hot: !prevState.hot
    }));
  }

  return (
    <button
      onClick={toggleHot}
      style={{
        fontSize: '1em',
        color: 'white',
        backgroundColor: state.hot ? 'green' : 'red'
      }}
    >
      HMR is {state.hot ? 'ON' : 'OFF'}
    </button>
  );
}