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

import { ReactComponent as ArrowIcon } from '../../assets/icons/ic_outline-arrow.svg'

import {
  CChartBar,
  CChartHorizontalBar,
  CChartDoughnut,
  CChartPie,
} from '@coreui/react-chartjs'

import plugins from './_plugins'

const Criticality = () => {
  return (
    <>
      <CCardGroup className="mb-4">
        <CCard className="dashboard-card">
          <CCardHeader className="dashboard-header">
            <h3>Business Dashboard</h3>
            <CButton size="sm" className="dashboard-app-btn btn-brand mr-1 mb-1"><span className="mfs-2">Application</span><ArrowIcon className="avatar-dropdown-icon avatar-arrow-icon"/></CButton>
          </CCardHeader>
        </CCard>
      </CCardGroup>
      <CCardGroup columns className="cols-3">
      <CCard>
          <CCardHeader>
            Pie Chart
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
        <CCard>
          <CCardHeader>
            Pie Chart
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
        <CCard>
          <CCardHeader>
            Pie Chart
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
      </CCardGroup>
    </>
  )
}

export default Criticality