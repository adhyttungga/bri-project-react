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

const TechnicalQuality = () => {
  const [datas, setDatas] = React.useState([])
  const [barDatas, setBarDatas] = React.useState([])
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

    // get all investment data
    read(signal, "/dashboard/investment").then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setBarDatas(data.data)
      }
    })

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
            <h3>Technical Quality</h3>
            <CButton size="sm" className="dashboard-app-btn btn-brand mr-1 mb-1"><span className="mfs-2">Application</span><ArrowIcon className="avatar-dropdown-icon avatar-arrow-icon"/></CButton>
          </CCardHeader>
        </CCard>
      </CCardGroup>
      <CRow>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Functional Suitability
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Functional Suitability
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
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Number of Supported Business Process
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Number of Supported Business Process
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Performance Efficiency
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Performance Efficiency
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
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Time Response
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Time Response
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
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Resource Utilization
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Resource Utilization
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
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Capacity Measures
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Capacity Measures
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
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Usability
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Usability
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
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Reliability
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Reliability
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Security
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Security
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Maintainability
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard >
            <CCardHeader>
              Maintainability
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: 'Return on Investment',
                    backgroundColor: '#63C7FF',
                    data: barDatas.map((e)=>e.return_on_investment),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  },
                  {
                    label: 'Investment Value',
                    backgroundColor: '#FF5151',
                    data: barDatas.map((e)=>e.investment_value),
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                  }
                ]}
                labels={barDatas.map((e)=>e.application)}
                options={{
                  tooltips: {
                    enabled: false
                  },
                  showLines: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {  
                        fontSize: 12,
                        fontFamily: 'Poppins',
                        fontColor: '#939393'
                      },
                      gridLines: {
                        drawBorder: false,
                        tickMarkLength: 15,
                      },
                    }],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis1',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          callback:function(label, index){
                            var month = label
                            if (index%2 === 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        }
                      },
                      {
                        gridLines: {
                          display: false,
                          drawBorder: false,
                        },
                        id: 'xAxis2',
                        ticks: {
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          fontColor: '#939393',
                          autoSkip: false,
                          maxRotation: 0,
                          padding: -10,
                          callback:function(label, index){
                            var month = label
                            if (index%2 !== 0) {
                              return month
                            } else {
                              return ""
                            }
                          }
                        },
                      },
                    ]
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="5">
          <CCard >
            <CCardHeader>
              Portability
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
        </CCol>
        <CCol sm="12" lg="7">
          <CCard >
            <CCardHeader>
              Portability
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
        </CCol>
      </CRow>
    </>
  )
}

export default TechnicalQuality