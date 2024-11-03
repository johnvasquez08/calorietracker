import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activityReducer"

type ActivitylistProps = {
    activities: Activity[]
    dispatch: React.Dispatch<ActivityActions>
}
export default function Activitylist({activities, dispatch}: ActivitylistProps) {
  console.log(activities)
  const categoryName = useMemo(() => (category: Activity['category']) => 
    categories.map(cat => cat.id === category ? cat.name : ''), [activities])
    
    return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {activities.length === 0 ? <p className="text-center mt-10 font-bold text-2xl">No hay actividades...</p> : 
      activities.map(activity => (
        <div className="px-5 py-10 bg-whitem mt-5 flex justify-between max-w-4xl mx-auto bg-white" 
        key={activity.id}>
            <div className="space-y-2 relative">
                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase rounded-sm font-bold 
                  ${activity.category===1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                    {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-5">
                    {activity.name}
                </p>
                <p className={`font-black text-4xl ${activity.category===1 ? 'text-lime-500' : 'text-orange-500'}`}>
                    {activity.calorias} Calorias
                </p>
            </div>
            <div className="flex gap-5 items-center">
              <button>
              <PencilSquareIcon
                  className="h-8 w-8 text-gray-800"
                  onClick={()=> dispatch({type:"set-activeId",payload: {id: activity.id}})}
                  />
              </button> 
              <button>
              <XCircleIcon
                  className="h-8 w-8 text-red-500"
                  onClick={()=> dispatch({type:"delete-activity",payload: {id: activity.id}})}
                  />
              </button> 
            </div>
        </div>
      ))}
    </>
  )
}
