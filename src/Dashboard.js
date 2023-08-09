import Admins from './Components/Pages/Admins'
import Users from './Components/Pages/Users'
import Plans from './Components/Pages/Plans'

const Dashboard = (props) => { 
  return (
    <div id="dashboard" className="bg-[#f4f7ff] p-8 h-full">
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <div className="w-full md:w-1/3 md:ml-16">
          <Admins token={props.token} />
        </div>
        <div className="w-full md:w-2/3 mt-6 mb-6">
          <Users token={props.token} />
        </div>
      </div>
      <div className="flex flex-row md:flex-row w-full items-center justify-between">
        <div className="w-full mt-6 mb-6">
          <Plans token={props.token} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard