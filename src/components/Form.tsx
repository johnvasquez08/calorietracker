import React, { useState, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
    dispatch: React.Dispatch<ActivityActions>
    state: ActivityState
}
export default function Form( {dispatch, state}: FormProps) {
    const initialState : Activity = {
        id: uuidv4(),
        category :1,
         name :'',
         calorias : 0
    }
    useEffect(() => {
        if (state.activeID) {
            const activeActivity = state.activities.filter(activity => activity.id === state.activeID)[0]
            setActivity(activeActivity)
        }
    }, [state.activeID])
    const [activity, setActivity] = useState<Activity>(initialState)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['category', 'calorias'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {name, calorias} = activity
        return name.trim() !== '' && calorias > 0
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setActivity({...initialState, 
            id:uuidv4()})
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
    }

  return (
    <div>
       <form className="space-y-5 bg-white shadow p-10 rounded-lg"
       onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoria</label>
                <select className="border border-slate-400 rounded-lg p-2 w-full" id="category"
                value={activity.category}
                onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad</label>
                <input type="text" name="name" id="name" className="border border-slate-400 rounded-lg p-2 w-full"
                placeholder="Ej: Comida, Ejercicio, Jugo, Pesas"
                value={activity.name}
                onChange={handleChange}
/>


            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calorias" className="font-bold">Calorias</label>
                <input type="number" name="calorias" id="calorias" className="border border-slate-400 rounded-lg p-2 w-full"
                placeholder="Calorias: 200, 300, 500"
                value={activity.calorias}
                onChange={handleChange}
/>


            </div>
            <div className="grid grid-cols-1 gap-3">
                <input type="submit" name="calorias" id="calorias" className="bg-black p-5 text-white font-bold uppercase hover:bg-gray-900 cursor-pointer disabled:opacity-10"
                placeholder="Calorias: 200, 300, 500"
                value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
                disabled={!isValidActivity()}/>


            </div>
       </form>
    </div>
  )
}
