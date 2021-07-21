import React from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CCard,
  CCardBody,
  CNav,
  CButton
} from '@coreui/react'

import { ReactComponent as BRIIcon } from '../assets/icons/logo-bank-bri.svg'
import { ReactComponent as PhoneIcon } from '../assets/icons/ic_outline-phone.svg'
import { ReactComponent as APMMatrixIcon } from '../assets/icons/ic_outline-apmmatrix.svg'
import { ReactComponent as DashboardIcon } from '../assets/icons/ic_outline-dashboard.svg'
import { ReactComponent as InventoryIcon } from '../assets/icons/ic_outline-inventory.svg'
import { ReactComponent as ReportsIcon } from '../assets/icons/ic_outline-reports.svg'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const _nav = [
  {
    name: 'APM Matrix',
    to: '/apm-matrix',
    icon: <APMMatrixIcon className="sidebar-icon"/>
  },
  {
    name: 'Dashboard',
    icon: <DashboardIcon className="sidebar-icon"/>,
  },
  {
    name: 'Inventory',
    icon: <InventoryIcon className="sidebar-icon"/>,
  },
  {
    name: 'Reports',
    to: '/reports',
    icon: <ReportsIcon className="sidebar-icon"/>
  },
]
const _dropdown = [
  {
    name: 'Business Dashboard',
    to: '/dashboard/business-dashboard',
  },
  {
    name: 'Architecture Dashboard',
    to: '/dashboard/architecture-dashboard',
  }
]

const TheSidebar = () => {
  const [navs, setNavs] = React.useState(undefined)
  const [dropdown, setDropdown] = React.useState(undefined)
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  
  const toggleNav = (name) => {
    setNavs(name.toLowerCase())
    setDropdown(name.toLowerCase())
    console.log(navs)
  }

  const toggleDropdown = () => {
    setDropdown(undefined)
    console.log(navs)
  }

  return (
    <>
      <CSidebar
        show={true}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        className="sidebar-root"
      >
        <CSidebarBrand className="sidebar-brand" to="/">
          <BRIIcon
            className="c-sidebar-brand-full"
            name="sygnet"
            height={35}
          />
        </CSidebarBrand>
        <div>
          <CSidebarNav>
            {
              _nav.map((nav, index) => {
                return (
                  <React.Fragment key={index}>
                  <CustomSidebarDropdownItem 
                    name={nav.name}
                    to={nav.to}
                    icon={nav.icon}
                    navs={navs}
                    toggle={toggleNav}
                    />
                  </React.Fragment>  
                )
              })
            }
            <CSidebarNavDivider className='divider'/>
          </CSidebarNav>
        </div>
        <CCard className="sidebar-contactus">
          <span>Have any problem ?</span>
          <CButton className="btn-contactus btn-brand"><PhoneIcon className="sidebar-icon"/><span className="mfs-2">Contact us</span></CButton>
        </CCard>
      </CSidebar>
      <div className="sidebar-dropdown-menu">
        <CustomSidebarDropdownMenu navs={navs} dropdown={dropdown} parent={"dashboard"}>
          {
            _dropdown.map((dropdown, index) => {
              return (
                <React.Fragment key={index}>
                  <CustomSidebarDropdownItem
                    name={dropdown.name}
                    to={dropdown.to}
                    toggle={toggleDropdown}
                  />
                </React.Fragment>
              )
            })
          }
        </CustomSidebarDropdownMenu>
      </div>
    </>
  )
}

const CustomSidebarDropdownMenu = (props) => {
  const { children, navs, dropdown, parent } = props

  return(
    <>
      <CCard 
        className={clsx("custom-dropdown-menu", {
          ["show"]: navs === parent && dropdown === parent
        })}
        role="menu" 
        aria-hidden="false"
      >
        {children}
      </CCard>
    </>
  )
}

const CustomSidebarDropdownItem = (props) => {
  const { to, icon, name, navs, toggle } = props

  return(
    <>
    <li className={clsx("custom-sidebar-nav-item", {
      ["selected"]: navs === name.toLowerCase()
    })}>
      {
        to != undefined && (
          <a href={"#" + to} className="custom-dropdown-item" onClick={e => toggle(name)}>
            {icon}
            {name}
          </a>
        )
      }
      {
        to == undefined && (
          <a className="custom-dropdown-item" onClick={e => toggle(name)}>
            {icon}
            {name}
          </a>
        )
      }
    </li>
    </>
  )
}
export default React.memo(TheSidebar)
