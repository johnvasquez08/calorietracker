import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import Activitylist from "./components/Activitylist"
import CalorieTracker from "./components/CalorieTracker"






function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestarApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-lime-600 py-3">
          <div className="max-w-4xl flex justify-between mx-auto">
              <h1 className="text-lg text-center text-white font-bold my-auto">
                Contador de calorias
              </h1>
              <button className="text-sm text-white font-bold disabled:opacity-10 bg-gray-800 hover:bg-gray-950 uppercase p-2 rounded-lg cursor-pointer"
              onClick={() => dispatch({type: "reset-app"})}
              disabled={!canRestarApp()}>Resetear dia</button>
          </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form
              dispatch={dispatch}
              state={state}
            />
          </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
          activities={state.activities}
          />

        </div>

      </section>
      <section className="p-10 mx-auto max-full bg-slate-100">
            <Activitylist
            activities={state.activities}
            dispatch={dispatch}
            />
      </section>
    </>
  )
}

export default App
