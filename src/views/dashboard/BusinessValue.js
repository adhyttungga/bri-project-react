import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CDataTable,
  CPagination,
  CButton,
  CRow, 
  CCol
} from '@coreui/react'
import {
  CChartBar,
  CChartHorizontalBar,
  CChartDoughnut,
  CChartPie,
} from '@coreui/react-chartjs'
import { list, read } from './api-dashboard'
import plugins from './_plugins'
import { ReactComponent as ArrowIcon } from '../../assets/icons/ic_outline-arrow.svg'

const BusinessValue = () => {
  const [datas, setDatas] = React.useState([])
  // const [barDatas, setBarDatas] = React.useState([])
  // const [chartDummy, setChartDummy] = React.useState([])
  const [page, setPage] = React.useState({
    currentPage: 1,
    totalData: 0,
    totalPages: 10,
  })

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    
    // get investment data with pagination
    list(signal, "/dashboard/investment/4/1").then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setDatas(data.results)
        setPage({ ...page,
          totalData: data.total_data, 
          totalPages: data.total_page 
        })
      }
    })

    // // get all investment data
    // read(signal, "/dashboard/investment").then((data) => {
    //   if (data && data.error) {
    //     console.log(data.error)
    //   } else {
    //     setBarDatas(data.data)
    //   }
    // })

    // // get dta dummy for pie and doughnut charts
    // read(signal, "/dashboard/chart-dummy").then((data) => {
    //   if (data && data.error) {
    //     console.log(data.error)
    //   } else {
    //     setChartDummy(data.data)
    //   }
    // })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const togglePage = (e) => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // get investment data if the page change
    list(signal, "/dashboard/investment/4/" + ((e - 1) * 4 + 1)).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setDatas(data.results)
        setPage({ ...page, 
          currentPage: e,
          totalData: data.total_data, 
          totalPages: data.total_page 
        })
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }

  return (
    <>
      <CCardGroup className="mb-4">
        <CCard className="dashboard-card">
          <CCardHeader className="dashboard-header">
            <h3>Business Value</h3>
            <CButton size="sm" className="dashboard-app-btn btn-brand mr-1 mb-1"><span className="mfs-2">Application</span><ArrowIcon className="avatar-dropdown-icon avatar-arrow-icon"/></CButton>
          </CCardHeader>
        </CCard>
      </CCardGroup>
      <CCardGroup columns className="cols-2">
        <CCard >
          <CCardHeader>
            Criticality
          </CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={[
                {
                  backgroundColor: [
                    '#FF7070',
                    '#FFCD4E',
                    '#63C7FF',
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [40, 20, 80, 10],
                  borderWidth: 0,
                  polyline: {
                    color: "gray",
                    labelColor: "gray",
                    formatter: (value, dataset) => {
                      let sum = dataset.data.reduce((a,b)=>a+b);
                      let percentage = (value*100 / sum).toFixed(2)+"%";
                      return percentage;
                    }
                  }
                }
              ]}
              labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
              options={{
                tooltips: {
                  enabled: false
                },
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 18,
                    fontSize: 12,
                    fontFamily: 'Poppins',
                    fontColor: "#939393",
                    usePointStyle: true,
                    padding: 30
                  }
                },
                layout: {
                  padding: {
                    top: 30,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }
                },
                aspectRatio: 1.05,
                elements: {
                  line: {
                    fill: false
                  },
                  point: {
                    hoverRadius: 7,
                    radius: 5
                  }
                }
              }}
              plugins={plugins}
            />
          </CCardBody>
        </CCard>

        <CCard >
          <CCardHeader>
            Criticality
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={datas}
              fields={['application', 'mandatory_business']}
              itemsPerPage={4}
            />
          </CCardBody>
          <CCardBody className="dashboard-pagination">
            <div>Showing {datas.length} of {page.totalData}</div>
            <CPagination
              align="end"
              doubleArrows={false}
              activePage={page.currentPage}
              pages={page.totalPages}
              onActivePageChange={togglePage}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    </>
  )
}

export default BusinessValue