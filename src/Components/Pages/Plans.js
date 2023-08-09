import { useEffect, useState } from 'react';
import axios from 'axios';
import Config from "../../Config.json";
import 'react-loading-skeleton/dist/skeleton.css'
import TableLoading from '../Loadings/TableLoading'
import ErrorLoading from '../Errors/ErrorLoading'
import NoData from '../NoData/NoData'
import DataTable from '../Data/PlansTable'

const Plans = (props) => {
    const [data, setData] = useState(null);
    const [loading, isLoading] = useState(true);
    const [err, setErr] = useState(false);
    const headers = {
        headers: {
          "Content-Type": "application/json",
          "token": `${props.token}`
        }
      };
      const fetchData = async () => {
          try {
              const response = await axios.get(`${Config.API_URL}${Config.ADMIN_API}${Config.VIEW}/plans`, headers);
              setData(response.data.data);
              isLoading(false);
              setErr(false);
          }
          catch (e) {
              setData(null);
              isLoading(false);
              setErr(true);
          }
      };
      useEffect(() => {
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[setData]);
    return (
        <>
            {
                err ?
                    <ErrorLoading />
                :   data && data.length > 0 ?
                    <DataTable data={data} />
                :   data && data.length === 0 ?
                    <NoData addUrl="/addplan" />
                :   loading ?
                    <TableLoading />
                :   null
            }
        </>
  )
}

export default Plans