import { act, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"






function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-lime-600 py-3">
          <div className="max-w-4xl flex justify-between mx-auto">
              <h1 className="text-lg text-center text-white font-bold">
                Contador de calorias
              </h1>
          </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form
            />
          </div>
      </section>
    </>
  )
}

export default App
