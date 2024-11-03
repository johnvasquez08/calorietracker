import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
export default function CalorieTracker({activities} : CalorieTrackerProps) {
    const caloriesconsumend = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calorias : total, 0), [activities])
    const caloriesburn = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calorias : total, 0), [activities])
    const netCalories = useMemo(() => caloriesconsumend - caloriesburn, [activities])
    return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay
            calories={caloriesconsumend}
            text="Consumidas"
            />
            <CalorieDisplay
            calories={caloriesburn}
            text="Ejercicio"
            />
            <CalorieDisplay
            calories={netCalories}
            text="Diferencia"
            />
        </div>
    </>
  )
}
