import React from 'react'
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

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  console.log(navigation)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
      className="sidebar-root"
    >
      <CSidebarBrand className="sidebar-brand" to="/">
        <BRIIcon
          className="c-sidebar-brand-full"
          name="sygnet"
          height={35}
        />
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>
        {/* <CSidebarNavItem icon={<APMMatrixIcon className="sidebar-icon"/>} name="CSidebarNavItem" /> */}
        <CCreateElement
          items={navigation.sidebarNav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
            CustomSidebarNavItem,
          }}
        />
      </CSidebarNav>
      <CCard className="sidebar-contactus">
        <span>Have any problem ?</span>
        <CButton className="btn-contactus btn-brand"><PhoneIcon className="sidebar-icon"/><span className="mfs-2">Contact us</span></CButton>
        {/* <CSidebarNavItem icon={<PhoneIcon className="sidebar-icon"/>} name="Contact Us" /> */}
      </CCard>
      <CCreateElement
          items={navigation.dropdownMenu}
          components={{
            CustomSidebarDropdownMenu,
            CustomSidebarDropdownItem
          }}
        />
      {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}
    </CSidebar>
  )
}

const CustomSidebarNavItem = (props) => {
  const { icon, name, to, children }  = props

  return(
    <>
      <CSidebarNavItem icon={icon} name={name} to={to} className="custom-sidebar-nav-item" />
    </>
  )
}

const CustomSidebarDropdownMenu = (props) => {
  const { children } = props

  return(
    // <>
    //   <div className="custom-dropdown-menu">
    //     {children}
    //   </div>
    // </>
    <>
      <CCard className="custom-dropdown-menu" role="menu" aria-hidden="false">
        {/* <CCardBody className="sidebar-card-body"> */}
          {/* <CNav vertical> */}
            {children}
          {/* </CNav> */}
        {/* </CCardBody> */}
      </CCard>
    </>
  )
}

const CustomSidebarDropdownItem = (props) => {
  const { to, name } = props
  
  return(
    <>
      <a href={"#" + to} className="custom-dropdown-item">
        {name}
      </a>
    </>
  )
}
export default React.memo(TheSidebar)
